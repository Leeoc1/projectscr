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
            String[] screenTypes = {
                    "2D", "3D", "IMAX", "4DX", "2D",
                    "3D", "IMAX", "4DX", "2D", "3D",
                    "2D", "4DX", "IMAX", "2D", "3D"
            };
            String[] screenNumbers = {
                    "1관", "1관", "1관", "1관", "2관",
                    "2관", "2관", "2관", "3관", "3관",
                    "4관", "3관", "3관", "5관", "4관"
            };
            int[] seatCounts = {
                    120, 90, 150, 100, 110,
                    95, 130, 85, 115, 80,
                    105, 90, 140, 100, 95
            };
            String[] cinemaCodes = {
                    "THR001", "THR001", "THR002", "THR002", "THR003",
                    "THR003", "THR004", "THR004", "THR005", "THR005",
                    "THR006", "THR006", "THR007", "THR007", "THR008"
            };
            int[] reservationSeats = {
                    0, 10, 0, 5, 0,
                    0, 20, 0, 0, 15,
                    0, 0, 0, 5, 0
            };
            Screen.ScreenStatus[] statuses = {
                    Screen.ScreenStatus.운영중, Screen.ScreenStatus.운영중, Screen.ScreenStatus.운영중,
                    Screen.ScreenStatus.점검중, Screen.ScreenStatus.운영중, Screen.ScreenStatus.운영중,
                    Screen.ScreenStatus.운영중, Screen.ScreenStatus.점검중, Screen.ScreenStatus.운영중,
                    Screen.ScreenStatus.운영중, Screen.ScreenStatus.운영중, Screen.ScreenStatus.운영중,
                    Screen.ScreenStatus.점검중, Screen.ScreenStatus.운영중, Screen.ScreenStatus.운영중
            };

            List<Screen> screens = new ArrayList<>();
            for (int i = 0; i < 15; i++) {
                String screenCode = String.format("SCR%03d", i + 1); // SCR001, SCR002, ...
                screens.add(new Screen(screenCode, cinemaCodes[i], screenTypes[i], screenNumbers[i], seatCounts[i], reservationSeats[i], statuses[i]));
            }

            screenRepository.saveAll(screens);
        }
    }
}