package com.example.thescreen.chatbot;

import com.example.thescreen.entity.*;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/chatbot")
public class ChatBotController {

    private final ChatBotService chatBotService;
    private final ChatClient chatClient;

    public ChatBotController(ChatBotService chatBotService, ChatClient chatClient) {
        this.chatBotService = chatBotService;
        this.chatClient = chatClient;
    }

    @GetMapping("/ask")
    public ResponseEntity<Map<String, Object>> ask(@RequestParam String question) {
        long startTime = System.currentTimeMillis();

        try {
            String cleanQuestion = question.trim().toLowerCase();
            Map<String, Object> response = null;

            // 1. FAQ 검색
            response = chatBotService.searchFAQ(cleanQuestion);
            if (response != null) {
                logResponse(startTime, response.toString(), "FAQ 검색");
                return createCorsResponse(response);
            }

            // 2. Public 검색
            response = chatBotService.searchNotice(cleanQuestion);
            if (response != null) {
                logResponse(startTime, response.toString(), "공지사항 검색");
                return createCorsResponse(response);
            }

            // 3. 탑10 영화 검색
            response = chatBotService.searchTopMovies(cleanQuestion);
            if (response != null) {
                logResponse(startTime, response.toString(), "탑10 영화 검색");
                return createCorsResponse(response);
            }

            // 4. 영화 검색
            response = chatBotService.searchMovie(cleanQuestion);
            if (response != null) {
                logResponse(startTime, response.toString(), "영화 검색");
                return createCorsResponse(response);
            }

            // 5. 극장 검색 (상영관별 영화 검색보다 먼저)
            response = chatBotService.searchCinema(cleanQuestion);
            if (response != null) {
                logResponse(startTime, response.toString(), "극장 검색");
                return createCorsResponse(response);
            }

            // 6. 상영관별 영화 검색
            response = chatBotService.searchCinemaMovies(cleanQuestion);
            if (response != null) {
                logResponse(startTime, response.toString(), "상영관별 영화 검색");
                return createCorsResponse(response);
            }

            // 7. AI 응답
            return handleAIResponse(question, startTime);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("type", "error");
            errorResponse.put("data", Map.of("content", "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."));
            logResponse(startTime, errorResponse.toString(), "서버 내부 오류");
            return createErrorResponse(errorResponse, 500);
        }
    }

    private ResponseEntity<Map<String, Object>> handleAIResponse(String question, long startTime) {
        Map<String, Object> response = new HashMap<>();

        try {
            // AI 컨텍스트 생성
            StringBuilder context = new StringBuilder();
            context.append("너는 영화 예매 사이트의 챗봇이야. 다음 정보를 참고해서 질문에 답변해:\n");

            // FAQ 정보 추가
            List<Faq> allFaqs = chatBotService.getAllFaqs();
            context.append("- FAQ: ").append(allFaqs.stream()
                    .map(f -> f.getFaqsub() + ": " + f.getFaqcontents())
                    .collect(Collectors.joining("\n"))).append("\n");

            // 공지사항 정보 추가
            List<Notice> allNotices = chatBotService.getAllNotices();
            context.append("- 공지사항: ").append(allNotices.stream()
                    .map(n -> n.getNoticesub() + ": " + n.getNoticecontents())
                    .collect(Collectors.joining("\n"))).append("\n");

            // 영화 정보 추가
            List<MovieView> allMovies = chatBotService.getAllMovies();
            context.append("- 영화: ").append(allMovies.stream()
                    .map(m -> m.getMovienm() + " (장르: " + m.getGenre() + ", 개봉일: "
                            + (m.getReleasedate() != null ? new SimpleDateFormat("yyyy-MM-dd").format(m.getReleasedate()) : "미공개") + ")")
                    .collect(Collectors.joining("\n"))).append("\n");

            // 극장 정보 추가
            List<Cinema> allCinemas = chatBotService.getAllCinemas();
            context.append("- 극장: ").append(allCinemas.stream()
                    .map(c -> c.getCinemanm() + " (주소: " + (c.getAddress() != null ? c.getAddress() : "정보 없음") + ")")
                    .collect(Collectors.joining("\n"))).append("\n");

            context.append("질문이 영화 예매, 영화 정보, 극장 정보와 관련 없으면 '죄송하지만, 해당 질문에 대한 답변을 찾지 못했습니다. 다른 질문을 해 주세요.'라고 답해주세요.\n");
            context.append("질문: ").append(question).append("\n답변을 간결하고 자연스럽게 제공해.");

            // AI 응답 호출
            String aiResponse = chatClient
                    .prompt()
                    .user(context.toString())
                    .call()
                    .content();

            response.put("type", "ai");
            response.put("data", Map.of("content", aiResponse));
            logResponse(startTime, response.toString(), "OpenAI API 응답");
            return createCorsResponse(response);

        } catch (Exception e) {
            e.printStackTrace();
            response.put("type", "error");
            response.put("data", Map.of("content", "죄송합니다. 답변을 생성하는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."));
            logResponse(startTime, response.toString(), "OpenAI API 예외 발생");
            return createErrorResponse(response, 500);
        }
    }

    @RequestMapping(value = "/ask", method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptions() {
        return ResponseEntity.ok()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                .header("Access-Control-Allow-Headers", "*")
                .header("Access-Control-Max-Age", "3600")
                .build();
    }

    private void logResponse(long startTime, String response, String searchType) {
        long endTime = System.currentTimeMillis();
        long processingTime = endTime - startTime;
        System.out.println(
                "Search Type: " + searchType + ", Processing Time: " + processingTime + "ms, Response: " + response);
    }

    private ResponseEntity<Map<String, Object>> createCorsResponse(Map<String, Object> response) {
        return ResponseEntity.ok()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                .header("Access-Control-Allow-Headers", "*")
                .header("Content-Type", "application/json")
                .body(response);
    }

    private ResponseEntity<Map<String, Object>> createErrorResponse(Map<String, Object> response, int statusCode) {
        return ResponseEntity.status(statusCode)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                .header("Access-Control-Allow-Headers", "*")
                .header("Content-Type", "application/json")
                .body(response);
    }
}