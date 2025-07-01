package com.example.thescreen.repository;

import com.example.thescreen.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> { // User 엔티티 리포지토리
<<<<<<< HEAD
=======
    User findByUserid(String userid); // 사용자 ID로 조회
>>>>>>> ee44428e6f70464f49fbb3cad2d41128779cd105
}