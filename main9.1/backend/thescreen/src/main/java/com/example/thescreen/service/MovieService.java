package com.example.thescreen.service;

import com.example.thescreen.entity.Movie;
import com.example.thescreen.repository.MovieRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MovieService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final MovieRepository movieRepository;
    private final KmdbApiService kmdbApiService;

    @Value("${kobis.api.key}")
    private String kobisApiKey;

    private static final DateTimeFormatter KOBIS_DATE_FMT =
            DateTimeFormatter.ofPattern("yyyyMMdd");
    private static final DateTimeFormatter KMDB_DATE_FMT =
            DateTimeFormatter.ofPattern("yyyy-MM-dd");

    /**
     * 매일 새벽 2시 KOBIS 일별 박스오피스 데이터 가져와 저장
     * → KOBIS 데이터로 기본 세팅 후 KMDB 호출로 보완, 한 번만 save()
     */
    @Scheduled(cron = "0 0 2 * * ?")
    @Transactional
    public void fetchAndSaveMovies() {
        LocalDate targetDate = LocalDate.now().minusDays(1);
        String targetDt = targetDate.format(KOBIS_DATE_FMT);

        String url = String.format(
                "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/" +
                        "searchDailyBoxOfficeList.json?key=%s&targetDt=%s",
                kobisApiKey, targetDt
        );
        log.info("🎬 KOBIS 일별 박스오피스 URL: {}", url);

        try {
            String response = restTemplate.getForObject(url, String.class);
            JsonNode boxOfficeList = objectMapper
                    .readTree(response)
                    .path("boxOfficeResult")
                    .path("dailyBoxOfficeList");

            if (!boxOfficeList.isArray() || boxOfficeList.size() == 0) {
                log.info("✅ 박스오피스 데이터 없음: {}", targetDt);
                return;
            }

            // 기존 데이터 전체 삭제
            movieRepository.deleteAll();
            log.info("⚠️ 기존 영화 데이터 전체 삭제");

            for (JsonNode item : boxOfficeList) {
                String movieNm = item.path("movieNm").asText();
                String openDt = item.path("openDt").asText();

                Movie movie = new Movie();
                movie.setMoviecd(generateMovieCd());
                movie.setMovienm(movieNm);
                if (!openDt.isBlank()) {
                    movie.setReleasedate(LocalDate.parse(openDt, KMDB_DATE_FMT));
                }

                // KMDB로 바로 추가 보완
                JsonNode kmdbData = kmdbApiService.fetchMovieKmdb(
                        movieNm,
                        movie.getReleasedate()
                        );
                if (kmdbData != null) {
                    applyKmdbData(movie, kmdbData);
                }

                movieRepository.save(movie);
                log.info("✅ 저장 완료: {}", movieNm);
            }

        } catch (Exception e) {
            log.error("❌ KOBIS 박스오피스 저장 실패 targetDt={}", targetDt, e);
        }
    }

    /**
     * 이미 저장된 영화 중 Null 칼럼만 KMDB로 보완 저장
     */
    @Transactional
    public void enrichMoviesWithKmdb() {
        List<Movie> movies = movieRepository.findAll();
        log.info("🎬 전체 영화 수: {}", movies.size());

        for (Movie movie : movies) {
            String movieNm = movie.getMovienm();
            log.info("🎬 보완 처리 중: {}", movieNm);

            try {
                JsonNode kmdbData = kmdbApiService.fetchMovieKmdb(
                        movieNm,
                        movie.getReleasedate()
                        );
                if (kmdbData == null) {
                    log.warn("❌ KMDB 데이터 없음: {}", movieNm);
                    continue;
                }

                applyKmdbData(movie, kmdbData);
                log.info("✅ DB 보완 완료: {}", movieNm);
            } catch (Exception e) {
                log.error("❌ enrichMoviesWithKmdb 처리 중 에러: {}", movieNm, e);
            }
        }

        // JPA Dirty Checking 강제 반영
        movieRepository.flush();
        log.info("✅ flush() 완료");
    }

    /** KMDB JsonNode에서 Movie 엔티티로 Null 칼럼만 매핑 */
    private void applyKmdbData(Movie movie, JsonNode kmdbData) {
        // runtime
        String rt = kmdbData.path("runtime").asText("");
        if (movie.getRunningtime() == null && !rt.isBlank()) {
            try {
                movie.setRunningtime(Integer.parseInt(rt));
            } catch (NumberFormatException e) {
                log.warn("런타임 파싱 실패: {}", rt);
            }
        }

        // genre
        String genre = kmdbData.path("genre").asText("");
        if (isNullOrEmpty(movie.getGenre()) && !genre.isBlank()) {
            movie.setGenre(genre);
        }

        // director
        JsonNode dirs = kmdbData.path("directors").path("director");
        if (isNullOrEmpty(movie.getDirector()) && dirs.isArray() && dirs.size() > 0) {
            movie.setDirector(dirs.get(0).path("directorNm").asText(""));
        }

        // actors
        JsonNode acts = kmdbData.path("actors").path("actor");
        if (isNullOrEmpty(movie.getActors()) && acts.isArray() && acts.size() > 0) {
            movie.setActors(acts.get(0).path("actorNm").asText(""));
        }

        // description (plot)
        JsonNode plots = kmdbData.path("plots").path("plot");
        if (isNullOrEmpty(movie.getDescription()) && plots.isArray()) {
            for (JsonNode p : plots) {
                if ("한국어".equals(p.path("plotLang").asText(""))) {
                    movie.setDescription(p.path("plotText").asText(""));
                    break;
                }
            }
        }

        // poster url
        String poster = kmdbData.path("posters").asText("");
        if (isNullOrEmpty(movie.getPosterurl()) && !poster.isBlank()) {
            movie.setPosterurl(poster);
        }
    }

    /** MOV### 형태로 자동 증가 코드 생성 */
    private String generateMovieCd() {
        Optional<String> maxCd = movieRepository.findMaxMovieCd();
        int next = maxCd
                .map(s -> {
                    try { return Integer.parseInt(s.replace("MOV", "")); }
                    catch (NumberFormatException e) { return 0; }
                })
                .orElse(0) + 1;
        return String.format("MOV%03d", next);
    }

    /** 문자열 null/빈값 검사 헬퍼 */
    private boolean isNullOrEmpty(String s) {
        return s == null || s.trim().isEmpty();
    }
}
