package com.example.thescreen.repository;

import com.example.thescreen.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, String> {

    // moviecd, movienm 추출
    List<MovieCdNmList> findAllBy();

    // 상영 중인 영화만 조회
    List<Movie> findByMovieinfo(String movieinfo);
    
    // 상영 중이면서 현재 상영작인 영화들
    @Query("SELECT m FROM Movie m WHERE m.movieinfo = 'Y' AND m.releasedate <= :today")
    List<Movie> findCurrentScreeningMovies(LocalDate today);
    
    // 상영 중이면서 상영 예정작인 영화들
    @Query("SELECT m FROM Movie m WHERE m.movieinfo = 'Y' AND m.releasedate > :today")
    List<Movie> findUpcomingScreeningMovies(LocalDate today);

    // moviecd, movienm 추출 프로젝션
    interface MovieCdNmList {
        String getMoviecd();

        String getMovienm();
    }
}