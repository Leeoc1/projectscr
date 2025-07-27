package com.example.thescreen.chatbot;

import com.example.thescreen.entity.*;
import com.example.thescreen.repository.*;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ChatBotService {

    private final FaqRepository faqRepository;
    private final NoticeRepository noticeRepository;
    private final MovieViewRepository movieViewRepository;
    private final CinemaRepository cinemaRepository;
    private final ScheduleViewRepository scheduleViewRepository;

    public ChatBotService(FaqRepository faqRepository, NoticeRepository noticeRepository,
                         MovieViewRepository movieViewRepository, CinemaRepository cinemaRepository,
                         ScheduleViewRepository scheduleViewRepository) {
        this.faqRepository = faqRepository;
        this.noticeRepository = noticeRepository;
        this.movieViewRepository = movieViewRepository;
        this.cinemaRepository = cinemaRepository;
        this.scheduleViewRepository = scheduleViewRepository;
    }

    public Map<String, Object> searchFAQ(String cleanQuestion) {
        // 1. FAQ 제목에서 사용자 질문의 키워드 찾기
        List<Faq> searchResults = faqRepository.findByFaqsubContainingIgnoreCase(cleanQuestion);
        if (!searchResults.isEmpty()) {
            return createResponse("faq", Map.of("content", searchResults.get(0).getFaqcontents()));
        }

        // 2. FAQ 제목에 질문 단어 포함 여부
        List<Faq> allFaqs = faqRepository.findAll();
        for (Faq faq : allFaqs) {
            if (isWordMatch(faq.getFaqsub().toLowerCase(), cleanQuestion)) {
                return createResponse("faq", Map.of("content", faq.getFaqcontents()));
            }
        }
        return null;
    }

    public Map<String, Object> searchNotice(String cleanQuestion) {
        // 1. Notice 제목에서 사용자 질문의 키워드 찾기
        List<Notice> noticeSearchResults = noticeRepository.findByNoticesubContainingIgnoreCase(cleanQuestion);
        if (!noticeSearchResults.isEmpty()) {
            return createResponse("notice", Map.of("content", noticeSearchResults.get(0).getNoticecontents()));
        }

        // 2. Notice 제목에 질문 단어 포함 여부
        List<Notice> allNotice = noticeRepository.findAll();
        for (Notice notice : allNotice) {
            if (isWordMatch(notice.getNoticesub().toLowerCase(), cleanQuestion)) {
                return createResponse("notice", Map.of("content", notice.getNoticecontents()));
            }
        }
        return null;
    }

    public Map<String, Object> searchTopMovies(String cleanQuestion) {
        if (cleanQuestion.contains("탑10") || cleanQuestion.contains("top10") || cleanQuestion.contains("인기 영화")) {
            List<MovieView> topMovies = movieViewRepository.findMoviesWithRank();
            if (!topMovies.isEmpty()) {
                List<Map<String, Object>> movieList = topMovies.stream().limit(10).map(movie -> {
                    Map<String, Object> movieData = new HashMap<>();
                    movieData.put("name", movie.getMovienm());
                    movieData.put("rank", movie.getMovierank());
                    movieData.put("moviecd", movie.getMoviecd());
                    return movieData;
                }).collect(Collectors.toList());
                return createResponse("top10", Map.of("movies", movieList));
            }
        }
        return null;
    }

    public Map<String, Object> searchMovie(String cleanQuestion) {
        // 1. 영화 제목 검색
        List<MovieView> movieSearchResults = movieViewRepository.findByMovienmContainingIgnoreCase(cleanQuestion);
        if (!movieSearchResults.isEmpty()) {
            return createMovieResponse(movieSearchResults.get(0));
        }

        // 2. 영화 제목 단어 매칭
        List<MovieView> allMovies = movieViewRepository.findAll();
        for (MovieView movie : allMovies) {
            if (isWordMatch(movie.getMovienm().toLowerCase(), cleanQuestion)) {
                return createMovieResponse(movie);
            }
        }
        return null;
    }

    public Map<String, Object> searchCinema(String cleanQuestion) {
        // 1. 지역별 극장 검색
        List<Cinema> regionCinemas = cinemaRepository.findByAddressContainingIgnoreCase(cleanQuestion);
        if (!regionCinemas.isEmpty()) {
            List<Map<String, String>> cinemaList = regionCinemas.stream()
                    .limit(10)
                    .map(cinema -> Map.of(
                            "name", cinema.getCinemanm(),
                            "address", cinema.getAddress() != null ? cinema.getAddress() : "주소 정보 없음",
                            "cinemacd", String.valueOf(cinema.getCinemacd())))
                    .collect(Collectors.toList());
            return createResponse("suggestion", Map.of("cinemas", cinemaList));
        }

        // 2. 극장명 검색
        List<Cinema> cinemaSearchResults = cinemaRepository.findByCinemanmContainingIgnoreCase(cleanQuestion);
        if (!cinemaSearchResults.isEmpty()) {
            Cinema cinema = cinemaSearchResults.get(0);
            
            // 해당 극장의 상영 영화 목록도 함께 조회
            List<String> movieNames = scheduleViewRepository.findDistinctMovieNamesByCinemanm(cinema.getCinemanm());
            if (movieNames.isEmpty()) {
                // 부분 매칭으로 다시 시도
                List<ScheduleView> matchingSchedules = scheduleViewRepository.findByCinemanmContaining(cinema.getCinemanm());
                if (!matchingSchedules.isEmpty()) {
                    movieNames = matchingSchedules.stream()
                        .map(ScheduleView::getMovienm)
                        .distinct()
                        .collect(Collectors.toList());
                }
            }
            
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("cinemaname", cinema.getCinemanm());
            responseData.put("cinemaaddress", cinema.getAddress() != null ? cinema.getAddress() : "주소 정보 없음");
            responseData.put("cinemastatus", cinema.getStatus() != null ? cinema.getStatus() : "상태 정보 없음");
            responseData.put("cinematel", cinema.getTel() != null ? cinema.getTel() : "전화번호 정보 없음");
            responseData.put("cinemacd", String.valueOf(cinema.getCinemacd()));
            responseData.put("movies", movieNames); // 영화 목록 추가
            
            System.out.println("=== 극장 검색 응답 데이터 ===");
            System.out.println("극장명: " + cinema.getCinemanm());
            System.out.println("영화 목록: " + movieNames);
            System.out.println("영화 개수: " + (movieNames != null ? movieNames.size() : "null"));
            System.out.println("전체 응답 데이터: " + responseData);
            
            return createResponse("cinema", responseData);
        }
        return null;
    }

    public Map<String, Object> searchCinemaMovies(String cleanQuestion) {
        System.out.println("=== searchCinemaMovies 호출 ===");
        System.out.println("검색 쿼리: " + cleanQuestion);

        // 모든 스케줄 데이터 확인
        List<ScheduleView> allSchedules = scheduleViewRepository.findAll();
        System.out.println("전체 스케줄 데이터 개수: " + allSchedules.size());

        if (!allSchedules.isEmpty()) {
            System.out.println("첫 번째 스케줄 데이터:");
            ScheduleView first = allSchedules.get(0);
            System.out.println("극장명: " + first.getCinemanm());
            System.out.println("영화명: " + first.getMovienm());

            // 처음 5개 데이터 출력
            System.out.println("\n=== 처음 5개 스케줄 데이터 ===");
            for (int i = 0; i < Math.min(5, allSchedules.size()); i++) {
                ScheduleView schedule = allSchedules.get(i);
                System.out.println(i+1 + ". 극장: " + schedule.getCinemanm() + ", 영화: " + schedule.getMovienm());
            }
        }

        // 1차 검색: 정확한 매칭
        List<String> movieNames = scheduleViewRepository.findDistinctMovieNamesByCinemanm(cleanQuestion);
        System.out.println("1차 검색 결과 (정확 매칭): " + movieNames);

        if (movieNames.isEmpty()) {
            // 2차 검색: 부분 매칭으로 스케줄 찾기
            List<ScheduleView> matchingSchedules = scheduleViewRepository.findByCinemanmContaining(cleanQuestion);
            System.out.println("2차 검색: 매칭된 스케줄 개수: " + matchingSchedules.size());

            if (!matchingSchedules.isEmpty()) {
                movieNames = matchingSchedules.stream()
                    .map(ScheduleView::getMovienm)
                    .distinct()
                    .collect(Collectors.toList());
                System.out.println("2차 검색 결과: " + movieNames);
            }
        }

        // 3차 검색: 극장명에서 키워드 포함 여부 확인
        if (movieNames.isEmpty()) {
            System.out.println("3차 검색: 키워드로 극장 찾기");
            movieNames = allSchedules.stream()
                .filter(schedule -> schedule.getCinemanm() != null &&
                                  schedule.getCinemanm().toLowerCase().contains(cleanQuestion.toLowerCase()))
                .map(ScheduleView::getMovienm)
                .distinct()
                .collect(Collectors.toList());
            System.out.println("3차 검색 결과: " + movieNames);
        }

        System.out.println("최종 영화 목록: " + movieNames);
        System.out.println("영화 개수: " + movieNames.size());

        if (!movieNames.isEmpty()) {
            // 결과가 너무 많은 경우 제한하고 안내 메시지 추가
            if (movieNames.size() > 10) {
                List<String> limitedMovies = movieNames.stream()
                    .limit(10)
                    .collect(Collectors.toList());
                
                Map<String, Object> responseData = new HashMap<>();
                responseData.put("cinemamovies", limitedMovies);
                responseData.put("totalCount", movieNames.size());
                responseData.put("message", "총 " + movieNames.size() + "개의 영화가 상영 중입니다. 상위 10개를 표시합니다.");
                responseData.put("hasMore", true);
                
                return createResponse("cinemamovies", responseData);
            } else {
                return createResponse("cinemamovies", Map.of("cinemamovies", movieNames));
            }
        }
        return null;
    }

    public List<Faq> getAllFaqs() {
        return faqRepository.findAll();
    }

    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    public List<MovieView> getAllMovies() {
        return movieViewRepository.findAll();
    }

    public List<Cinema> getAllCinemas() {
        return cinemaRepository.findAll();
    }

    private boolean isWordMatch(String title, String question) {
        String[] questionWords = question.split("\\s+");
        int matchCount = 0;

        for (String word : questionWords) {
            if (word.length() > 1 && title.contains(word)) {
                matchCount++;
            }
        }
        return questionWords.length > 0 && (double) matchCount / questionWords.length >= 0.5;
    }

    private Map<String, Object> createResponse(String type, Map<String, Object> data) {
        Map<String, Object> response = new HashMap<>();
        response.put("type", type);
        response.put("data", data);
        return response;
    }

    private Map<String, Object> createMovieResponse(MovieView movie) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String releaseDateStr = movie.getReleasedate() != null ? dateFormat.format(movie.getReleasedate()) : "미공개";

        return createResponse("movie", Map.of(
                "name", movie.getMovienm(),
                "genre", movie.getGenre(),
                "movieinfo", movie.getDescription() != null ? movie.getDescription() : movie.getMovieinfo(),
                "releasedate", releaseDateStr,
                "runningtime", movie.getRunningtime(),
                "moviecd", movie.getMoviecd()));
    }
}
