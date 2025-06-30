package com.example.thescreen.data;

import com.example.thescreen.entity.Cinema;
import com.example.thescreen.repository.CinemaRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class CinemaData {
    @Autowired
    CinemaRepository cinemaRepository;

    @PostConstruct
    public void initSampleData() {
        // 데이터가 비어 있는 경우에만 삽입
        List<Cinema> regions = Arrays.asList(
                new Cinema("THR001", "시네맥스 강남점", "01"),
                new Cinema("THR002", "시네맥스 잠실점", "01"),
                new Cinema("THR003", "시네맥스 부산점", "07"),
                new Cinema("THR004", "시네맥스 여의도점", "01"),
                new Cinema("THR005", "시네맥스 대구점", "04"),
                new Cinema("THR006", "시네맥스 인천점", "02"),
                new Cinema("THR007", "시네맥스 분당점", "08"),
                new Cinema("THR008", "시네맥스 대전점", "03")
        );

        // 리스트를 한 번에 저장
        cinemaRepository.saveAll(regions);
    }
}