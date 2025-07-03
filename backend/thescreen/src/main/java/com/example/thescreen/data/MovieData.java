//package com.example.thescreen.data;
//
//import com.example.thescreen.entity.Movie;
//import com.example.thescreen.repository.MovieRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.List;
//
//@Component
//public class MovieData implements CommandLineRunner {
//
//    @Autowired
//    private MovieRepository movieRepository;
//
//    @Override
//    public void run(String... args) throws Exception {
//        try {
//            // 스프링부트 재실행 시마다 기존 데이터 삭제 후 새로 생성
//            System.out.println("기존 영화 데이터 삭제 중...");
//            movieRepository.deleteAll();
//            System.out.println("기존 영화 데이터 삭제 완료!");
//
//            List<Movie> movies = getMovieData();
//            movieRepository.saveAll(movies);
//
//            System.out.println("영화 가데이터가 성공적으로 생성되었습니다!");
//            System.out.println("총 영화 개수: " + movies.size());
//        } catch (Exception e) {
//            System.err.println("영화 가데이터 생성 중 오류 발생: " + e.getMessage());
//            e.printStackTrace();
//        }
//    }
//
//    public List<Movie> getMovieData() {
//        List<Movie> movies = new ArrayList<>();
//        LocalDate currentDate = LocalDate.now();
//
//        // 개봉작 10개 (현재 날짜 이전)
//        movies.add(createMovie("MV001", "인셉션",
//            "꿈과 현실의 경계를 넘나드는 미션을 수행하는 도둑들의 이야기",
//            "SF/액션", "크리스토퍼 놀란", "레오나르도 디카프리오, 조셉 고든 레빗",
//            148, currentDate.minusDays(30), "/images/movie.jpg", null, Movie.IsAdult.N));
//
//        movies.add(createMovie("MV002", "어벤져스: 엔드게임",
//            "타노스의 스냅 이후 절반으로 사라진 우주를 되돌리기 위한 최후의 전투",
//            "액션/어드벤처", "루소 형제", "로버트 다우니 주니어, 크리스 에반스",
//            181, currentDate.minusDays(25), "/images/Dragon.png", null, Movie.IsAdult.N));
//
//        movies.add(createMovie("MV003", "기생충",
//            "반지하 집에 사는 기택네 가족과 대저택에 사는 박사장네 가족의 만남",
//            "드라마/스릴러", "봉준호", "송강호, 이선균, 조여정",
//            132, currentDate.minusDays(20), "/images/Elio.png", null, Movie.IsAdult.N));
//
//        movies.add(createMovie("MV004", "스파이더맨: 노 웨이 홈",
//            "멀티버스가 열리면서 다른 차원의 스파이더맨들과 만나는 피터 파커",
//            "액션/어드벤처", "존 왓츠", "톰 홀랜드, 젠데이아 콜먼",
//            148, currentDate.minusDays(15), "/images/Ellio.png", null, Movie.IsAdult.N));
//
//        movies.add(createMovie("MV005", "듄",
//            "사막 행성 아라키스에서 펼쳐지는 우주 판타지 서사시",
//            "SF/어드벤처", "드니 빌뇌브", "티모시 샬라메, 젠다야",
//            155, currentDate.minusDays(10), "/images/F1_TheMovie.png", null, Movie.IsAdult.N));
//
//        movies.add(createMovie("MV006", "007 노 타임 투 다이",
//            "제임스 본드의 마지막 미션과 새로운 위협에 맞서는 이야기",
//            "액션/스릴러", "캐리 조지 후쿠나가", "다니엘 크레이그, 레아 세이두",
//            163, currentDate.minusDays(8), "/images/Fureru.png", null, Movie.IsAdult.N));
//
//        movies.add(createMovie("MV007", "이터널스",
//            "7000년간 지구를 지켜온 불멸의 영웅들의 이야기",
//            "액션/어드벤처", "클로이 자오", "젬마 찬, 리차드 매든",
//            156, currentDate.minusDays(5), "/images/Hifive.png", null, Movie.IsAdult.N));
//
//        movies.add(createMovie("MV008", "베놈 2",
//            "에디 브록과 베놈이 새로운 위협에 맞서는 이야기",
//            "액션/스릴러", "앤디 서키스", "톰 하디, 우디 해럴슨",
//            97, currentDate.minusDays(3), "/images/Nausicaa.png", null, Movie.IsAdult.N));
//
//        movies.add(createMovie("MV009", "킹스맨: 퍼스트 에이전트",
//            "킹스맨의 기원과 제1차 세계대전 시기의 스파이 이야기",
//            "액션/어드벤처", "매튜 본", "랄프 파인즈, 해리스 디킨슨",
//            131, currentDate.minusDays(1), "/images/Noise.png", null, Movie.IsAdult.N));
//
//        movies.add(createMovie("MV010", "스페이스 잼: 새로운 시대",
//            "루니 툰과 NBA 스타들이 우주에서 농구 경기를 펼치는 이야기",
//            "애니메이션/어드벤처", "맬콤 D. 리", "레브론 제임스, 도나 체리",
//            115, currentDate.minusDays(1), "/images/Seventeen.png", null, Movie.IsAdult.N));
//
//        // 개봉예정작 10개 (현재 날짜 이후)
//        movies.add(createMovie("MV011", "배트맨",
//            "고담시의 어둠 속에서 정의를 실현하는 브루스 웨인의 이야기",
//            "액션/스릴러", "맷 리브스", "로버트 패틴슨, 조 크로닌",
//            176, currentDate.plusDays(5), "/images/Tiger.png", null, Movie.IsAdult.N));
//
//        movies.add(createMovie("MV012", "닥터 스트레인지: 멀티버스 오브 매드니스",
//            "멀티버스를 탐험하며 새로운 차원의 위협에 맞서는 닥터 스트레인지",
//            "액션/판타지", "샘 레이미", "베네딕트 컴버배치, 엘리자베스 올슨",
//            126, currentDate.plusDays(10), "/images/28Years.png", null, Movie.IsAdult.N));
//
//        movies.add(createMovie("MV013", "토르: 러브 앤 썬더",
//            "토르가 새로운 모험을 떠나면서 사랑과 번개를 찾는 이야기",
//            "액션/어드벤처", "타이카 와이티티", "크리스 헴스워스, 나탈리 포트만",
//            119, currentDate.plusDays(15), "/images/cinemascreen1.jpg", null, Movie.IsAdult.N));
//
//        movies.add(createMovie("MV014", "블랙 팬서: 와칸다 포에버",
//            "와칸다의 새로운 블랙 팬서를 찾는 과정에서 펼쳐지는 이야기",
//            "액션/어드벤처", "라이언 쿠글러", "레티샤 라이트, 루피타 뇽오",
//            161, currentDate.plusDays(20), "/images/cinemascreen2.jpg", null, Movie.IsAdult.N));
//
//        movies.add(createMovie("MV015", "아바타 2",
//            "판도라 행성의 새로운 모험과 네이비족의 이야기",
//            "SF/어드벤처", "제임스 카메론", "샘 워싱턴, 조 샐다나",
//            192, currentDate.plusDays(25), "/images/cinemascreen3.jpg", null, Movie.IsAdult.N));
//
//        movies.add(createMovie("MV016", "미션 임파서블 7",
//            "이선 헌트가 새로운 미션을 수행하며 위험에 맞서는 이야기",
//            "액션/스릴러", "크리스토퍼 맥쿼리", "톰 크루즈, 레베카 퍼거슨",
//            147, currentDate.plusDays(30), "/images/cloud.jpg", null, Movie.IsAdult.N));
//
//        movies.add(createMovie("MV017", "인디아나 존스 5",
//            "인디아나 존스의 마지막 모험과 새로운 고고학적 발견",
//            "액션/어드벤처", "제임스 맨골드", "해리슨 포드, 피비 월러브리지",
//            142, currentDate.plusDays(35), "/images/tank.jpg", null, Movie.IsAdult.N));
//
//        movies.add(createMovie("MV018", "플래시",
//            "배리 앨런이 과거를 바꾸려다 멀티버스의 혼돈을 불러오는 이야기",
//            "액션/어드벤처", "앤디 머스키에티", "에즈라 밀러, 마이클 키튼",
//            144, currentDate.plusDays(40), "/images/movie.jpg", null, Movie.IsAdult.N));
//
//        movies.add(createMovie("MV019", "블루 비틀",
//            "멕시코계 미국인 청년이 외계 기술을 얻게 되면서 영웅이 되는 이야기",
//            "액션/어드벤처", "엔젤 마누엘 소토", "조지 로페즈, 브루스 캔",
//            127, currentDate.plusDays(45), "/images/Dragon.png", null, Movie.IsAdult.N));
//
//        movies.add(createMovie("MV020", "아쿠아맨과 로스트 킹덤",
//            "아쿠아맨이 잃어버린 왕국을 찾아 새로운 모험을 떠나는 이야기",
//            "액션/어드벤처", "제임스 완", "제이슨 모모아, 앰버 허드",
//            124, currentDate.plusDays(50), "/images/Elio.png", null, Movie.IsAdult.N));
//
//        return movies;
//    }
//
//    private Movie createMovie(String moviecd, String movienm, String description,
//                             String genre, String director, String actors,
//                             Integer runningtime, LocalDate releasedate,
//                             String posterUrl, String runningscreen, Movie.IsAdult isadult) {
//        Movie movie = new Movie();
//        movie.setMoviecd(moviecd);
//        movie.setMovienm(movienm);
//        movie.setDescription(description);
//        movie.setGenre(genre);
//        movie.setDirector(director);
//        movie.setActors(actors);
//        movie.setRunningtime(runningtime);
//        movie.setReleasedate(releasedate);
//        movie.setPosterUrl(posterUrl);
//        movie.setRunningscreen(runningscreen);
//        movie.setIsadult(isadult);
//        return movie;
//    }
//}