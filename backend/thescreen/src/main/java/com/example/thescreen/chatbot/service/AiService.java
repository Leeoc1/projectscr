package com.example.thescreen.chatbot.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Map;
import java.util.List;
import java.util.HashMap;
import java.util.ArrayList;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;
import com.example.thescreen.entity.Movie;
import com.example.thescreen.repository.MovieRepository;

@Service
public class AiService {
    @Value("${spring.ai.openai.api-key}")
    private String openAiApiKey;
    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

    @Autowired
    private MovieRepository movieRepository;

    public Map<String, Object> askAI(String question) {
        String aiAnswer = generateAiResponse(question);
        return Map.of("type", "ai", "data", Map.of("content", aiAnswer));
    }

    private String generateAiResponse(String question) {
        String lowerQuestion = question.toLowerCase().trim();

        if (lowerQuestion.contains("추천") || lowerQuestion.contains("recommend")) {
            // DB에서 상영 중인 영화 3개 추출
            List<Movie> movies = movieRepository.findByMovieinfo("Y");
            System.out.println("DB에서 조회된 영화 수: " + movies.size());

            if (movies.isEmpty()) {
                return "현재 상영 중인 영화가 없습니다.";
            }

            List<Movie> top3 = movies.stream().limit(3).toList();
            StringBuilder movieList = new StringBuilder();
            for (Movie m : top3) {
                System.out.println("추천 영화: " + m.getMovienm() + ", 장르: " + m.getGenre());
                movieList.append(m.getMovienm()).append(" (장르: ").append(m.getGenre()).append(")\n");
            }
            String prompt = "아래 영화들을 사용자에게 자연스럽게 추천해줘:\n" + movieList.toString();
            System.out.println("OpenAI에 전달할 프롬프트: " + prompt);
            return callOpenAi(prompt);
        }

        if (lowerQuestion.contains("줄거리") || lowerQuestion.contains("스토리")) {
            // 영화명 추출 (가장 긴 단어 기준)
            List<Movie> movies = movieRepository.findByMovieinfo("Y");
            System.out.println("DB에서 조회된 전체 영화 수: " + movies.size());

            Movie found = null;
            for (Movie m : movies) {
                System.out.println("DB 영화 확인: " + m.getMovienm());
                if (question.contains(m.getMovienm())) {
                    found = m;
                    System.out.println("매칭된 영화 발견: " + m.getMovienm());
                    break;
                }
            }

            if (found != null && found.getDescription() != null && !found.getDescription().isBlank()) {
                String prompt = "아래 영화 줄거리를 사용자에게 자연스럽게 요약해서 알려줘:\n" + found.getDescription();
                System.out.println("OpenAI에 전달할 줄거리: "
                        + found.getDescription().substring(0, Math.min(100, found.getDescription().length())) + "...");
                return callOpenAi(prompt);
            } else {
                System.out.println("매칭된 영화 없음. 입력된 질문: " + question);
                return "해당 영화의 줄거리 정보를 찾을 수 없습니다.";
            }
        }

        return "지원하지 않는 질문입니다.";
    }

    private String callOpenAi(String prompt) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(openAiApiKey);

            Map<String, Object> body = new HashMap<>();
            body.put("model", "gpt-3.5-turbo");
            List<Map<String, String>> messages = new ArrayList<>();
            Map<String, String> userMessage = new HashMap<>();
            userMessage.put("role", "user");
            userMessage.put("content", prompt);
            messages.add(userMessage);
            body.put("messages", messages);
            body.put("max_tokens", 300);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            ResponseEntity<Map> response = restTemplate.exchange(OPENAI_API_URL, HttpMethod.POST, entity, Map.class);

            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null && responseBody.containsKey("choices")) {
                Object choices = responseBody.get("choices");
                if (choices instanceof List<?>) {
                    Map<?, ?> firstChoice = (Map<?, ?>) ((List<?>) choices).get(0);
                    Map<?, ?> message = (Map<?, ?>) firstChoice.get("message");
                    return message.get("content").toString();
                }
            }
            return "AI 응답을 가져오지 못했습니다.";
        } catch (Exception e) {
            return "OpenAI API 호출 오류: " + e.getMessage();
        }
    }
}
