package com.example.thescreen.controller;

import com.example.thescreen.entity.Movie;
import com.example.thescreen.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    // 사용자 페이지: 현재상영작/상영예정작 반환
    @GetMapping("/user")
    public MoviesResponse getMoviesForUser() {
        List<Movie> allMovies = movieRepository.findAll();
        LocalDate today = LocalDate.now();
        List<Movie> currentMovies = allMovies.stream()
                .filter(m -> m.getReleasedate() != null && !m.getReleasedate().isAfter(today))
                .collect(Collectors.toList());
        List<Movie> upcomingMovies = allMovies.stream()
                .filter(m -> m.getReleasedate() != null && m.getReleasedate().isAfter(today))
                .collect(Collectors.toList());
        return new MoviesResponse(currentMovies, upcomingMovies);
    }

    // 관리자 페이지: 현재상영작/상영예정작만 반환
    @GetMapping("/admin")
    public MoviesResponse getMoviesForAdmin() {
        List<Movie> allMovies = movieRepository.findAll();
        LocalDate today = LocalDate.now();
        List<Movie> currentMovies = allMovies.stream()
                .filter(m -> m.getReleasedate() != null && !m.getReleasedate().isAfter(today))
                .collect(Collectors.toList());
        List<Movie> upcomingMovies = allMovies.stream()
                .filter(m -> m.getReleasedate() != null && m.getReleasedate().isAfter(today))
                .collect(Collectors.toList());
        return new MoviesResponse(currentMovies, upcomingMovies);
    }

    public static class MoviesResponse {
        private List<Movie> currentMovies;
        private List<Movie> upcomingMovies;

        public MoviesResponse(List<Movie> currentMovies, List<Movie> upcomingMovies) {
            this.currentMovies = currentMovies;
            this.upcomingMovies = upcomingMovies;
        }
        public List<Movie> getCurrentMovies() { return currentMovies; }
        public List<Movie> getUpcomingMovies() { return upcomingMovies; }
    }
} 