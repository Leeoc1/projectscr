package com.example.thescreen.service;

import com.example.thescreen.entity.MovieView;
import com.example.thescreen.entity.Schedule;
import com.example.thescreen.repository.MovieViewRepository;
import com.example.thescreen.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class ScheduleService {

    private static final Random RANDOM = new Random();
    private static final int TOTAL_DAYS = 30;
    //이후 실행시 아래 1000개 막고 100개로 실행
//    private static final int SCHEDULES_PER_MOVIE = 100;
    //첫 실행시 주석 해제하고 사용
    private static final int SCHEDULES_PER_MOVIE = 10000;
    private static final int MIN_HOUR_GAP = 3;

    @Autowired
    private MovieViewRepository movieViewRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Transactional
    public String generateDummySchedules() {
        try {
            LocalDate startDate = LocalDate.now(); // 오늘 날짜
            LocalDate endDate = startDate.plusDays(TOTAL_DAYS - 1); // 7일 후

            // 마지막 날짜(예: 7월 29일)에 스케줄이 있는지 확인
            boolean hasSchedules = scheduleRepository.existsByStartdate(endDate);
            if (hasSchedules) {
                return String.format("해당 날짜(%s)에 대한 스케줄이 이미 등록되었습니다.", endDate);
            }

            // 탑 10 영화 조회
            List<MovieView> movies = movieViewRepository.findMoviesWithRank();
            List<String> screens = generateScreenCodes();
            Map<String, List<Schedule>> screenSchedules = new HashMap<>();
            for (String screen : screens) {
                screenSchedules.put(screen, scheduleRepository.findByScreencdAndStartdateBetween(screen, startDate, endDate));
            }

            StringBuilder sqlOutput = new StringBuilder();
            sqlOutput.append("INSERT INTO schedule (schedulecd, moviecd, screencd, startdate, starttime, endtime) VALUES\n");

            int totalSchedules = 0;
            for (MovieView movie : movies) {
                // 기존 스케줄 여부 확인
                boolean hasPreviousSchedules = scheduleRepository.existsByMoviecd(movie.getMoviecd());
                List<LocalDate> targetDates = hasPreviousSchedules ?
                        List.of(endDate) : // 기존/재진입 영화: 마지막 날만
                        generateDateRange(startDate, endDate); // 신규 영화: 7일 모두

                int schedulesPerDay = SCHEDULES_PER_MOVIE / Math.max(1, targetDates.size()); // 균등 분배
                for (LocalDate date : targetDates) {
                    for (int i = 0; i < schedulesPerDay; i++) {
                        String scheduleCode = generateScheduleCode();
                        String screenCode = screens.get(RANDOM.nextInt(screens.size()));
                        LocalDateTime startTime = generateValidStartTime(screenSchedules.get(screenCode), date, movie.getRunningtime());

                        if (startTime != null) {
                            LocalDateTime endTime = startTime.plusMinutes(movie.getRunningtime());
                            Schedule schedule = new Schedule();
                            schedule.setSchedulecd(scheduleCode);
                            schedule.setMoviecd(movie.getMoviecd());
                            schedule.setScreencd(screenCode);
                            schedule.setStartdate(date);
                            schedule.setStarttime(startTime);
                            schedule.setEndtime(endTime);
                            scheduleRepository.save(schedule);
                            screenSchedules.get(screenCode).add(schedule);

                            sqlOutput.append(String.format("('%s', '%s', '%s', '%s', '%s', '%s')%s\n",
                                    scheduleCode, movie.getMoviecd(), screenCode, date,
                                    startTime.toString().replace("T", " "), endTime.toString().replace("T", " "),
                                    (i < schedulesPerDay - 1 || !isLastMovieAndDate(movies, movie, date, targetDates)) ? "," : ";"));
                            totalSchedules++;
                        }
                    }
                }
            }

            // SQL 파일 저장
            try (FileWriter writer = new FileWriter("schedule_inserts_" + startDate + ".sql")) {
                writer.write(sqlOutput.toString());
            } catch (IOException e) {
                throw new RuntimeException("SQL 파일 작성 실패: " + e.getMessage());
            }

            return String.format("%s에 대한 스케줄 %d개 생성 완료", endDate, totalSchedules);
        } catch (Exception e) {
            throw new RuntimeException("스케줄 생성 실패: " + e.getMessage());
        }
    }

    private List<String> generateScreenCodes() {
        List<String> screens = new ArrayList<>();
        for (int i = 1; i <= 826; i++) {
            screens.add(String.format("SCR%03d", i));
        }
        return screens;
    }

    private String generateScheduleCode() {
        String code;
        do {
            code = "SCH" + String.format("%06d", RANDOM.nextInt(1000000));
        } while (scheduleRepository.existsById(code));
        return code;
    }

    private LocalDateTime generateValidStartTime(List<Schedule> existingSchedules, LocalDate date, int runningTime) {
        LocalTime startOfDay = LocalTime.of(8, 0); // 8 AM
        LocalTime endOfDay = LocalTime.of(23, 59); // 11:59 PM
        int maxAttempts = 50;

        for (int attempt = 0; attempt < maxAttempts; attempt++) {
            int minutes = RANDOM.nextInt((endOfDay.toSecondOfDay() - startOfDay.toSecondOfDay()) / 60);
            LocalDateTime proposedStart = LocalDateTime.of(date, startOfDay.plusMinutes(minutes));

            if (isValidStartTime(existingSchedules, proposedStart, runningTime)) {
                return proposedStart;
            }
        }
        return null;
    }

    private boolean isValidStartTime(List<Schedule> existingSchedules, LocalDateTime proposedStart, int runningTime) {
        LocalDateTime proposedEnd = proposedStart.plusMinutes(runningTime);
        for (Schedule schedule : existingSchedules) {
            if (schedule.getStartdate().equals(proposedStart.toLocalDate())) {
                LocalDateTime existingStart = schedule.getStarttime();
                LocalDateTime existingEnd = schedule.getEndtime();
                LocalDateTime minGapStart = existingStart.minusHours(MIN_HOUR_GAP);
                LocalDateTime minGapEnd = existingEnd.plusHours(MIN_HOUR_GAP);

                if ((proposedStart.isAfter(minGapStart) && proposedStart.isBefore(minGapEnd)) ||
                        (proposedEnd.isAfter(minGapStart) && proposedEnd.isBefore(minGapEnd))) {
                    return false;
                }
            }
        }
        return true;
    }

    private boolean isLastMovieAndDate(List<MovieView> movies, MovieView movie, LocalDate date, List<LocalDate> targetDates) {
        return movies.indexOf(movie) == movies.size() - 1 && date.equals(targetDates.get(targetDates.size() - 1));
    }

    private List<LocalDate> generateDateRange(LocalDate start, LocalDate end) {
        List<LocalDate> dates = new ArrayList<>();
        for (LocalDate date = start; !date.isAfter(end); date = date.plusDays(1)) {
            dates.add(date);
        }
        return dates;
    }
}