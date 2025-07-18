package com.example.thescreen.controller;

import com.example.thescreen.entity.Screen;
import com.example.thescreen.repository.ScreenRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class ScreenController {
    @Autowired
    private ScreenRepository screenRepository;

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

    // REST API - 상영관 수정
    @PutMapping("/screens/{screencd}")
    public Screen updateScreen(@PathVariable String screencd, @RequestBody Screen screen) {
        screen.setScreencd(screencd);
        return screenRepository.save(screen);
    }

    // REST API - 상영관 삭제
    @DeleteMapping("/screens/{screencd}")
    public void deleteScreen(@PathVariable String screencd) {
        screenRepository.deleteById(screencd);
    }
}
