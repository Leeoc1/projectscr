package com.example.thescreen.repository;

import com.example.thescreen.entity.MovieSchedule;
import com.example.thescreen.entity.MovieView;
import com.example.thescreen.entity.MovieWithSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface MovieWIthScheduleRepository extends JpaRepository<MovieWithSchedule, String> {

    // TOP 10 박스오피스 영화 (movierank가 있는 영화만)
    @Query(value = "SELECT * FROM moviewithschedule WHERE movierank IS NOT NULL ORDER BY CAST(movierank AS INTEGER) ASC LIMIT 10", nativeQuery = true)
    List<MovieWithSchedule> findTop10MoviesWithRank();

    // 스케줄이 있는 모든 영화 조회 (movierank 유무와 상관없이)
    @Query("SELECT m FROM MovieWithSchedule m")
    List<MovieWithSchedule> findAllMoviesWithSchedule();

    // 상영 중이면서 현재 상영작인 영화들
    @Query("SELECT m FROM MovieWithSchedule m WHERE m.movieinfo = 'Y' AND m.releasedate <= :today")
    List<MovieWithSchedule> findCurrentScreeningMovies(LocalDate today);

    // 상영 중이면서 상영 예정작인 영화들
    @Query("SELECT m FROM MovieWithSchedule m WHERE m.movieinfo = 'E' AND m.releasedate > :today")
    List<MovieWithSchedule> findUpcomingScreeningMovies(LocalDate today);
}
