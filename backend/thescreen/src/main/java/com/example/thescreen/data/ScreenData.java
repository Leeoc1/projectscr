package com.example.thescreen.data;

import com.example.thescreen.entity.Screen;
import com.example.thescreen.repository.ScreenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class ScreenData {

    @Autowired
    private ScreenRepository screenRepository;

    @PostConstruct
    public void seed() {
        System.out.println("상영관 데이터 생성 시작...");

        String[][] screenData = {
            {"S001", "2D 1관", "120", "C001"},
            {"S002", "2D 2관", "80", "C001"},
            {"S003", "IMAX관", "200", "C001"},
            {"S004", "2D 1관", "100", "C002"},
            {"S005", "3D관", "150", "C002"}
        };

        for (String[] data : screenData) {
            Screen screen = new Screen();
            screen.setScreencd(data[0]);
            screen.setScreenname(data[1]);
            screen.setSeatcount(Integer.parseInt(data[2]));
            screen.setCinemacd(data[3]);
            screenRepository.save(screen);
        }

        System.out.println("상영관 데이터 생성 완료!");
    }
} 