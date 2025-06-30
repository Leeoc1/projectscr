package com.example.thescreen.data;

import com.example.thescreen.entity.Movie;
import com.example.thescreen.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.time.LocalDate;

@Component
public class MovieData {

    @Autowired
    private MovieRepository movieRepository;

    @PostConstruct
    public void seed() {
        System.out.println("영화 데이터 생성 시작...");

        // 영화 데이터 배열
        String[][] movieData = {
            {"M001", "드래곤 길들이기", "드래곤과 인간의 우정을 그린 판타지 애니메이션", "애니메이션", "딘 데블로이스", "제이 바루첼, 아메리카 페레라", "98", "2010-03-26", "N"},
            {"M002", "인터스텔라", "우주를 배경으로 한 SF 드라마", "SF", "크리스토퍼 놀란", "매튜 맥커너히, 앤 해서웨이", "169", "2014-11-06", "N"},
            {"M003", "어벤져스: 엔드게임", "마블 시리즈의 대단원", "액션", "루소 형제", "로버트 다우니 주니어, 크리스 에반스", "181", "2019-04-24", "N"},
            {"M004", "기생충", "한국 영화의 새로운 전설", "드라마", "봉준호", "송강호, 이선균", "132", "2019-05-30", "N"},
            {"M005", "조커", "DC 코믹스의 악역을 다룬 심리 드라마", "드라마", "토드 필립스", "호아킨 피닉스", "122", "2019-10-02", "Y"}
        };

        for (String[] data : movieData) {
            String moviecd = data[0];
            String movienm = data[1];
            String description = data[2];
            String genre = data[3];
            String director = data[4];
            String actors = data[5];
            Integer runningtime = Integer.parseInt(data[6]);
            LocalDate releasedate = LocalDate.parse(data[7]);
            Movie.IsAdult isadult = Movie.IsAdult.valueOf(data[8]);

            Movie movie = new Movie();
            movie.setMoviecd(moviecd);
            movie.setMovienm(movienm);
            movie.setDescription(description);
            movie.setGenre(genre);
            movie.setDirector(director);
            movie.setActors(actors);
            movie.setRunningtime(runningtime);
            movie.setReleasedate(releasedate);
            movie.setIsadult(isadult);

            movieRepository.save(movie);
            System.out.println("영화 추가: " + movie.getMovienm());
        }

        System.out.println("영화 데이터 생성 완료!");
    }
} 