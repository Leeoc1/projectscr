package com.example.thescreen.service;

import com.example.thescreen.dto.ScreenDTO;
import com.example.thescreen.entity.Cinema;
import com.example.thescreen.entity.Region;
import com.example.thescreen.entity.Screen;
import com.example.thescreen.repository.CinemaRepository;
import com.example.thescreen.repository.RegionRepository;
import com.example.thescreen.repository.ScreenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ScreenService {
    @Autowired
    private ScreenRepository screenRepository;

    public List<ScreenDTO> getAllScreenData() {
        return screenRepository.findAllScreenView();
    }

    public List<ScreenDTO> getScreenDataByRegion(String regionCode) {
        return screenRepository.findScreenViewByRegionCode(regionCode);
    }
}