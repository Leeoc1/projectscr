package com.example.thescreen.repository;

import com.example.thescreen.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> { // User 엔티티 리포지토리
}