package com.example.thescreen.controller;

import com.example.thescreen.entity.Cinema;
import com.example.thescreen.repository.CinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class CinemaController {
    @Autowired
    CinemaRepository cinemaRepository;

    @GetMapping("/cinema")
    public String getCinema (Model model) {
        List<Cinema> cinemas = cinemaRepository.findAll();
        model.addAttribute("cinemas", cinemas);
        return "cinema-list";
    }
}
