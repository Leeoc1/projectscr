package com.example.thescreen.controller;

import com.example.thescreen.entity.User;
import com.example.thescreen.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/users")
<<<<<<< HEAD
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
=======
>>>>>>> ee44428e6f70464f49fbb3cad2d41128779cd105
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/list")
    public List<User> getUsersApi() {
        return userRepository.findAll();
    }
}
