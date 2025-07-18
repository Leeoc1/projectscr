package com.example.thescreen.controller;

import com.example.thescreen.entity.ReservationView;
import com.example.thescreen.entity.User;
import com.example.thescreen.repository.UserRepository;
import com.example.thescreen.repository.ReservationViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    private ReservationViewRepository reservationViewRepository;

    @GetMapping("/list")
    public List<User> getUsersApi() {
        return userRepository.findAll();
    }

    // 사용자별 예약 정보 조회 API 추가
    @GetMapping("/{userid}/reservations")
    public ResponseEntity<?> getUserReservations(@PathVariable String userid) {
        try {
            List<ReservationView> reservations = reservationViewRepository.findByUseridOrderByReservationtimeDesc(userid);
            return ResponseEntity.ok(reservations);
        } catch (Exception e) {
            System.err.println("사용자 예약 정보 조회 오류: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "서버 오류가 발생했습니다."));
        }
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

    @GetMapping("/info/{userid}")
    public ResponseEntity<User> getUserInfo(@PathVariable String userid) {
        try {
            User user = userRepository.findById(userid).orElse(null);
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("사용자 정보 조회 오류: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/idcheck")
    public ResponseEntity<Map<String, Boolean>> checkUserIdAvailability(@RequestBody Map<String, String> request) {
        try {
            String userid = request.get("userid");
            boolean exists = userRepository.existsById(userid);
            Map<String, Boolean> response = Map.of("available", !exists);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("아이디 중복 확인 오류: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
