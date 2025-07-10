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
    private String apiKey;

    /**
     * ✅ KOBIS 일별 박스오피스 저장
     */
    public void saveDailyBoxOffice() {
        LocalDate targetDate = LocalDate.now().minusDays(1);
        String targetDt = targetDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        String url = String.format(
                "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=%s&targetDt=%s&itemPerpage=50",
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

                String newMovieCd = generateMovieCd();

                Movie movie = new Movie();
                movie.setMoviecd(newMovieCd);
                movie.setMovienm(movieNm);
                movie.setReleasedate(openDt.isBlank() ? null :
                        LocalDate.parse(openDt, DateTimeFormatter.ofPattern("yyyy-MM-dd")));

                movieRepository.save(movie);
                log.info("✅ 저장 성공: {}", movieNm);
            }

        } catch (Exception e) {
            log.error("❌ 박스오피스 저장 실패 targetDt={}", targetDt, e);
        }
    }

    /**
     * ✅ KMDB 데이터 enrich
     * 기존 영화 데이터에 상세정보 덮어쓰기
     */
    @Transactional
    public void enrichMoviesWithKmdb() {
        var movies = movieRepository.findAll();
        log.info("🎬 영화 개수: {}", movies.size());

        for (Movie movie : movies) {
            log.info("🎬 현재 영화: {}", movie.getMovienm());
            try {
                JsonNode kmdbData = kmdbApiService.fetchMovieKmdb(movie.getMovienm());
                if (kmdbData == null) continue;

                String runtimeStr = kmdbData.path("runtime").asText("");
                int runtime = 0;
                try {
                    runtime = Integer.parseInt(runtimeStr);
                } catch (NumberFormatException e) {
                    log.warn("런타임 파싱 실패: {}", runtimeStr);
                }

                String genre = kmdbData.path("genre").asText("");

                String director = "";
                JsonNode directorsNode = kmdbData.path("directors").path("director");
                if (directorsNode.isArray() && directorsNode.size() > 0) {
                    director = directorsNode.get(0).path("directorNm").asText("");
                }

                String actors = "";
                JsonNode actorsNode = kmdbData.path("actors").path("actor");
                if (actorsNode.isArray() && actorsNode.size() > 0) {
                    actors = actorsNode.get(0).path("actorNm").asText("");
                }

                String plotText = "";
                JsonNode plotsNode = kmdbData.path("plots").path("plot");
                if (plotsNode.isArray()) {
                    for (JsonNode plot : plotsNode) {
                        if ("한국어".equals(plot.path("plotLang").asText(""))) {
                            plotText = plot.path("plotText").asText("");
                            break;
                        }
                    }
                }

                log.info("✅ runtime: {}", runtime);
                log.info("✅ genre: {}", genre);
                log.info("✅ director: {}", director);
                log.info("✅ actors: {}", actors);
                log.info("✅ plotText: {}", plotText);

                // ✅ 필드만 세팅 (영속성 컨텍스트가 감지)
                movie.setRunningtime(runtime);
                movie.setGenre(genre);
                movie.setDirector(director);
                movie.setActors(actors);
                movie.setDescription(plotText);

                log.info("✅ 필드 세팅 완료: {}", movie);

            } catch (Exception e) {
                log.error("❌ enrichMoviesWithKmdb() 중간 에러! 영화: {}", movie.getMovienm(), e);
            }
        }

        // ✅ Dirty Checking 반영 강제 flush!
        log.info("✅ flush() 시작");
        movieRepository.flush();
        log.info("✅ flush() 완료");
    }

    /**
     * ✅ MovieCd 생성 로직
     */
    private String generateMovieCd() {
        Optional<String> maxMovieCd = movieRepository.findMaxMovieCd();
        int nextId = 1;

        if (maxMovieCd.isPresent()) {
            String maxCd = maxMovieCd.get();
            try {
                nextId = Integer.parseInt(maxCd.replace("MOV", "")) + 1;
            } catch (NumberFormatException e) {
                log.error("moviecd 파싱 오류: {}", e.getMessage());
            }
        }
        return String.format("MOV%03d", nextId);
    }
}
