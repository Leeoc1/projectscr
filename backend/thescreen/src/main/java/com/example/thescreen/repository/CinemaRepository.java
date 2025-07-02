package com.example.thescreen.repository;

import com.example.thescreen.entity.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CinemaRepository extends JpaRepository<Cinema, String> {
}
