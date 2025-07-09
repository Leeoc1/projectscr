package com.example.thescreen.controller;

import com.example.thescreen.entity.Movie;
import com.example.thescreen.repository.MovieRepository;
import com.example.thescreen.repository.MovieRepository.MovieCdNmList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = {"http://localhost:3000"})
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    // 전체 영화 목록 조회
    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    // 현재상영작 조회
    @GetMapping("/current")
    public List<Movie> getCurrentMovies() {
        List<Movie> allMovies = movieRepository.findAll();
        LocalDate today = LocalDate.now();
        List<Movie> currentMovies = allMovies.stream()
                .filter(m -> m.getReleasedate() != null && !m.getReleasedate().isAfter(today))
                .collect(Collectors.toList());
        System.out.println("현재상영작 수: " + currentMovies.size());
        return currentMovies;
    }

    // 상영예정작 조회
    @GetMapping("/upcoming")
    public List<Movie> getUpcomingMovies() {
        List<Movie> allMovies = movieRepository.findAll();
        LocalDate today = LocalDate.now();
        List<Movie> upcomingMovies = allMovies.stream()
                .filter(m -> m.getReleasedate() != null && m.getReleasedate().isAfter(today))
                .collect(Collectors.toList());
        System.out.println("상영예정작 수: " + upcomingMovies.size());
        return upcomingMovies;
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


    // 예매: 극장 -> 영화
    // 예매할 때 선택가능한 영화 라인업들, 제목만 반환
    @GetMapping("/list")
    public List<MovieCdNmList> getMovieTitleList() {
        List<MovieCdNmList> movieList = movieRepository.findAllBy();

        return movieList;
    }
} 