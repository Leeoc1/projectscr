package com.example.thescreen.controller;

import com.example.thescreen.entity.User;
import com.example.thescreen.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/users")
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/list")
    public List<User> getUsersApi() {
        return userRepository.findAll();
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody Map<String, Object> userData) {
        try {
            User user = new User();
            user.setUserid((String) userData.get("userid"));
            user.setUserpw((String) userData.get("userpw"));
            user.setUsername((String) userData.get("username"));
            user.setEmail((String) userData.get("email"));
            user.setPhone((String) userData.get("phone"));
            user.setStatus((String) userData.get("status"));
            
            // 생년월일 처리
            if (userData.get("birth") != null) {
                String birthStr = (String) userData.get("birth");
                user.setBirth(LocalDate.parse(birthStr));
            }
            
            // 가입일 처리
            if (userData.get("reg_date") != null) {
                String regDateStr = (String) userData.get("reg_date");
                user.setReg_date(LocalDate.parse(regDateStr));
            }
            
            // 이미 존재하는 사용자인지 확인
            if (userRepository.existsById(user.getUserid())) {
                // 기존 사용자 정보 업데이트
                User existingUser = userRepository.findById(user.getUserid()).orElse(null);
                if (existingUser != null) {
                    existingUser.setUsername(user.getUsername());
                    existingUser.setEmail(user.getEmail());
                    existingUser.setPhone(user.getPhone());
                    if (user.getBirth() != null) {
                        existingUser.setBirth(user.getBirth());
                    }
                    return userRepository.save(existingUser);
                }
            }
            // 새 사용자 등록
            return userRepository.save(user);
        } catch (Exception e) {
            System.err.println("사용자 등록 오류: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}
