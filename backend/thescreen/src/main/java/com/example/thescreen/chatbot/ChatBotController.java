package com.example.thescreen.chatbot;

import com.example.thescreen.entity.*;
import com.example.thescreen.repository.*;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/chatbot")
public class ChatBotController {

    private final FaqRepository faqRepository;
    private final ReservationViewRepository reservationViewRepository;
    private final NoticeRepository noticeRepository;
    private final MovieViewRepository movieViewRepository;
    private final CinemaRepository cinemaRepository;
    private final ScheduleViewRepository scheduleViewRepository;

    public ChatBotController(FaqRepository faqRepository, ReservationViewRepository reservationViewRepository,
            NoticeRepository noticeRepository, MovieViewRepository movieViewRepository,
            CinemaRepository cinemaRepository, ScheduleViewRepository scheduleViewRepository) {
        this.faqRepository = faqRepository;
        this.reservationViewRepository = reservationViewRepository;
        this.noticeRepository = noticeRepository;
        this.movieViewRepository = movieViewRepository;
        this.cinemaRepository = cinemaRepository;
        this.scheduleViewRepository = scheduleViewRepository;
    }

    @GetMapping("/ask")
    public Map<String, Object> ask(@RequestParam String question) {
        long startTime = System.currentTimeMillis();
        Map<String, Object> response = new HashMap<>();

        // 전체 FAQ, Notice, Movie 목록 확인
        List<Faq> allFaqs = faqRepository.findAll();
        List<Notice> allNotice = noticeRepository.findAll();
        List<MovieView> allMovies = movieViewRepository.findAll();
        List<ScheduleView> allSchedules = scheduleViewRepository.findAll();

        String cleanQuestion = question.trim().toLowerCase();

        // 1. FAQ 제목에서 사용자 질문의 키워드 찾기
        List<Faq> searchResults = faqRepository.findByFaqsubContainingIgnoreCase(cleanQuestion);
        if (!searchResults.isEmpty()) {
            response.put("type", "faq");
            response.put("data", Map.of("content", searchResults.get(0).getFaqcontents()));
            logResponse(startTime, response.toString(), "FAQ 기본 검색");
            return response;
        }

        // 2. FAQ 제목에 질문 단어 포함 여부
        for (Faq faq : allFaqs) {
            String faqTitle = faq.getFaqsub().toLowerCase();
            String userQuestion = cleanQuestion;

            String[] questionWords = userQuestion.split("\\s+");
            int matchCount = 0;

            for (String word : questionWords) {
                if (word.length() > 1 && faqTitle.contains(word)) {
                    matchCount++;
                }
            }

            if (questionWords.length > 0 && (double) matchCount / questionWords.length >= 0.5) {
                response.put("type", "faq");
                response.put("data", Map.of("content", faq.getFaqcontents()));
                logResponse(startTime, response.toString(), "FAQ 단어 매칭");
                return response;
            }
        }

        // 3. Notice 제목에서 사용자 질문의 키워드 찾기
        List<Notice> noticeSearchResults = noticeRepository.findByNoticesubContainingIgnoreCase(cleanQuestion);
        if (!noticeSearchResults.isEmpty()) {
            response.put("type", "notice");
            response.put("data", Map.of("content", noticeSearchResults.get(0).getNoticecontents()));
            logResponse(startTime, response.toString(), "Notice 기본 검색");
            return response;
        }

        // 4. Notice 제목에 질문 단어 포함 여부
        for (Notice notice : allNotice) {
            String noticeTitle = notice.getNoticesub().toLowerCase();
            String userQuestion = cleanQuestion;

            String[] questionWords = userQuestion.split("\\s+");
            int matchCount = 0;

            for (String word : questionWords) {
                if (word.length() > 1 && noticeTitle.contains(word)) {
                    matchCount++;
                }
            }
            if (questionWords.length > 0 && (double) matchCount / questionWords.length >= 0.5) {
                response.put("type", "notice");
                response.put("data", Map.of("content", notice.getNoticecontents()));
                logResponse(startTime, response.toString(), "Notice 단어 매칭");
                return response;
            }
        }

        // 5. 탑10 영화 검색
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
                response.put("type", "top10");
                response.put("data", Map.of("movies", movieList));
                logResponse(startTime, response.toString(), "탑10 영화 검색");
                return response;
            }
        }

        // 6. 영화 제목 검색
        List<MovieView> movieSearchResults = movieViewRepository.findByMovienmContainingIgnoreCase(cleanQuestion);
        if (!movieSearchResults.isEmpty()) {
            MovieView movie = movieSearchResults.get(0);
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            String releaseDateStr = movie.getReleasedate() != null ? dateFormat.format(movie.getReleasedate()) : "미공개";
            response.put("type", "movie");
            response.put("data", Map.of(
                    "name", movie.getMovienm(),
                    "genre", movie.getGenre(),
                    "movieinfo", movie.getDescription(),
                    "releasedate", releaseDateStr,
                    "runningtime", movie.getRunningtime(),
                    "moviecd", movie.getMoviecd()));
            logResponse(startTime, response.toString(), "영화 기본 검색");
            return response;
        }

        // 지역별 극장 검색 (주소에서 지역명 포함 여부 확인)
        List<Cinema> regionCinemas = cinemaRepository.findByAddressContainingIgnoreCase(cleanQuestion);
        if (!regionCinemas.isEmpty()) {
            List<Map<String, String>> cinemaList = regionCinemas.stream()
                    .limit(10) // 최대 10개까지 제한
                    .map(cinema -> Map.of(
                            "name", cinema.getCinemanm(),
                            "address", cinema.getAddress() != null ? cinema.getAddress() : "주소 정보 없음",
                            "cinemacd", String.valueOf(cinema.getCinemacd())))
                    .collect(Collectors.toList());

            response.put("type", "suggestion");
            response.put("data", Map.of("cinemas", cinemaList));
            logResponse(startTime, response.toString(), "지역별 극장 검색");
            return response;
        }

        // 상영관별 영화 검색 (극장명 검색보다 먼저)
        List<String> movieNames = scheduleViewRepository.findDistinctMovieNamesByCinemanm(cleanQuestion);
        if (!movieNames.isEmpty()) {
            response.put("type", "cinemamovies");
            response.put("data", Map.of("cinemamovies", movieNames));
            logResponse(startTime, response.toString(), "상영관별 영화 검색");
            return response;
        }

        // 극장명 검색
        List<Cinema> cinemaSearchResults = cinemaRepository.findByCinemanmContainingIgnoreCase(cleanQuestion);
        if (!cinemaSearchResults.isEmpty()) {
            Cinema cinema = cinemaSearchResults.get(0);
            response.put("type", "cinema");
            response.put("data", Map.of(
                    "cinemaname", cinema.getCinemanm(),
                    "cinemaaddress", cinema.getAddress() != null ? cinema.getAddress() : "주소 정보 없음",
                    "cinemastatus", cinema.getStatus() != null ? cinema.getStatus() : "상태 정보 없음",
                    "cinematel", cinema.getTel() != null ? cinema.getTel() : "전화번호 정보 없음",
                    "cinemacd", String.valueOf(cinema.getCinemacd())));
            logResponse(startTime, response.toString(), "극장 기본 검색");
            return response;
        }

        // 7. 영화 제목 단어 매칭
        for (MovieView movie : allMovies) {
            String movieTitle = movie.getMovienm().toLowerCase();
            String userQuestion = cleanQuestion;

            String[] questionWords = userQuestion.split("\\s+");
            int matchCount = 0;

            for (String word : questionWords) {
                if (word.length() > 1 && movieTitle.contains(word)) {
                    matchCount++;
                }
            }
            if (questionWords.length > 0 && (double) matchCount / questionWords.length >= 0.5) {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                String releaseDateStr = movie.getReleasedate() != null ? dateFormat.format(movie.getReleasedate())
                        : "미공개";
                response.put("type", "movie");
                response.put("data", Map.of(
                        "name", movie.getMovienm(),
                        "genre", movie.getGenre(),
                        "movieinfo", movie.getMovieinfo(),
                        "releasedate", releaseDateStr,
                        "runningtime", movie.getRunningtime(),
                        "moviecd", movie.getMoviecd()));
                logResponse(startTime, response.toString(), "영화 단어 매칭");
                return response;
            }
        }

        // 8. 검색 결과가 없으면 FAQ, Notice, 영화 제안 보여주기
        Map<String, Object> suggestionData = new HashMap<>();
        if (!allFaqs.isEmpty()) {
            List<String> faqSuggestions = allFaqs.stream()
                    .limit(3)
                    .map(Faq::getFaqsub)
                    .collect(Collectors.toList());
            suggestionData.put("faqs", faqSuggestions);
        }
        if (!allNotice.isEmpty()) {
            List<String> noticeSuggestions = allNotice.stream()
                    .limit(3)
                    .map(Notice::getNoticesub)
                    .collect(Collectors.toList());
            suggestionData.put("notices", noticeSuggestions);
        }
        if (!allMovies.isEmpty()) {
            List<Map<String, String>> movieSuggestions = movieViewRepository.findMoviesWithRank().stream()
                    .limit(3)
                    .map(movie -> Map.of("name", movie.getMovienm(), "moviecd", movie.getMoviecd()))
                    .collect(Collectors.toList());
            suggestionData.put("movies", movieSuggestions);
        }

        response.put("type", "suggestion");
        response.put("data", suggestionData);
        logResponse(startTime, response.toString(), "제안 목록");
        return response;
    }

    private void logResponse(long startTime, String response, String searchType) {
        long endTime = System.currentTimeMillis();
        long processingTime = endTime - startTime;
        System.out.println(
                "Search Type: " + searchType + ", Processing Time: " + processingTime + "ms, Response: " + response);
    }
}