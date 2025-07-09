package com.example.thescreen.service;

import com.example.thescreen.entity.Movie;
import com.example.thescreen.entity.MovieRank;
import com.example.thescreen.repository.MovieRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${kmdb.api.key:MDM547891715MV02DMT4}")
    private String apiKey;

    @Transactional
    public void fetchAndSaveMovie() {
        // 어제 날짜를 기준으로 데이터를 가져옴
        String targetDt = LocalDate.now().minusDays(1)
                .format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        // KMDB API URL (최대 10개로 제한)
        String url = String.format(
                "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp" +
                        "?collection=kmdb_new2&ServiceKey=%s&releaseDts=%s&detail=Y&listCount=10",
                apiKey
        );

        try {
            // API 호출
            String response = restTemplate.getForObject(url, String.class);
            JsonNode rootNode = objectMapper.readTree(response);
            JsonNode dataNode = rootNode.path("Data").get(0).path("Result");

            List<Movie> movies = new ArrayList<>();
            for (JsonNode movieNode : dataNode) {
                // 중복 영화 체크 (movienm과 releasedate로 확인)
                String movienm = movieNode.path("title").asText().replaceAll("!HS|!HE", "").trim();
                String releaseDateStr = movieNode.path("repRlsDate").asText();
                LocalDate releaseDate = releaseDateStr.isEmpty() ? null : LocalDate.parse(releaseDateStr, DateTimeFormatter.ofPattern("yyyyMMdd"));
                if (releaseDate != null && movieRepository.findByMovienmAndReleasedate(movienm, releaseDate).isPresent()) {
                    continue; // 이미 존재하면 스킵
                }

                Movie movie = new Movie();
                // moviecd 생성: MOV001, MOV002 형식
                movie.setMoviecd(generateMovieCd());
                movie.setMovienm(movienm);
                movie.setDescription(movieNode.path("plot").path("plotText").asText());
                movie.setGenre(movieNode.path("genre").asText());
                movie.setDirector(movieNode.path("directors").path("director").get(0).path("directorNm").asText());
                movie.setActors(movieNode.path("actors").path("actor").findValuesAsText("actorNm").stream().collect(Collectors.joining(", ")));

                // 러닝타임
                String runtime = movieNode.path("runtime").asText();
                movie.setRunningtime(runtime.isEmpty() ? null : Integer.parseInt(runtime));

                // 개봉일
                if (!releaseDateStr.isEmpty()) {
                    movie.setReleasedate(releaseDate);
                }

                // 포스터 URL
                movie.setPosterurl(movieNode.path("posters").asText().split("\\|")[0]);

                // 상영 등급
                String rating = movieNode.path("rating").asText();
                movie.setIsadult(rating.contains("전체") ? Movie.IsAdult.N : Movie.IsAdult.Y);

                movies.add(movie); // 리스트에 추가
            }

            // DB에 삭제 후 저장
            movieRepository.saveAll(movies);
            System.out.println("저장된 영화 수: " + movies.size());

        } catch (Exception e) {
            System.err.println("KMDB API 호출 또는 데이터 처리 중 오류: " + e.getMessage());
        }
    }

    // MOV001, MOV002 형식으로 moviecd 생성
    private String generateMovieCd() {
        // DB에서 현재 최대 moviecd 조회
        Optional<String> maxMovieCd = movieRepository.findMaxMovieCd();
        int nextId = 1;

        if (maxMovieCd.isPresent()) {
            String maxCd = maxMovieCd.get();
            try {
                // "MOV" 제거하고 숫자 부분만 추출
                nextId = Integer.parseInt(maxCd.replace("MOV", "")) + 1;
            } catch (NumberFormatException e) {
                System.err.println("moviecd 파싱 오류, 기본값 MOV001 사용: " + e.getMessage());
            }
        }

        // MOV + 3자리 숫자 형식 (예: MOV001)
        return String.format("MOV%03d", nextId);
    }
    //매 새벽 1시에 자동실행 로직
    @Scheduled(cron = "0 0 1 * * ?")
    public void scheduledFetchAndSaveMovie() {
        fetchAndSaveMovie();
    }

    public List<Movie> getMovieList() {
        return movieRepository.findAll();
    }
}