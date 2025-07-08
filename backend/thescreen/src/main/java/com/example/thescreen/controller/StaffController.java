package com.example.thescreen.controller;


import com.example.thescreen.entity.Staff;
import com.example.thescreen.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
public class StaffController {
    @Autowired
    private StaffRepository staffRepository;


    @GetMapping("/staff")
    public ResponseEntity<List<Staff>> getStaff() {
        List<Staff> staffs = staffRepository.findAll();
        return new ResponseEntity<>(staffs, HttpStatus.OK);
    }

    @PutMapping("/staff/update")
    public ResponseEntity<Staff> updateStaff(@RequestBody Staff staff) {
        // staffid로 기존 데이터 조회
        Optional<Staff> optionalStaff = staffRepository.findById(staff.getStaffid());

        // 필요한 필드만 업데이트
        if(optionalStaff.isPresent()) {
            Staff existingStaff = optionalStaff.get();

            existingStaff.setDept(staff.getDept());
            existingStaff.setPosition(staff.getPosition());
            existingStaff.setPhone(staff.getPhone());
            existingStaff.setEmail(staff.getEmail());
            existingStaff.setTheater(staff.getTheater());
            existingStaff.setRole(staff.getRole());
            existingStaff.setStatus(staff.getStatus());

            // 저장
            staffRepository.save(existingStaff);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
