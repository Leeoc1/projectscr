package com.example.thescreen.controller;

import com.example.thescreen.entity.MovieRank;
import com.example.thescreen.service.MovieRankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MovieRankController {
    @Autowired
    private MovieRankService movieRankService;

    @GetMapping("/movie/rank")
    public List<MovieRank> getMovieRank () {
        movieRankService.fetchAndSaveMovieRank();
        return movieRankService.getMovieRank();
    }
}
