package com.example.thescreen.data;

import com.example.thescreen.entity.Movie;
import com.example.thescreen.entity.Schedule;
import com.example.thescreen.entity.Screen;
import com.example.thescreen.repository.MovieRepository;
import com.example.thescreen.repository.ScheduleRepository;
import com.example.thescreen.repository.ScreenRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Component
public class ScheduleData {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ScreenRepository screenRepository;

    @PostConstruct
    public void seed() {
        System.out.println("상영 스케줄 데이터 생성 시작...");

        // 영화와 상영관 데이터 조회
        List<Movie> movies = movieRepository.findAll();
        List<Screen> screens = screenRepository.findAll();

        if (movies.isEmpty() || screens.isEmpty()) {
            System.out.println("영화 또는 상영관 데이터가 없어 스케줄 생성을 중단합니다.");
            return;
        }

        Random random = new Random();
        String[][] scheduleData = new String[15][3];

        // 15개의 스케줄 데이터 생성
        scheduleData[0] = new String[]{"SCH001", "M001", "SCR001"}; // 드래곤 길들이기, 2D 1관
        scheduleData[1] = new String[]{"SCH002", "M002", "SCR002"}; // 인터스텔라, 3D 2관
        scheduleData[2] = new String[]{"SCH003", "M003", "SCR003"}; // 어벤져스, IMAX 1관
        scheduleData[3] = new String[]{"SCH004", "M004", "SCR004"}; // 기생충, 4DX 1관
        scheduleData[4] = new String[]{"SCH005", "M005", "SCR005"}; // 조커, 2D 3관
        scheduleData[5] = new String[]{"SCH006", "M007", "SCR006"}; // 엘리오, 3D 1관
        scheduleData[6] = new String[]{"SCH007", "M008", "SCR007"}; // F1 더 무비, 2D 2관
        scheduleData[7] = new String[]{"SCH008", "M009", "SCR008"}; // 28년 후, IMAX 2관
        scheduleData[8] = new String[]{"SCH009", "M010", "SCR009"}; // 퓨러루, 4DX 2관
        scheduleData[9] = new String[]{"SCH010", "M001", "SCR010"}; // 드래곤 길들이기, 2D 4관
        scheduleData[10] = new String[]{"SCH011", "M002", "SCR001"}; // 인터스텔라, 2D 1관
        scheduleData[11] = new String[]{"SCH012", "M004", "SCR002"}; // 기생충, 3D 2관
        scheduleData[12] = new String[]{"SCH013", "M007", "SCR003"}; // 엘리오, IMAX 1관
        scheduleData[13] = new String[]{"SCH014", "M008", "SCR004"}; // F1 더 무비, 4DX 1관
        scheduleData[14] = new String[]{"SCH015", "M010", "SCR005"}; // 퓨러루, 2D 3관

        // 상영 시간 배열 (2025-07-01 ~ 2025-07-02)
        LocalDateTime[] startTimes = {
                LocalDateTime.of(2025, 7, 1, 10, 0), // SCH001
                LocalDateTime.of(2025, 7, 1, 12, 30), // SCH002
                LocalDateTime.of(2025, 7, 1, 15, 0), // SCH003
                LocalDateTime.of(2025, 7, 1, 17, 30), // SCH004
                LocalDateTime.of(2025, 7, 1, 20, 0), // SCH005
                LocalDateTime.of(2025, 7, 1, 11, 0), // SCH006
                LocalDateTime.of(2025, 7, 1, 13, 30), // SCH007
                LocalDateTime.of(2025, 7, 1, 16, 0), // SCH008
                LocalDateTime.of(2025, 7, 1, 18, 30), // SCH009
                LocalDateTime.of(2025, 7, 1, 21, 0), // SCH010
                LocalDateTime.of(2025, 7, 2, 10, 0), // SCH011
                LocalDateTime.of(2025, 7, 2, 12, 30), // SCH012
                LocalDateTime.of(2025, 7, 2, 15, 0), // SCH013
                LocalDateTime.of(2025, 7, 2, 17, 30), // SCH014
                LocalDateTime.of(2025, 7, 2, 20, 0)  // SCH015
        };

        for (int i = 0; i < scheduleData.length; i++) {
            String schedulecd = scheduleData[i][0];
            String moviecd = scheduleData[i][1];
            String screencd = scheduleData[i][2];

            // 영화 정보 조회
            Movie movie = movies.stream()
                    .filter(m -> m.getMoviecd().equals(moviecd))
                    .findFirst()
                    .orElse(null);
            if (movie == null) {
                System.out.println("영화 코드 " + moviecd + "를 찾을 수 없습니다.");
                continue;
            }

            // 상영관 정보 조회
            Screen screen = screens.stream()
                    .filter(s -> s.getScreencd().equals(screencd))
                    .findFirst()
                    .orElse(null);
            if (screen == null) {
                System.out.println("상영관 코드 " + screencd + "를 찾을 수 없습니다.");
                continue;
            }

            // 상영 시간 설정
            LocalDateTime starttime = startTimes[i];
            LocalDateTime endtime = starttime.plusMinutes(movie.getRunningtime() + 15); // 상영 시간 + 15분 청소

            Schedule schedule = new Schedule();
            schedule.setSchedulecd(schedulecd);
            schedule.setMoviecd(moviecd);
            schedule.setScreencd(screencd);
            schedule.setStarttime(starttime);
            schedule.setEndtime(endtime);

            scheduleRepository.save(schedule);
            System.out.println("스케줄 추가: " + schedulecd + " (" + movie.getMovienm() + ", " + screen.getScreenname() + ", " + starttime + ")");
        }

        System.out.println("상영 스케줄 데이터 생성 완료!");
    }
}