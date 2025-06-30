package com.example.thescreen.data;

import com.example.thescreen.entity.Screen;
import com.example.thescreen.repository.ScreenRepository;
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