package com.example.thescreen.repository;

import com.example.thescreen.entity.ScheduleView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ScheduleViewRepository extends JpaRepository<ScheduleView, String> {

    @Query("SELECT DISTINCT s.movienm FROM ScheduleView s WHERE s.cinemanm LIKE %:cinemanm%")
    List<String> findDistinctMovieNamesByCinemanm(String cinemanm);
}