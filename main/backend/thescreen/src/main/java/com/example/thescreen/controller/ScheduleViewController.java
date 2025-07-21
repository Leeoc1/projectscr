package com.example.thescreen.controller;

import com.example.thescreen.entity.ScheduleView;
import com.example.thescreen.entity.User;
import com.example.thescreen.repository.ScheduleViewRepository;
import com.example.thescreen.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
public class ScheduleViewController {

    @Autowired
    private ScheduleViewRepository scheduleViewRepository;

    @GetMapping("/schedules")
    public List<ScheduleView> getUsersApi() {
        return scheduleViewRepository.findAll();
    }
}
