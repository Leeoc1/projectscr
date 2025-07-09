package com.example.thescreen.controller;

import com.example.thescreen.entity.Movie;
import com.example.thescreen.service.MovieService;
import com.example.thescreen.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
public class MovieController {

    private final MovieRepository movieRepository;
    private final MovieService movieService;

    /**
     * ✅ 1) 모든 영화 조회
     */
    @GetMapping
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    /**
     * ✅ 2) 현재 상영작 조회
     */
    @GetMapping("/current")
    public List<Movie> getCurrentMovies() {
        LocalDate today = LocalDate.now();
        return movieRepository.findAll().stream()
                .filter(movie -> movie.getReleasedate() != null && !movie.getReleasedate().isAfter(today))
                .collect(Collectors.toList());
    }

    /**
     * ✅ 3) 상영 예정작 조회
     */
    @GetMapping("/upcoming")
    public List<Movie> getUpcomingMovies() {
        LocalDate today = LocalDate.now();
        return movieRepository.findAll().stream()
                .filter(movie -> movie.getReleasedate() != null && movie.getReleasedate().isAfter(today))
                .collect(Collectors.toList());
    }

    /**
     * ✅ 4) KMDB API 수동 갱신
     */
    @GetMapping("/refresh")
    public ResponseEntity<String> refreshMovies() {
        try {
            movieService.fetchAndSaveMovie();
            return ResponseEntity.ok("✅ 영화 데이터 갱신 완료!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("🚨 영화 데이터 갱신 실패: " + e.getMessage());
        }
    }
}
