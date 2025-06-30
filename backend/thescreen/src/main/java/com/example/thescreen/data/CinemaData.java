package com.example.thescreen.data;

import com.example.thescreen.entity.Cinema;
import com.example.thescreen.repository.CinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class CinemaData {

    @Autowired
    private CinemaRepository cinemaRepository;

    @PostConstruct
    public void seed() {
        System.out.println("영화관 데이터 생성 시작...");

        String[][] cinemaData = {
            {"C001", "CGV 강남", "R001"},
            {"C002", "CGV 홍대", "R001"},
            {"C003", "롯데시네마 부산", "R002"},
            {"C004", "메가박스 대구", "R003"},
            {"C005", "CGV 인천", "R004"}
        };

        for (String[] data : cinemaData) {
            Cinema cinema = new Cinema();
            cinema.setCinemacd(data[0]);
            cinema.setCinemanm(data[1]);
            cinema.setRegioncd(data[2]);
            cinemaRepository.save(cinema);
        }

        System.out.println("영화관 데이터 생성 완료!");
    }
} 