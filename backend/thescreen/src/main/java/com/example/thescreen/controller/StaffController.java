package com.example.thescreen.controller;


import com.example.thescreen.entity.Staff;
import com.example.thescreen.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
public class StaffController {
    @Autowired
    private StaffRepository staffRepository;


    @GetMapping("/staff")
    public ResponseEntity<List<Staff>>  getStaff() {
        List<Staff> staffs = staffRepository.findAll();
        return new ResponseEntity<>(staffs, HttpStatus.OK);
    }
}
