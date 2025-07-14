package com.example.thescreen.controller;

import com.example.thescreen.entity.User;
import com.example.thescreen.repository.UserRepository;
import com.example.thescreen.service.NaverLoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
public class NaverLoginController {

    private final NaverLoginService naverLoginService;
    private final UserRepository userRepository;

    @PostMapping("/login/naver")
    public ResponseEntity<?> getNaverLoginUrl() {
        try {
            String loginUrl = naverLoginService.getNaverLogin();
            Map<String, String> reponse = new HashMap<>();
            reponse.put("loginUrl", loginUrl);
            return ResponseEntity.ok(reponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("네이버 로그인 URL 생성 실패");
        }
    }

    @PostMapping("/login/naver/callback")
    public ResponseEntity<?> naverCallback(@RequestParam(required = false) String code,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String error) throws Exception {

        if ("access_denied".equals(error)) {
            // 동의 거부 시
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", "네이버 로그인 동의가 취소되었습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        try {
            // 1. 액세스 토큰 받기
            Map<String, Object> tokenResponse = naverLoginService.getNaverToken(code, state);

            // 2. 사용자 정보 받기
            Map<String, Object> userInfo = naverLoginService
                    .getNaverUserInfo((String) tokenResponse.get("access_token"));

            // 이미 가입된 회원인지 확인
            String naverId = (String) userInfo.get("id");
            Optional<User> userOpt = userRepository.findById(naverId);

            // 3. 응답 생성
            Map<String, Object> response = new HashMap<>();
            if (userOpt.isPresent()) {
                // 이미 회원
                response.put("success", true);
                response.put("userInfo", userOpt.get());
                response.put("needSignup", false);
            } else {
                // 회원이 아니면 새로 저장(회원가입)
                User newUser = naverLoginService.createNaverUser(userInfo); // 업데이트 없이 신규만 저장
                response.put("success", true);
                response.put("userInfo", newUser);
                response.put("needSignup", false);
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
