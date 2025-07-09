package com.example.thescreen.repository;

import com.example.thescreen.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, String> {

    // moviecd, movienm 추출
    List<MovieCdNmList> findAllBy();

    //movienm과 releasedate로 영화 조회(중복 체크용)
    Optional<Movie> findByMovienmAndReleasedate(String movienm, LocalDate releasedate);

    //최대 moviecd 조회
    @Query("SELECT MAX(m.moviecd) FROM Movie m")
    Optional<String> findMaxMovieCd();
    // moviecd, movienm 추출 프로젝션
    interface MovieCdNmList {
        String getMoviecd();
        String getMovienm();
    }
}