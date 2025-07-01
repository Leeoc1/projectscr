package com.example.thescreen.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

<<<<<<< HEAD
@Configuration // 설정 클래스
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) { // CORS 설정
        registry.addMapping("/**") // 모든 경로 허용
                .allowedOrigins("http://localhost:3000") // 리액트 도메인
                .allowedMethods("GET", "POST", "PUT", "DELETE"); // HTTP 메서드
=======
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
>>>>>>> ee44428e6f70464f49fbb3cad2d41128779cd105
    }
}
