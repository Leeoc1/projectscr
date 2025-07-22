package com.example.thescreen.repository;

import com.example.thescreen.entity.Movie;
import com.example.thescreen.entity.MovieSchedule;
import com.example.thescreen.entity.MovieView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MovieScheduleRepository extends JpaRepository<MovieSchedule, String> {

    // 상영 중이면서 현재 상영작인 영화들
    @Query("SELECT m FROM MovieSchedule m WHERE m.movieinfo = 'Y' AND m.releasedate <= :today")
    List<MovieSchedule> findCurrentScreeningMovies(LocalDate today);

    // 상영 중이면서 상영 예정작인 영화들
    @Query("SELECT m FROM MovieSchedule m WHERE m.movieinfo = 'Y' AND m.releasedate > :today")
    List<MovieSchedule> findUpcomingScreeningMovies(LocalDate today);

    // 상위 10위
    @Query("SELECT m FROM MovieSchedule m WHERE m.movierank IS NOT NULL ORDER BY CAST(m.movierank AS int) ASC")
    List<MovieSchedule> findMoviesWithRank();
}
