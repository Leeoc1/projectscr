package com.example.thescreen.repository;

import com.example.thescreen.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, String> { // Movie 엔티티 리포지토리

}