package com.example.thescreen.controller;

import com.example.thescreen.entity.Screen;
import com.example.thescreen.entity.ScreenView;
import com.example.thescreen.repository.ScreenRepository;
import com.example.thescreen.repository.ScreenViewRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class ScreenController {
    @Autowired
    private ScreenRepository screenRepository;
    @Autowired
    private ScreenViewRepository screenViewRepository;

    // REST API - 전체 상영관 조회
    @GetMapping("/screens")
    public List<Screen> getAllScreens() {
        return screenRepository.findAll();
    }

    // REST API - 특정 상영관 조회
    @GetMapping("/screens/{screencd}")
    public Screen getScreen(@PathVariable String screencd) {
        return screenRepository.findById(screencd).orElse(null);
    }

    // REST API - 지점별 상영관 조회
    @GetMapping("/screens/cinema/{cinemacd}")
    public List<Screen> getScreensByCinema(@PathVariable String cinemacd) {
        return screenRepository.findByCinemacd(cinemacd);
    }

    // REST API - 상영관 등록
    @PostMapping("/screens")
    public Screen createScreen(@RequestBody Screen screen) {
        return screenRepository.save(screen);
    }

//    // REST API - 상영관 수정
//    @PutMapping("/screens/{screencd}")
//    public Screen updateScreen(@PathVariable String screencd, @RequestBody Screen screen) {
//        screen.setScreencd(screencd);
//        return screenRepository.save(screen);
//    }

    // REST API - 상영관 삭제
    @DeleteMapping("/screens/{screencd}")
    public void deleteScreen(@PathVariable String screencd) {
        screenRepository.deleteById(screencd);
    }


    // screen view 조회
    // adminpage 상영관 관리에 사용
    @GetMapping("/screens/view")
    public ResponseEntity<List<ScreenView>> getAllScreenViews() {
        List<ScreenView> screenViews = screenViewRepository.findAll();

        return new ResponseEntity<>(screenViews, HttpStatus.OK);
    }

    // 상영관 상태 바꾸기
    @PutMapping("/screens/statusupdate")
    public ResponseEntity<Boolean> updateScreenStatus(@RequestBody Map<String, String> request) {
        try {
            String screencd = request.get("screencd");
            String screenstatus = request.get("screenstatus");

            if (screencd == null || screenstatus == null) {
                return ResponseEntity.badRequest().body(false);
            }

            Optional<Screen> screenOpt = screenRepository.findById(screencd);

            if (screenOpt.isPresent()) {
                Screen screen = screenOpt.get();
                screen.setScreenstatus(screenstatus);
                screenRepository.save(screen);

                return ResponseEntity.ok(true);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }

    }
}
