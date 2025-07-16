package com.example.thescreen.service;

import com.example.thescreen.entity.Movie;
import com.example.thescreen.repository.MovieRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
@Slf4j
public class MovieService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final MovieRepository movieRepository;

    @Value("${kobis.api.key}")
    private String kobisApiKey;

    @Value("${kmdb.api.key}")
    private String kmdbApiKey;

    /**
     * ✅ KOBIS + KMDb에서 박스오피스 10개 영화 가져와 DB 저장 후 반환
     */
    @Transactional
    public List<Movie> saveBoxOfficeMovies() {
        LocalDate targetDate = LocalDate.now().minusDays(1);
        String targetDt = targetDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        // KOBIS 일별 박스오피스 API 호출
        String kobisUrl = String.format(
                "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=%s&targetDt=%s&itemPerPage=10",
                kobisApiKey, targetDt
        );

        log.info("🎬 KOBIS 박스오피스 URL: {}", kobisUrl);

        List<Movie> savedMovies = new ArrayList<>();
        try {
            String response = restTemplate.getForObject(kobisUrl, String.class);
            JsonNode boxOfficeList = objectMapper.readTree(response)
                    .path("boxOfficeResult")
                    .path("dailyBoxOfficeList");

            if (boxOfficeList.isEmpty()) {
                log.info("✅ KOBIS 데이터 없음: targetDt={}", targetDt);
                return savedMovies;
            }

            for (JsonNode boxOffice : boxOfficeList) {
                String movieCd = boxOffice.path("movieCd").asText();
                String movieNm = boxOffice.path("movieNm").asText();
                String openDt = boxOffice.path("openDt").asText();

                // DB 중복 체크
                LocalDate releaseDate = openDt.isBlank() ? null : parseReleaseDate(openDt);
                if (releaseDate != null && movieRepository.existsByMovienmAndReleasedate(movieNm, releaseDate)) {
                    log.info("✅ DB에 존재: {} [{}]", movieNm, movieCd);
                    savedMovies.add(movieRepository.findByMovienmAndReleasedate(movieNm, releaseDate));
                    continue;
                }

                // KOBIS 상세 정보 API 호출
                String kobisInfoUrl = String.format(
                        "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=%s&movieCd=%s",
                        kobisApiKey, movieCd
                );
                String kobisInfoResponse = restTemplate.getForObject(kobisInfoUrl, String.class);
                JsonNode movieInfo = objectMapper.readTree(kobisInfoResponse)
                        .path("movieInfoResult")
                        .path("movieInfo");

                String showTm = movieInfo.path("showTm").asText("");
                String actors = movieInfo.path("actors").isArray() ?
                        StreamSupport.stream(movieInfo.path("actors").spliterator(), false)
                                .map(a -> a.path("peopleNm").asText())
                                .filter(s -> !s.isBlank())
                                .collect(Collectors.joining(", "))
                        : "";
                String directors = movieInfo.path("directors").isArray() ?
                        StreamSupport.stream(movieInfo.path("directors").spliterator(), false)
                                .map(d -> d.path("peopleNm").asText())
                                .filter(s -> !s.isBlank())
                                .collect(Collectors.joining(", "))
                        : "";
                String genres = movieInfo.path("genres").isArray() ?
                        StreamSupport.stream(movieInfo.path("genres").spliterator(), false)
                                .map(g -> g.path("genreNm").asText())
                                .filter(s -> !s.isBlank())
                                .collect(Collectors.joining(", "))
                        : "";
                String watchGradeNm = movieInfo.path("audits").elements().hasNext()
                        ? movieInfo.path("audits").elements().next().path("watchGradeNm").asText("")
                        : "";
                String isAdult = watchGradeNm.contains("청소년관람불가") ? "Y" : "N";

                // KMDb API 호출
                String releaseDts = parseReleaseDateForKmdb(openDt); // yyyyMMdd 형식
                String kmdbUrl = String.format(
                        "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=%s&query=%s&releaseDts=%s&releaseDte=%s",
                        kmdbApiKey, movieNm, releaseDts, releaseDts
                );
                log.info("🎬 KMDb 영화 URL: {}", kmdbUrl);

                String description = null;
                String posterUrl = null;
                try {
                    String kmdbResponse = restTemplate.getForObject(kmdbUrl, String.class);
                    JsonNode kmdbResult = objectMapper.readTree(kmdbResponse)
                            .path("Data").get(0).path("Result").get(0);
                    description = kmdbResult.path("plots").path("plot").isArray() ?
                            kmdbResult.path("plots").path("plot").get(0).path("plotText").asText("") : "";
                    posterUrl = kmdbResult.path("posters").asText("").split("\\|")[0].trim();
                } catch (Exception e) {
                    log.warn("⚠️ KMDb 데이터 가져오기 실패: movieNm={}, releaseDts={}", movieNm, releaseDts, e);
                }

                Movie movie = new Movie();
                movie.setMoviecd(movieCd);
                movie.setMovienm(movieNm);
                movie.setDescription(description.isBlank() ? null : description);
                movie.setGenre(genres);
                movie.setDirector(directors);
                movie.setActors(actors);
                movie.setRunningtime(showTm.isBlank() ? null : Integer.parseInt(showTm));
                movie.setReleasedate(releaseDate);
                movie.setPosterurl(posterUrl.isBlank() ? null : posterUrl);
                movie.setRunningscreen(null); // KOBIS/KMDb 미제공
                movie.setIsadult(Movie.IsAdult.valueOf(isAdult));

                movieRepository.save(movie);
                savedMovies.add(movie);
                log.info("✅ 저장 성공: {} [{}]", movieNm, movieCd);
            }

            return savedMovies;

        } catch (Exception e) {
            log.error("❌ 영화 저장 실패 targetDt={}", targetDt, e);
            return savedMovies;
        }
    }

    /**
     * ✅ openDt를 yyyy-MM-dd 또는 yyyyMMdd 형식으로 파싱
     */
    private LocalDate parseReleaseDate(String openDt) {
        try {
            // yyyy-MM-dd 형식 시도
            return LocalDate.parse(openDt, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        } catch (DateTimeParseException e) {
            // yyyyMMdd 형식 시도
            return LocalDate.parse(openDt, DateTimeFormatter.ofPattern("yyyyMMdd"));
        }
    }

    /**
     * ✅ openDt를 KMDb의 releaseDts 형식(yyyyMMdd)으로 변환
     */
    private String parseReleaseDateForKmdb(String openDt) {
        if (openDt.isBlank()) {
            return "";
        }
        LocalDate date = parseReleaseDate(openDt);
        return date.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    }
}