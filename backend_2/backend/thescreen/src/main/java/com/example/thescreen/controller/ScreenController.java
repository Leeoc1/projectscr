package com.example.thescreen.controller;

import com.example.thescreen.entity.Screen;
import com.example.thescreen.repository.ScreenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class ScreenController {
    @Autowired
    private ScreenRepository screenRepository;

    // 웹 페이지용
    @GetMapping("/screens")
    public String getScreen(Model model) {
        List<Screen> screens = screenRepository.findAll();
        model.addAttribute("screens", screens);
        return "screens-list";
    }

    // REST API - 전체 상영관 조회
    @GetMapping("/api/screens")
    public List<Screen> getAllScreens() {
        return screenRepository.findAll();
    }

    // REST API - 특정 상영관 조회
    @GetMapping("/api/screens/{screencd}")
    public Screen getScreen(@PathVariable String screencd) {
        return screenRepository.findById(screencd).orElse(null);
    }

    // REST API - 지점별 상영관 조회
    @GetMapping("/api/screens/cinema/{cinemacd}")
    public List<Screen> getScreensByCinema(@PathVariable String cinemacd) {
        return screenRepository.findByCinemacd(cinemacd);
    }

    // REST API - 상영관 등록
    @PostMapping("/api/screens")
    public Screen createScreen(@RequestBody Screen screen) {
        return screenRepository.save(screen);
    }

    // REST API - 상영관 수정
    @PutMapping("/api/screens/{screencd}")
    public Screen updateScreen(@PathVariable String screencd, @RequestBody Screen screen) {
        screen.setScreencd(screencd);
        return screenRepository.save(screen);
    }

    // REST API - 상영관 삭제
    @DeleteMapping("/api/screens/{screencd}")
    public void deleteScreen(@PathVariable String screencd) {
        screenRepository.deleteById(screencd);
    }
}
