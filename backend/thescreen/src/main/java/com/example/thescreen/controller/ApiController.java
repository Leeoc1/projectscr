package com.example.thescreen.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
public class ApiController {
//    @Value("${kakao.api.key}")
//    private String kakaoApiKey;
//
//    @GetMapping("/api/kakao")
//    public Map<String, String> getKakaoApiKey() {
//        Map<String, String> response = new HashMap<>();
//        response.put("key", kakaoApiKey);
//        return response;
//    }
}
