package com.example.thescreen.controller;

import com.example.thescreen.domain.LoginResult;
import com.example.thescreen.entity.User;
import com.example.thescreen.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class LoginController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        LoginResult result = userService.login(user.getUserid(), user.getUserpw());

        switch (result) {
            case SUCCESS:
                return ResponseEntity.ok("로그인 성공");
            case INVALID_PASSWORD:
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("비밀번호가 일치하지 않습니다.");
            case NOT_FOUND:
            default:
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("아이디가 존재하지 않습니다.");
        }
    }
}