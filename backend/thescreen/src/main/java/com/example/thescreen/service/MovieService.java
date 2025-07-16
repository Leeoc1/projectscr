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

    @Value("${kmdb.api.key}")
    private String apiKey2;

    // KMDB API로 KOBIS/ KMDB 제목을 콘솔에 출력하는 유틸 메서드
    private void printKobisAndKmdbTitle(String kobisTitle, String openDt) {
        System.out.println("=== 함수 진입 ===");
        System.out.println("KOBIS Title: " + kobisTitle);
        System.out.println("openDt: " + openDt);
        System.out.println("API Key2: " + (apiKey2 != null ? "설정됨" : "NULL"));
        
        try {
            // URL 인코딩 추가
            String encodedTitle = java.net.URLEncoder.encode(kobisTitle, "UTF-8");
            String releaseYear = (openDt != null && openDt.length() >= 4) ? openDt.substring(0, 4) : "";
            
            String url = String.format(
                    "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&title=%s&releaseDts=%s&ServiceKey=%s",
                    encodedTitle, releaseYear, apiKey2
            );
            
            System.out.println("KMDB API URL: " + url);
            
            String kmdbResponse = restTemplate.getForObject(url, String.class);
            System.out.println("KMDB 응답 길이: " + (kmdbResponse != null ? kmdbResponse.length() : "NULL"));
            
            if (kmdbResponse != null) {
                JsonNode root = objectMapper.readTree(kmdbResponse);
                JsonNode dataArray = root.path("Data");
                
                System.out.println("Data 배열 크기: " + dataArray.size());
                
                if (dataArray.isArray() && dataArray.size() > 0) {
                    JsonNode results = dataArray.get(0).path("Result");
                    System.out.println("Result 배열 크기: " + results.size());
                    
                    for (JsonNode movieNode : results) {
                        String kmdbTitle = movieNode.path("title").asText();
                        System.out.println(">>> KOBIS Title: " + kobisTitle);
                        System.out.println(">>> KMDB Title: " + kmdbTitle);
                        System.out.println("------------------------");
                    }
                } else {
                    System.out.println("❌ KMDB Data 배열이 비어있음!");
                }
            } else {
                System.out.println("❌ KMDB 응답이 NULL입니다!");
            }
        } catch (Exception e) {
            System.out.println("❌ 예외 발생: " + e.getMessage());
            e.printStackTrace();
        }
        System.out.println("=== 함수 종료 ===\n");
    }

    // KMDB API에서 포스터 URL을 가져오는 메서드
    private String getPosterFromKmdb(String kobisTitle, String openDt) {
        System.out.println("🖼️ 포스터 검색 시작: " + kobisTitle);
        
        try {
            // URL 인코딩 추가
            String encodedTitle = java.net.URLEncoder.encode(kobisTitle, "UTF-8");
            String releaseYear = (openDt != null && openDt.length() >= 4) ? openDt.substring(0, 4) : "";
            
            String url = String.format(
                    "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&title=%s&releaseDts=%s&ServiceKey=%s",
                    encodedTitle, releaseYear, apiKey2
            );
            
            System.out.println("🔗 포스터 검색 URL: " + url);
            
            String kmdbResponse = restTemplate.getForObject(url, String.class);
            
            if (kmdbResponse != null) {
                JsonNode root = objectMapper.readTree(kmdbResponse);
                JsonNode dataArray = root.path("Data");
                
                if (dataArray.isArray() && dataArray.size() > 0) {
                    JsonNode results = dataArray.get(0).path("Result");
                    
                    for (JsonNode movieNode : results) {
                        String kmdbTitle = movieNode.path("title").asText();
                        
                        // 제목 유사성 체크 (간단한 포함 관계 체크)
                        if (isSimilarTitle(kobisTitle, kmdbTitle)) {
                            JsonNode posters = movieNode.path("posters");
                            if (!posters.isMissingNode() && !posters.asText().isEmpty()) {
                                String posterUrl = posters.asText().split("\\|")[0]; // 첫 번째 포스터 사용
                                System.out.println("✅ 포스터 발견: " + posterUrl);
                                return posterUrl;
                            }
                        }
                    }
                }
            }
            
            System.out.println("❌ 포스터를 찾지 못했습니다: " + kobisTitle);
            return null;
            
        } catch (Exception e) {
            System.out.println("❌ 포스터 검색 중 오류: " + e.getMessage());
            return null;
        }
    }

    // 제목 유사성 체크 메서드 (간단한 버전)
    private boolean isSimilarTitle(String kobisTitle, String kmdbTitle) {
        if (kobisTitle == null || kmdbTitle == null) return false;
        
        // HTML 태그 제거
        String cleanKmdbTitle = kmdbTitle.replaceAll("<[^>]*>", "").trim();
        
        // 공백 제거 후 비교
        String cleanKobis = kobisTitle.replaceAll("\\s+", "");
        String cleanKmdb = cleanKmdbTitle.replaceAll("\\s+", "");
        
        System.out.println("🔍 제목 비교: [" + cleanKobis + "] vs [" + cleanKmdb + "]");
        
        // 완전 일치 또는 포함 관계 체크
        return cleanKobis.equals(cleanKmdb) || 
               cleanKmdb.contains(cleanKobis) || 
               cleanKobis.contains(cleanKmdb);
    }

    /**
     * ✅ KOBIS 일별 박스오피스 + 상세 정보까지 한 번에 저장
     */
    @Transactional
    public void saveDailyBoxOffice() {
        System.out.println("🚀🚀🚀 saveDailyBoxOffice 함수 시작! 🚀🚀🚀");
        
        LocalDate targetDate = LocalDate.now().minusDays(1);
        String targetDt = targetDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        String url = String.format(
                "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=%s&targetDt=%s&itemPerPage=10",
                apiKey, targetDt
        );

        log.info("🎬 일별 박스오피스 URL: {}", url);
        System.out.println("📡📡📡 KOBIS API 호출 시작: " + url);

        try {
            String response = restTemplate.getForObject(url, String.class);
            JsonNode boxOfficeList = objectMapper.readTree(response)
                    .path("boxOfficeResult")
                    .path("dailyBoxOfficeList");

            if (boxOfficeList.isEmpty()) {
                log.info("✅ 데이터 없음: targetDt={}", targetDt);
                return;
            }

            for (JsonNode boxOffice : boxOfficeList) {
                String movieCd = boxOffice.path("movieCd").asText();
                String movieNm = boxOffice.path("movieNm").asText();
                String openDt = boxOffice.path("openDt").asText();

                System.out.println("🎬🎬🎬 영화 처리 시작: " + movieNm + " 🎬🎬🎬");

                if (movieRepository.existsById(movieCd)) {
                    log.info("⏭️ 이미 존재하는 영화 건너뜀: {} [{}]", movieNm, movieCd);
                    System.out.println("⏭️⏭️⏭️ 이미 존재하는 영화 건너뜀: " + movieNm);
                    continue;
                }

                System.out.println("🆕🆕🆕 새로운 영화 발견: " + movieNm + " - KMDB 호출 시작!");

                // KOBIS 상세 정보 API
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

                // ★ KOBIS/ KMDB 영화 제목 콘솔 출력
                System.out.println("🔥🔥🔥 KMDB 함수 호출 직전! 영화: " + movieNm);
                printKobisAndKmdbTitle(movieNm, openDt);
                System.out.println("✅✅✅ KMDB 함수 호출 완료! 영화: " + movieNm);

                // 포스터 URL 가져오기
                System.out.println("🖼️🖼️🖼️ 포스터 검색 시작: " + movieNm);
                String posterUrl = getPosterFromKmdb(movieNm, openDt);
                System.out.println("🖼️ 포스터 결과: " + (posterUrl != null ? posterUrl : "포스터 없음"));

                Movie movie = new Movie();
                movie.setMoviecd(movieCd);
                movie.setMovienm(movieNm);
                movie.setMovieinfo("N");
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
                movie.setPosterurl(posterUrl); // 포스터 URL 저장

                movieRepository.save(movie);
                log.info("✅ 새 영화 저장 성공: {} [{}]", movieNm, movieCd);
            }
        } catch (Exception e) {
            log.error("❌ 박스오피스 저장 실패 targetDt={}", targetDt, e);
        }
    }

    // @PostConstruct - 자동 실행 비활성화
    // public void init() {
    //     saveDailyBoxOffice();
    //     log.info("✅ 서버 시작 시 박스오피스 저장 완료!");
    // }

    // @Scheduled(cron = "0 0 1 * * ?") - 스케줄러 비활성화
    // public void scheduledSaveDailyBoxOffice() {
    //     saveDailyBoxOffice();
    //     log.info("✅ 스케줄러로 BoxOffice 데이터 저장 완료!");
    // }

}
