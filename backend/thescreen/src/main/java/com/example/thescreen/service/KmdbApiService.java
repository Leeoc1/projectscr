package com.example.thescreen.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
@Slf4j
public class KmdbApiService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${kmdb.api.key}")
    private String apiKey;

    public JsonNode fetchMovieKmdb(String movieNm) {
        try {
            // ✅ 1) 한글 제목 안전하게 인코딩!
            String encodedTitle = URLEncoder.encode(movieNm, StandardCharsets.UTF_8);

            // ✅ 2) KMDB 공식 엔드포인트 + 파라미터
            String url = String.format(
                    "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp" +
                            "?collection=kmdb_new2&detail=Y&title=%s&ServiceKey=%s",
                    encodedTitle,
                    apiKey
            );

            log.info("🎞️ KMDB 요청 URL: {}", url);

            // ✅ 3) API 호출 + JSON 파싱
            String response = restTemplate.getForObject(url, String.class);

            JsonNode root = objectMapper.readTree(response)
                    .path("Data");

            if (root.isEmpty()) {
                log.warn("❌ KMDB 데이터 없음: {}", movieNm);
                return null;
            }

            // ✅ KMDB 기본 구조: Data[0] → Result[0]
            JsonNode movieData = root.get(0).path("Result").get(0);

            log.info("✅ KMDB 호출 성공: {}", movieNm);
            return movieData;

        } catch (Exception e) {
            log.error("❌ KMDB API 호출 실패: {}", movieNm, e);
            return null;
        }
    }
}
