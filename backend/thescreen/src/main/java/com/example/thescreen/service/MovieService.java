package com.example.thescreen.service;

import com.example.thescreen.entity.Movie;
import com.example.thescreen.repository.MovieRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
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
public class MovieService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final MovieRepository movieRepository;

    @Value("${kobis.api.key}")
    private String kobisApiKey;

    @Value("${kmdb.api.key}")
    private String kmdbApiKey;

    /**
     * KOBIS에서 2025년 개봉 영화 목록을 가져와 DB 저장 후 반환
     */
    @Transactional
    public List<Movie> saveDailyBoxOffice() {
        String openStartDt = "2025";
        String openEndDt = "2025";
        int itemPerPage = 100; // KOBIS API 최대 100개까지 가능
        int curPage = 1;
        int totalToFetch = 200;

        List<Movie> savedMovies = new ArrayList<>();
        int totalFetched = 0;

        while (totalFetched < totalToFetch) {
            String kobisUrl = String.format(
                    "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=%s&openStartDt=%s&openEndDt=%s&itemPerPage=%d&curPage=%d",
                    kobisApiKey, openStartDt, openEndDt, itemPerPage, curPage
            );

            try {
                String response = restTemplate.getForObject(kobisUrl, String.class);
                JsonNode root = objectMapper.readTree(response);
                JsonNode movieList = root.path("movieListResult").path("movieList");

                if (movieList.isEmpty()) break;

                for (JsonNode movieNode : movieList) {
                    if (totalFetched >= totalToFetch) break;

                    String movieCd = movieNode.path("movieCd").asText();
                    String movieNm = movieNode.path("movieNm").asText();
                    String openDt = movieNode.path("openDt").asText();
                    LocalDate releaseDate = openDt.isBlank() ? null : parseReleaseDate(openDt);

                    if (releaseDate != null && movieRepository.existsByMovienmAndReleasedate(movieNm, releaseDate)) {
                        savedMovies.add(movieRepository.findByMovienmAndReleasedate(movieNm, releaseDate));
                        totalFetched++;
                        continue;
                    }

                    // KOBIS 상세 정보
                    String kobisInfoUrl = String.format(
                            "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=%s&movieCd=%s",
                            kobisApiKey, movieCd
                    );
                    String kobisInfoResponse = restTemplate.getForObject(kobisInfoUrl, String.class);
                    JsonNode movieInfo = objectMapper.readTree(kobisInfoResponse)
                            .path("movieInfoResult").path("movieInfo");

                    String showTm = movieInfo.path("showTm").asText("");
                    String actors = StreamSupport.stream(movieInfo.path("actors").spliterator(), false)
                            .map(a -> a.path("peopleNm").asText())
                            .filter(s -> !s.isBlank())
                            .collect(Collectors.joining(", "));
                    String directors = StreamSupport.stream(movieInfo.path("directors").spliterator(), false)
                            .map(d -> d.path("peopleNm").asText())
                            .filter(s -> !s.isBlank())
                            .collect(Collectors.joining(", "));
                    String genres = StreamSupport.stream(movieInfo.path("genres").spliterator(), false)
                            .map(g -> g.path("genreNm").asText())
                            .filter(s -> !s.isBlank())
                            .collect(Collectors.joining(", "));
                    String watchGradeNm = movieInfo.path("audits").elements().hasNext()
                            ? movieInfo.path("audits").elements().next().path("watchGradeNm").asText("")
                            : "";
                    String isAdult = watchGradeNm.contains("청소년관람불가") ? "Y" : "N";

                    // KMDb API
                    String releaseDts = parseReleaseDateForKmdb(openDt);
                    String kmdbUrl = String.format(
                            "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=%s&query=%s&releaseDts=%s&releaseDte=%s",
                            kmdbApiKey, movieNm, releaseDts, releaseDts
                    );

                    String description = null;
                    String posterUrl = null;
                    try {
                        String kmdbResponse = restTemplate.getForObject(kmdbUrl, String.class);
                        JsonNode kmdbResult = objectMapper.readTree(kmdbResponse);
                        JsonNode result = kmdbResult.path("Data").get(0).path("Result").get(0);

                        description = result.path("plots").path("plot").isArray()
                                ? result.path("plots").path("plot").get(0).path("plotText").asText(null)
                                : null;

                        posterUrl = result.path("posters").asText(null);
                        if (posterUrl != null) {
                            posterUrl = posterUrl.split("\\|")[0].trim();
                        }
                    } catch (Exception e) {
                        continue; // KMDb 실패 시 패스
                    }

                    if (description == null || description.isBlank() || posterUrl == null || posterUrl.isBlank()) {
                        continue;
                    }

                    Movie movie = new Movie();
                    movie.setMoviecd(movieCd);
                    movie.setMovienm(movieNm);
                    movie.setDescription(description);
                    movie.setGenre(genres);
                    movie.setDirector(directors);
                    movie.setActors(actors);
                    movie.setRunningtime(showTm.isBlank() ? null : Integer.parseInt(showTm));
                    movie.setReleasedate(releaseDate);
                    movie.setPosterurl(posterUrl);
                    movie.setRunningscreen(null);
                    movie.setIsadult(Movie.IsAdult.valueOf(isAdult));

                    movieRepository.save(movie);
                    savedMovies.add(movie);
                    totalFetched++;
                }

                curPage++;
            } catch (Exception e) {
                break;
            }
        }

        return savedMovies;
    }

    /**
     * openDt를 yyyy-MM-dd 또는 yyyyMMdd 형식으로 파싱
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
     * openDt를 KMDb의 releaseDts 형식(yyyyMMdd)으로 변환
     */
    private String parseReleaseDateForKmdb(String openDt) {
        if (openDt.isBlank()) {
            return "";
        }
        LocalDate date = parseReleaseDate(openDt);
        return date.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    }
}