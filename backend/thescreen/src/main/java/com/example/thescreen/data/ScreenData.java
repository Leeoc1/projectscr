package com.example.thescreen.data;

import com.example.thescreen.entity.Screen;
import com.example.thescreen.repository.ScreenRepository;
<<<<<<< HEAD
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ScreenData {
    @Autowired
    ScreenRepository screenRepository;

    @PostConstruct
    public void initSampleData() {
        if (screenRepository.count() == 0) {
            String[] screenNames = {
                    "2D 1관", "3D 2관", "IMAX 1관", "4DX 1관", "2D 3관",
                    "3D 1관", "2D 2관", "IMAX 2관", "4DX 2관", "2D 4관"
            };
            int[] seatCounts = {
                    100, 80, 120, 90, 110,
                    95, 85, 130, 100, 105
            };
            String[] cinemaCodes = {
                    "THR001", "THR001", "THR002", "THR002", "THR003",
                    "THR004", "THR004", "THR005", "THR006", "THR007"
            };

            List<Screen> screens = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                String screenCode = String.format("SCR%03d", i + 1); // SCR001, SCR002, ...
                screens.add(new Screen(screenCode, screenNames[i], seatCounts[i], cinemaCodes[i]));
            }

            screenRepository.saveAll(screens);
        }
    }
}
=======
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
>>>>>>> ee44428e6f70464f49fbb3cad2d41128779cd105
