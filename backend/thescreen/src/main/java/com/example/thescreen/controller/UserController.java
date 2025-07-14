package com.example.thescreen.controller;

import com.example.thescreen.entity.User;
import com.example.thescreen.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;


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


    // 아이디 중복 체크
    @PostMapping("/idcheck")
    public ResponseEntity<Boolean> isAvailableUserId(@RequestBody Map<String, String> request) {
        String userid = request.get("userid");
        Optional<User> result = userRepository.findById(userid);

        // 아이디가 없으면 true (사용 가능), 있으면 false (사용 불가)
        return ResponseEntity.ok(!result.isPresent());
    }

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<Boolean> registerUser(@RequestBody User user) {
        try {
            // 아이디 중복은 따로 하기 때문에 따로 검사 안함

            // 기본 활성
            user.setStatus("활성");
            // 가입일시는 회원가입 버튼 누른날 yyyy-mm-dd형식
            user.setReg_date(LocalDate.now());

            userRepository.save(user);
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
