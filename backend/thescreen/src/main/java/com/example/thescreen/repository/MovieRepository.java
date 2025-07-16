package com.example.thescreen.repository;

import com.example.thescreen.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, String> {

    boolean existsByMovienmAndReleasedate(String movienm, LocalDate releasedate);
    Movie findByMovienmAndReleasedate(String movienm, LocalDate releasedate);

    // moviecd, movienm 추출
    List<MovieCdNmList> findAllBy();

    // moviecd, movienm 추출 프로젝션
    interface MovieCdNmList {
        String getMoviecd();

        String getMovienm();
    }
}