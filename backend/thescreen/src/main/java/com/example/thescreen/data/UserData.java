package com.example.thescreen.data;

import com.example.thescreen.entity.User;
import com.example.thescreen.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class UserData {

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void seed() {
        System.out.println("사용자 데이터 생성 시작...");

        String[][] userData = {
            {"user1", "password123", "김철수", "kim@email.com", "010-1234-5678", "1990-01-01", "활성"},
            {"user2", "password456", "이영희", "lee@email.com", "010-2345-6789", "1992-05-15", "활성"},
            {"admin", "admin123", "관리자", "admin@thescreen.com", "010-9999-9999", "1985-12-25", "활성"},
            {"retired1", "retiredpw", "김탈퇴", "retired@email.com", "010-8888-8888", "1991-11-11", "탈퇴"}
        };

        for (String[] data : userData) {
            User user = new User();
            user.setUserid(data[0]);
            user.setUserpw(data[1]);
            user.setUsername(data[2]);
            user.setEmail(data[3]);
            user.setPhone(data[4]);
            user.setBirth(data[5]);
            user.setStatus(data[6]);
            userRepository.save(user);
        }

        System.out.println("사용자 데이터 생성 완료!");
    }
} 