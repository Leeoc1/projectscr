package com.example.thescreen.controller;

import com.example.thescreen.entity.ReservationView;
import com.example.thescreen.repository.ReservationViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
public class ReservationViewController {
    @Autowired
    private ReservationViewRepository reservationViewRepository;

    @GetMapping("/view/reservation/success")
    public List<ReservationView> getReservation() {
        return reservationViewRepository.findAll();
    }
}
