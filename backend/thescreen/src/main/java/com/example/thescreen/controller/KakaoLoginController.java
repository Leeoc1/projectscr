package com.example.thescreen.controller;

import com.example.thescreen.entity.User;
import com.example.thescreen.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/login")
public class KakaoLoginController {

    @Value("${kakao.client.id}")
    private String clientId;

    @Value("${kakao.client.secret}")
    private String clientSecret;

    @Value("${kakao.redirect.uri}")
    private String redirectUri;

    private final UserRepository userRepository;

    public KakaoLoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/kakao")
    public Map<String, String> kakaoLogin(@RequestParam(value = "prompt", required = false) String prompt) {
        String authorizationUrl = "https://kauth.kakao.com/oauth/authorize?response_type=code" +
                "&client_id=" + clientId +
                "&redirect_uri=" + redirectUri +
                "&scope=profile_nickname";
        if (prompt != null) {
            authorizationUrl += "&prompt=" + prompt;
        }
        Map<String, String> response = new HashMap<>();
        response.put("redirectUrl", authorizationUrl);
        System.out.println("Generated authorizationUrl: " + authorizationUrl);
        return response;
    }

    @GetMapping("/oauth2/code/kakao")
    public ResponseEntity<?> kakaoCallback(@RequestParam("code") String code) {
        try {
            // 1. 인가 코드로 토큰 요청
            RestTemplate restTemplate = new RestTemplate();
            String tokenUrl = "https://kauth.kakao.com/oauth/token";
            MultiValueMap<String, String> tokenParams = new LinkedMultiValueMap<>();
            tokenParams.add("grant_type", "authorization_code");
            tokenParams.add("client_id", clientId);
            tokenParams.add("client_secret", clientSecret);
            tokenParams.add("redirect_uri", redirectUri);
            tokenParams.add("code", code);

            HttpHeaders tokenHeaders = new HttpHeaders();
            tokenHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(tokenParams, tokenHeaders);

            ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(tokenUrl, tokenRequest, Map.class);
            Map<String, Object> tokenData = tokenResponse.getBody();
            String accessToken = (String) tokenData.get("access_token");
            System.out.println("Access Token: " + accessToken);

            // 2. 토큰으로 사용자 정보 요청
            String userInfoUrl = "https://kapi.kakao.com/v2/user/me";
            HttpHeaders userInfoHeaders = new HttpHeaders();
            userInfoHeaders.set("Authorization", "Bearer " + accessToken);
            HttpEntity<String> userInfoRequest = new HttpEntity<>(userInfoHeaders);

            ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, userInfoRequest, Map.class);
            Map<String, Object> userInfo = userInfoResponse.getBody();
            System.out.println("User Info: " + userInfo);

            // 3. 사용자 정보 처리
            String userId = String.valueOf(userInfo.get("id"));
            String nickname = (String) ((Map<?, ?>) userInfo.get("properties")).get("nickname");

            // 4. 데이터베이스 확인
            if (userRepository.existsByUserid(userId)) {
                // 기존 사용자: 로그인 처리
                System.out.println("기존 사용자 로그인: " + userId + ", " + nickname);
                HttpHeaders headers = new HttpHeaders();
                headers.add("Location", "http://localhost:3000");
                return new ResponseEntity<>(headers, HttpStatus.FOUND);
            } else {
                // 신규 사용자: 회원가입 처리
                System.out.println("신규 사용자 처리: " + userId + ", " + nickname);
                return registerUser(userId, nickname);
            }
        } catch (HttpClientErrorException e) {
            System.out.println("카카오 로그인 에러: " + e.getMessage());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "카카오 로그인 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    private ResponseEntity<?> registerUser(String userId, String nickname) {
        // 신규 사용자 등록
        User newUser = new User();
        newUser.setUserid(userId);
        newUser.setUsername(nickname);
        newUser.setEmail(null);
        newUser.setUserpw(null);
        newUser.setPhone(null);
        newUser.setBirth(null);
        newUser.setStatus("활성");
        newUser.setReg_date(LocalDate.now());
        userRepository.save(newUser);
        System.out.println("신규 사용자 등록 완료: " + userId + ", " + nickname);

        // 홈페이지로 리다이렉트
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", "http://localhost:3000");
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }
}