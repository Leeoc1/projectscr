package com.example.thescreen.service;

import com.example.thescreen.entity.Movie;
import com.example.thescreen.repository.MovieRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
    private String apiKey;

    /**
     * ✅ KOBIS 일별 박스오피스 + 상세 정보까지 한 번에 저장
     */
    @Transactional
    public void saveDailyBoxOffice() {
        LocalDate targetDate = LocalDate.now().minusDays(1);
        String targetDt = targetDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        String url = String.format(
                "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=%s&targetDt=%s&itemPerPage=10",
                apiKey, targetDt
        );

        log.info("🎬 일별 박스오피스 URL: {}", url);

        try {
            String response = restTemplate.getForObject(url, String.class);
            JsonNode boxOfficeList = objectMapper.readTree(response)
                    .path("boxOfficeResult")
                    .path("dailyBoxOfficeList");

            if (boxOfficeList.isEmpty()) {
                log.info("✅ 데이터 없음: targetDt={}", targetDt);
                return;
            }

            movieRepository.deleteAll();

            for (JsonNode boxOffice : boxOfficeList) {
                String movieCd = boxOffice.path("movieCd").asText();
                String movieNm = boxOffice.path("movieNm").asText();
                String openDt = boxOffice.path("openDt").asText();

                // ✅ 상세정보 API 호출
                String infoUrl = String.format(
                        "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=%s&movieCd=%s",
                        apiKey, movieCd
                );

                String infoResponse = restTemplate.getForObject(infoUrl, String.class);
                JsonNode movieInfo = objectMapper.readTree(infoResponse)
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

                Movie movie = new Movie();
                movie.setMoviecd(movieCd); // 원본 movieCd 사용
                movie.setMovienm(movieNm);
                movie.setReleasedate(openDt.isBlank() ? null :
                        (openDt.contains("-")
                                ? LocalDate.parse(openDt, DateTimeFormatter.ofPattern("yyyy-MM-dd"))
                                : LocalDate.parse(openDt, DateTimeFormatter.ofPattern("yyyyMMdd"))
                        )
                );
                movie.setRunningtime(showTm.isBlank() ? null : Integer.parseInt(showTm));
                movie.setActors(actors);
                movie.setDirector(directors);
                movie.setGenre(genres);
                movie.setIsadult(Movie.IsAdult.valueOf(isAdult));

                movieRepository.save(movie);
                log.info("✅ 저장 성공: {} [{}]", movieNm, movieCd);
            }

        } catch (Exception e) {
            log.error("❌ 박스오피스 저장 실패 targetDt={}", targetDt, e);
        }
    }

    @PostConstruct
    public void init() {
        saveDailyBoxOffice();
        log.info("✅ 서버 시작 시 박스오피스 저장 완료!");
    }

    @Scheduled(cron = "0 0 1 * * ?")
    public void scheduledSaveDailyBoxOffice() {
        saveDailyBoxOffice();
        log.info("✅ 스케줄러로 BoxOffice 데이터 저장 완료!");
    }

}
