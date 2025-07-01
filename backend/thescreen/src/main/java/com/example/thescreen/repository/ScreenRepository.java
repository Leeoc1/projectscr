package com.example.thescreen.repository;

import com.example.thescreen.dto.ScreenDTO;
import com.example.thescreen.entity.Screen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScreenRepository extends JpaRepository<Screen, String> {
    @Query(value = "SELECT * FROM screen_view", nativeQuery = true)
    List<ScreenDTO> findAllScreenView();

    @Query(value = "SELECT * FROM screen_view WHERE regioncd = :regionCode", nativeQuery = true)
    List<ScreenDTO> findScreenViewByRegionCode(@Param("regionCode") String regionCode);
}
