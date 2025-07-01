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
        if (cinemaRepository.count() == 0) {
            List<Cinema> cinemas = Arrays.asList(
                    new Cinema("THR001", "시네맥스 강남점", "서울특별시 강남구 테헤란로 123", "01"),
                    new Cinema("THR002", "시네맥스 잠실점", "서울특별시 송파구 올림픽로 240", "01"),
                    new Cinema("THR003", "시네맥스 부산점", "부산광역시 부산진구 중앙대로 668", "07"),
                    new Cinema("THR004", "시네맥스 여의도점", "서울특별시 영등포구 여의대로 108", "01"),
                    new Cinema("THR005", "시네맥스 대구점", "대구광역시 중구 동성로 2길 80", "04"),
                    new Cinema("THR006", "시네맥스 인천점", "인천광역시 중구 제물량로 266", "02"),
                    new Cinema("THR007", "시네맥스 분당점", "경기도 성남시 분당구 정자로 178", "08"),
                    new Cinema("THR008", "시네맥스 대전점", "대전광역시 중구 중앙로 100", "03"));

            // 리스트를 한 번에 저장
            cinemaRepository.saveAll(cinemas);
            System.out.println("극장 데이터 생성 완료! 총 " + cinemas.size() + "개 극장이 추가되었습니다.");
        } else {
            System.out.println("극장 데이터가 이미 존재합니다. 초기화를 건너뜁니다.");
        }
    }
}
