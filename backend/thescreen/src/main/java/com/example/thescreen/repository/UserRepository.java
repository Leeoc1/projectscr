package com.example.thescreen.repository;

import com.example.thescreen.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> { // User 엔티티 리포지토리
    boolean existsByUserid(String userid);
}