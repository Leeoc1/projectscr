package com.example.thescreen.controller;

import com.example.thescreen.entity.User;
import com.example.thescreen.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

//    @GetMapping("/list")
//    public String listUsers(Model model) {
//        List<User> users = userRepository.findAll();
//        model.addAttribute("users", users);
//        model.addAttribute("title", "사용자 목록");
//        return "user/userlist";
//    }

    @GetMapping("/list")
    // @org.springframework.web.bind.annotation.ResponseBody
    @ResponseBody
    public List<User> getUsersApi() {
        return userRepository.findAll();
    }
}
