package com.example.thescreen.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // 설정 클래스
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) { // CORS 설정
        registry.addMapping("/**") // 모든 경로 허용
                .allowedOriginPatterns("*") // 모든 오리진 패턴 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // HTTP 메서드
                .allowedHeaders("*") // 모든 헤더 허용
                .allowCredentials(false) // credentials 비활성화
                .maxAge(3600); // preflight 캐시 시간
    }
}
