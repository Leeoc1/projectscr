package com.example.thescreen.repository;

import com.example.thescreen.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, String> {
    /**
     * ✅ 현재 저장된 moviecd 중 가장 큰 값 가져오기
     * 예) MOV001, MOV002, MOV003 → MAX 값 = MOV003
     */
    @Query("SELECT MAX(m.moviecd) FROM Movie m")
    Optional<String> findMaxMovieCd();
}