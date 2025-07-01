package com.example.thescreen.repository;

import com.example.thescreen.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> { // Notice 엔티티 리포지토리
}