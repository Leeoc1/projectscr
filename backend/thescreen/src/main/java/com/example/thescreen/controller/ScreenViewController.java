package com.example.thescreen.controller;

import com.example.thescreen.dto.ScreenDTO;
import com.example.thescreen.service.ScreenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
public class ScreenViewController {
    @Autowired
    private ScreenService screenService;

    @GetMapping("/screens")
    public List<ScreenDTO> getScreens(@RequestParam(value = "regionCode", required = false) String regionCode) {
        return regionCode != null
                ? screenService.getScreenDataByRegion(regionCode)
                : screenService.getAllScreenData();
    }
}