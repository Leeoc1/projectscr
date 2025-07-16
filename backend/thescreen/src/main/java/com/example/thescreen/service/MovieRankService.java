package com.example.thescreen.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class MovieRankService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void init() {
        saveMovieRanksFromApi();
    }

    public void saveMovieRanksFromApi() {
        try {
            String targetDate = LocalDate.now().minusDays(1).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            String apiUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json"
                    + "?key=185c6011b370c8bf203f5bf993de4d24"
                    + "&targetDt=" + targetDate;

            URL url = new URL(apiUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            InputStream is = conn.getInputStream();
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(is);

            JsonNode boxOfficeList = root.path("boxOfficeResult").path("dailyBoxOfficeList");

            // 기존 데이터 삭제 (선택)
            jdbcTemplate.update("DELETE FROM movierank");

            for (JsonNode movie : boxOfficeList) {
                String code = movie.get("movieCd").asText();         // PK
                String name = movie.get("movieNm").asText();         // 영화 제목
                int rank = movie.get("rank").asInt();                // 순위
                int rankInten = movie.get("rankInten").asInt();      // 전일 대비 순위 변화

                jdbcTemplate.update(
                        "INSERT INTO movierank (movierankcd, moviename, movierank, rankchange) VALUES (?, ?, ?, ?)",
                        code, name, rank, rankInten
                );
            }

            System.out.println(">>> 박스오피스 랭킹 DB 저장 완료");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
