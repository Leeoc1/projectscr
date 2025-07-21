package com.example.thescreen.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
public class ApiController {

//    @Value("${kakao.api.key}")
//    private String kakaoApiKey;
//
//    @GetMapping("/api/kakao")
//    public Map<String, String> getApiKeys() {
//        return Collections.singletonMap("kakao", kakaoApiKey);
//    }
}
