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

<<<<<<< HEAD
        // 영화 데이터 배열 (포스터 URL 포함)
        String[][] movieData = {
            // 현재 상영작 (2024년 이전 개봉)
            {"M001", "드래곤 길들이기", "드래곤과 인간의 우정을 그린 판타지 애니메이션", "애니메이션", "딘 데블로이스", "제이 바루첼, 아메리카 페레라", "98", "2010-03-26", "/images/Dragon.png", "N"},
            {"M002", "인터스텔라", "우주를 배경으로 한 SF 드라마", "SF", "크리스토퍼 놀란", "매튜 맥커너히, 앤 해서웨이", "169", "2014-11-06", "/images/cloud.jpg", "N"},
            {"M003", "어벤져스: 엔드게임", "마블 시리즈의 대단원", "액션", "루소 형제", "로버트 다우니 주니어, 크리스 에반스", "181", "2019-04-24", "/images/Hifive.png", "N"},
            {"M004", "기생충", "한국 영화의 새로운 전설", "드라마", "봉준호", "송강호, 이선균", "132", "2019-05-30", "/images/Tiger.png", "N"},
            {"M005", "조커", "DC 코믹스의 악역을 다룬 심리 드라마", "드라마", "토드 필립스", "호아킨 피닉스", "122", "2019-10-02", "/images/Noise.png", "Y"},
            {"M006", "나우시카", "미야자키 하야오의 걸작 애니메이션", "애니메이션", "미야자키 하야오", "성우: 나가시마 유키", "116", "1984-03-11", "/images/Nausicaa.png", "N"},
            {"M007", "엘리오", "픽사 애니메이션", "애니메이션", "에이드리언 몰리나", "성우: 유니스 에이", "102", "2024-03-01", "/images/Elio.png", "N"},
            {"M008", "F1 더 무비", "F1 레이싱을 다룬 액션 영화", "액션", "조셉 코신스키", "브래드 피트, 루이스 해밀턴", "138", "2024-07-05", "/images/F1_TheMovie.png", "N"},
            {"M009", "28년 후", "좀비 아포칼립스 영화", "스릴러", "대니 보일", "킬리언 머피, 나오미 해리스", "145", "2024-06-28", "/images/28Years.png", "Y"},
            {"M010", "퓨러루", "일본 애니메이션", "애니메이션", "신보 마코토", "성우: 카미야 히로시", "108", "2024-04-12", "/images/Fureru.png", "N"},
            
            // 상영예정작 (2026년 이후 개봉)
            {"M011", "아바타 3", "제임스 카메론의 SF 시리즈 3편", "SF", "제임스 카메론", "샘 워싱턴, 조 샐다나", "180", "2026-12-18", "/images/28Years.png", "N"},
            {"M012", "스파이더맨: 비욘드 더 유니버스", "애니메이션 스파이더맨 시리즈", "애니메이션", "호아킴 도스 산토스", "샤메익 무어, 헤일리 스타인펠드", "120", "2026-03-29", "/images/Elio.png", "N"},
            {"M013", "토이스토리 5", "픽사의 클래식 애니메이션 시리즈", "애니메이션", "앤드류 스탠턴", "톰 행크스, 팀 앨런", "95", "2026-06-19", "/images/Dragon.png", "N"},
            {"M014", "블랙 팬서: 와칸다 포에버", "마블 시리즈의 새로운 챕터", "액션", "라이언 쿠글러", "레티샤 라이트, 댄게라", "150", "2026-07-24", "/images/Hifive.png", "N"},
            {"M015", "인디아나 존스 6", "해리슨 포드의 마지막 인디아나 존스", "어드벤처", "제임스 맨골드", "해리슨 포드, 피비 월러브리지", "140", "2026-06-30", "/images/Tiger.png", "N"},
            {"M016", "미션 임파서블 8", "톰 크루즈의 액션 시리즈", "액션", "크리스토퍼 맥쿼리", "톰 크루즈, 레베카 퍼거슨", "155", "2026-06-28", "/images/Noise.png", "N"},
            {"M017", "쥬라기 월드: 새로운 시대", "공룡 시리즈의 새로운 시작", "액션", "가레스 에드워즈", "스카를렛 요한슨, 조나단 베일리", "135", "2026-07-02", "/images/F1_TheMovie.png", "N"},
            {"M018", "데드풀 3", "마블의 액션 코미디 시리즈", "액션", "숀 레비", "라이언 레이놀즈, 휴 잭맨", "130", "2026-09-06", "/images/cloud.jpg", "Y"},
            {"M019", "스타워즈: 새로운 제다이", "스타워즈 시리즈의 새로운 챕터", "SF", "샤민 오바이드-친노이", "데이지 리들리, 아담 드라이버", "145", "2026-12-17", "/images/Nausicaa.png", "N"},
            {"M020", "트랜스포머: 새로운 시작", "트랜스포머 시리즈의 리부트", "액션", "스티븐 카프리", "앤서니 라모스, 도미닉 피셔", "140", "2026-06-27", "/images/Fureru.png", "N"}
=======
        // 영화 데이터 배열
        String[][] movieData = {
            {"M001", "드래곤 길들이기", "드래곤과 인간의 우정을 그린 판타지 애니메이션", "애니메이션", "딘 데블로이스", "제이 바루첼, 아메리카 페레라", "98", "2010-03-26", "N"},
            {"M002", "인터스텔라", "우주를 배경으로 한 SF 드라마", "SF", "크리스토퍼 놀란", "매튜 맥커너히, 앤 해서웨이", "169", "2014-11-06", "N"},
            {"M003", "어벤져스: 엔드게임", "마블 시리즈의 대단원", "액션", "루소 형제", "로버트 다우니 주니어, 크리스 에반스", "181", "2019-04-24", "N"},
            {"M004", "기생충", "한국 영화의 새로운 전설", "드라마", "봉준호", "송강호, 이선균", "132", "2019-05-30", "N"},
            {"M005", "조커", "DC 코믹스의 악역을 다룬 심리 드라마", "드라마", "토드 필립스", "호아킨 피닉스", "122", "2019-10-02", "Y"}
>>>>>>> ee44428e6f70464f49fbb3cad2d41128779cd105
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
<<<<<<< HEAD
            String posterUrl = data[8];
            Movie.IsAdult isadult = Movie.IsAdult.valueOf(data[9]);
=======
            Movie.IsAdult isadult = Movie.IsAdult.valueOf(data[8]);
>>>>>>> ee44428e6f70464f49fbb3cad2d41128779cd105

            Movie movie = new Movie();
            movie.setMoviecd(moviecd);
            movie.setMovienm(movienm);
            movie.setDescription(description);
            movie.setGenre(genre);
            movie.setDirector(director);
            movie.setActors(actors);
            movie.setRunningtime(runningtime);
            movie.setReleasedate(releasedate);
<<<<<<< HEAD
            movie.setPosterUrl(posterUrl);
            movie.setIsadult(isadult);

            movieRepository.save(movie);
            System.out.println("영화 추가: " + movie.getMovienm() + " (포스터: " + posterUrl + ")");
=======
            movie.setIsadult(isadult);

            movieRepository.save(movie);
            System.out.println("영화 추가: " + movie.getMovienm());
>>>>>>> ee44428e6f70464f49fbb3cad2d41128779cd105
        }

        System.out.println("영화 데이터 생성 완료!");
    }
} 