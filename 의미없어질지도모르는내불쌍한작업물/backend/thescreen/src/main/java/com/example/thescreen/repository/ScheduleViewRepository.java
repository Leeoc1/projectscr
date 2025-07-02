package com.example.thescreen.repository;

import com.example.thescreen.entity.ScheduleView;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ScheduleViewRepository extends JpaRepository<ScheduleView, String> {
}