package com.example.thescreen.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.http.HttpHeaders;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Value("${kakao.client.id}")
    private String clientId;

    @Value("${kakao.client.secret}")
    private String clientSecret;

    @Value("${kakao.redirect.uri}")
    private String redirectUri;

    @PostMapping("/kakao")
    public Map<String, String> kakaoLogin() {
        String authorizationUrl = "https://kauth.kakao.com/oauth/authorize?response_type=code" +
                "&client_id=" + clientId +
                "&redirect_url=" + redirectUri;
        Map<String, String> response = new HashMap<>();
        response.put("redirectUri", authorizationUrl);
        return response;
    }

    //카카오로부터 리다이렉트된 콜백 처리
    @GetMapping("/kakao/callback")
    public Map<String, Object> kakaoCallback(@RequestParam("code") String code) {
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

        // 2. 토큰으로 사용자 정보 요청
        String userInfoUrl = "https://kapi.kakao.com/v2/user/me";
        HttpHeaders userInfoHeaders = new HttpHeaders();
        userInfoHeaders.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> userInfoRequest = new HttpEntity<>(userInfoHeaders);

        ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, userInfoRequest, Map.class);
        Map<String, Object> userInfo = userInfoResponse.getBody();

        // 3. 사용자 정보 콘솔 출력
        System.out.println("카카오 사용자 정보: " + userInfo);

        // 프론트로 사용자 정보 반환
        return userInfo;
    }
}
