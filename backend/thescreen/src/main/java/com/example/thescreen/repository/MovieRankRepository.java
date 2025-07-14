package com.example.thescreen.repository;

import com.example.thescreen.entity.MovieRank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRankRepository extends JpaRepository<MovieRank, String> {
}
