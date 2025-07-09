package com.example.thescreen.service;

import com.example.thescreen.entity.Movie;
import com.example.thescreen.repository.MovieRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    // ✅ 1) PK moviecd 자동 생성
    private String generateMovieCd() {
        Optional<String> maxMovieCd = movieRepository.findMaxMovieCd();
        int nextId = 1;

        if (maxMovieCd.isPresent()) {
            String maxCd = maxMovieCd.get();
            try {
                nextId = Integer.parseInt(maxCd.replace("MOV", "")) + 1;
            } catch (NumberFormatException e) {
                System.err.println("moviecd 파싱 오류, 기본값 MOV001 사용: " + e.getMessage());
            }
        }

        return String.format("MOV%03d", nextId);
    }

    // ✅ 2) 매일 새벽 1시에 자동 실행
    @Scheduled(cron = "0 0 1 * * ?")
    public void scheduledFetchAndSaveMovie() {
        fetchAndSaveMovie();
    }

    // ✅ 3) KMDB Open API 호출 → JSON 파싱 → Entity 저장
    public void fetchAndSaveMovie() {
        try {
            String apiUrl = "https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp"
                    + "?collection=kmdb_new2"
                    + "&ServiceKey=MDM547891715MV02DMT4"
                    + "&releaseDts=20250601"
                    + "&detail=Y"
                    + "&listCount=5"; // 테스트로 5개만

            String response = restTemplate.getForObject(apiUrl, String.class);

            JsonNode rootNode = objectMapper.readTree(response);
            JsonNode resultArray = rootNode.path("Data").get(0).path("Result");

            for (JsonNode movieNode : resultArray) {

                Movie movie = new Movie();

                // ✅ PK
                movie.setMoviecd(generateMovieCd());

                // ✅ 영화 제목
                movie.setMovienm(movieNode.path("title").asText());

                // ✅ plots.plot[0].plotText (한국어만)
                String plot = "";
                for (JsonNode p : movieNode.path("plots").path("plot")) {
                    if ("한국어".equals(p.path("plotLang").asText())) {
                        plot = p.path("plotText").asText();
                        break;
                    }
                }
                movie.setDescription(plot);

                // ✅ genre
                movie.setGenre(movieNode.path("genre").asText());

                // ✅ directors.director[0].directorNm
                JsonNode directors = movieNode.path("directors").path("director");
                if (directors.isArray() && !directors.isEmpty()) {
                    movie.setDirector(directors.get(0).path("directorNm").asText());
                }

                // ✅ actors.actor[*].actorNm
                StringBuilder actorsBuilder = new StringBuilder();
                for (JsonNode actor : movieNode.path("actors").path("actor")) {
                    if (actorsBuilder.length() > 0) {
                        actorsBuilder.append(", ");
                    }
                    actorsBuilder.append(actor.path("actorNm").asText());
                }
                movie.setActors(actorsBuilder.toString());

                // ✅ posters
                String posters = movieNode.path("posters").asText();
                if (posters != null && !posters.isEmpty()) {
                    movie.setPosterurl(posters.split("\\|")[0]);
                }

                // ✅ releasedate (String → LocalDate)
                String releaseDateStr = movieNode.path("repRlsDate").asText();
                if (!releaseDateStr.isEmpty()) {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
                    LocalDate releaseDate = LocalDate.parse(releaseDateStr, formatter);
                    movie.setReleasedate(releaseDate);
                }

                // ✅ runningtime (String → Integer)
                String runtimeStr = movieNode.path("runtime").asText();
                if (!runtimeStr.isEmpty()) {
                    movie.setRunningtime(Integer.parseInt(runtimeStr));
                }

                // ✅ rating → isadult
                String rating = movieNode.path("rating").asText();
                movie.setIsadult(rating.contains("전체") ? Movie.IsAdult.N : Movie.IsAdult.Y);

                // ✅ 저장
                movieRepository.save(movie);
            }

            System.out.println("✅ KMDB 영화 데이터 저장 완료!");

        } catch (Exception e) {
            System.err.println("🚨 KMDB API 저장 오류: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ✅ 저장된 영화 리스트 가져오기
    public List<Movie> getMovieList() {
        return movieRepository.findAll();
    }
}
