package com.example.thescreen.service;

import com.example.thescreen.entity.MovieRank;
import com.example.thescreen.repository.MovieRankRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class MovieRankService {

    @Autowired
    private MovieRankRepository movieRankRepository;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private RestTemplate restTemplate;

    @Value("${kobis.api.key}")
    private String apikey;

    public void fetchAndSaveMovieRank() {
        String targetDt = LocalDate.now().minusDays(1)
                .format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        String url = String.format(
                "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=%s&targetDt=%s", apikey, targetDt
        );
        String response = restTemplate.getForObject(url, String.class);

        try {
            JsonNode root = objectMapper.readTree(response);
            JsonNode dailyBoxOfficeList = root.path("boxOfficeResult").path("dailyBoxOfficeList");

            List<MovieRank> movieRanks = new ArrayList<>();
            int sequence = 1;
            for(JsonNode node : dailyBoxOfficeList) {
                MovieRank movieRank = new MovieRank();
                String movieRankCd = String.format("RT%03d", sequence);
                movieRank.setMovierankcd(movieRankCd);
                movieRank.setMoviename(node.path("movieNm").asText());
                movieRank.setMovierank(node.path("rank").asInt());
                movieRank.setRankchange(node.path("rankInten").asInt());
                movieRanks.add(movieRank);
                sequence ++;
            }

            movieRankRepository.deleteAll();
            movieRankRepository.saveAll(movieRanks);
        } catch (Exception e) {
            throw new RuntimeException("Failed");
        }
    }

    public List<MovieRank> getMovieRank() {
        return movieRankRepository.findAll();
    }
}
