package com.example.thescreen.repository;

import com.example.thescreen.entity.MovieView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieViewRepository extends JpaRepository<MovieView, String> {

    @Query("SELECT m FROM MovieView m WHERE m.movierank IS NOT NULL ORDER BY CAST(m.movierank AS int) ASC")
    List<MovieView> findMoviesWithRank();
}