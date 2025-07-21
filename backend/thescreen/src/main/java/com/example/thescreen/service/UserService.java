package com.example.thescreen.service;


import com.example.thescreen.domain.LoginResult;
import com.example.thescreen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public LoginResult login(String userid, String userpw) {
        return userRepository.findByUserid(userid)
                .map(user -> {
                    if (user.getUserpw().equals(userpw)) {
                        return LoginResult.SUCCESS;
                    } else {
                        return LoginResult.INVALID_PASSWORD;
                    }
                })
                .orElse(LoginResult.NOT_FOUND);
    }
}
