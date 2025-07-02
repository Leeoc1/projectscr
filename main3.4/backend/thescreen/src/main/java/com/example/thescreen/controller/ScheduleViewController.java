package com.example.thescreen.controller;

import com.example.thescreen.entity.ScheduleView;
import com.example.thescreen.repository.ScheduleViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ScheduleViewController {
    
    @Autowired
    private ScheduleViewRepository scheduleViewRepository;

    @GetMapping("/schedules")
    public List<ScheduleView> getschedules() {
        List<ScheduleView> scheduleViews = scheduleViewRepository.findAll();
        return scheduleViews;
    }
}
