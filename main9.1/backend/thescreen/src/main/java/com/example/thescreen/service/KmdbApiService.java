package com.example.thescreen.service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
@Slf4j
public class KmdbApiService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${kmdb.api.key}")
    private String apiKey;

    /**
     * 영화명으로 KMDB API 호출 → JsonNode 반환
     * (성공 시 영화 데이터, 실패 또는 결과 없음 시 null 반환)
     */
    public JsonNode fetchMovieKmdb(String movieNm, LocalDate releaseDate) {
        try {
            // 1️⃣ 제목을 URL 안전하게 인코딩
            String encoded = URLEncoder.encode(movieNm, StandardCharsets.UTF_8);
            String ymd = releaseDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            // 2️⃣ KMDB API 호출 URL 조립
            String url = UriComponentsBuilder
                    .fromHttpUrl("http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp")
                    .queryParam("ServiceKey", apiKey)            // 인증키
                    .queryParam("collection", "kmdb_new2")       // 반드시 kmdb_new2
                    .queryParam("detail", "Y")                   // 상세정보 포함
                    .queryParam("Query", encoded)                // 제목 검색
                    .queryParam("releaseDts", ymd)               // 개봉 시작일 (Optional)
                    .queryParam("releaseDte", ymd)               // 개봉 종료일 (Optional)
                    .toUriString();
            log.info("🎞️ KMDB 요청 URL: {}", url);

            // 3️⃣ RestTemplate으로 API 호출 후 JSON 문자열 획득
            String jsonResponse = restTemplate.getForObject(url, String.class);

            log.debug("🔍 KMDB Raw Response for {}: {}", movieNm, jsonResponse);

            // 4️⃣ Jackson으로 파싱
            JsonNode root = objectMapper.readTree(jsonResponse);
            JsonNode dataArray = root.path("Data");
            if (!dataArray.isArray() || dataArray.size() == 0) {
                log.warn("❌ KMDB 결과가 없습니다: {}", movieNm);
                return null;
            }

            JsonNode resultArray = dataArray.get(0).path("Result");
            if (!resultArray.isArray() || resultArray.size() == 0) {
                log.warn("❌ KMDB Result가 없습니다: {}", movieNm);
                return null;
            }

            // 5️⃣ 첫 번째 영화 정보 노드 반환
            JsonNode movieData = resultArray.get(0);
            log.info("✅ KMDB 호출 성공: {}", movieNm);
            return movieData;

        } catch (Exception e) {
            log.error("❌ KMDB API 호출 실패: {}", movieNm, e);
            return null;
        }
    }
}
