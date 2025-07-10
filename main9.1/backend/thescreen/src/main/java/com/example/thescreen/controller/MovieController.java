package com.example.thescreen.controller;

import com.example.thescreen.entity.Movie;
import com.example.thescreen.repository.MovieRepository;
import com.example.thescreen.service.MovieService;
import lombok.RequiredArgsConstructor;
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
     * ✅ 4) 오늘 기준 앞 2개월 ~ 뒤 2개월 기간 영화 데이터 저장
     */
    @GetMapping("/save")
    public String saveMoviesByPeriod() {
        movieService.fetchAndSaveMovies();
        return "✅ 기간별 영화 데이터 저장 완료!";

    }

    /**
     * ✅ 5) KMDB 데이터 enrich
     */
    @GetMapping("/enrich")
    public String enrichMovies() {
        movieService.enrichMoviesWithKmdb();
        return "✅ KMDB 상세 데이터 덮어쓰기 완료!";
    }
}


