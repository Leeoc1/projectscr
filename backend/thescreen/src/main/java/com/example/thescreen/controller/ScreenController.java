package com.example.thescreen.controller;

import com.example.thescreen.entity.Region;
import com.example.thescreen.entity.Screen;
import com.example.thescreen.repository.RegionRepository;
import com.example.thescreen.repository.ScreenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ScreenController {
    @Autowired
    private ScreenRepository screenRepository;


    @GetMapping("/screens")
    public String getScreen(Model model) {
        List<Screen> screens = screenRepository.findAll();
        model.addAttribute("screens", screens);
        return "screens-list";
    }
}
