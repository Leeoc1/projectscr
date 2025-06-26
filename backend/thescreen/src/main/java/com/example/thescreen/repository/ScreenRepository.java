package com.example.thescreen.repository;

import com.example.thescreen.entity.Screen;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScreenRepository extends JpaRepository<Screen, String> {
}
