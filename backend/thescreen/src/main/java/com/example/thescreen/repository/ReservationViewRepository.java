package com.example.thescreen.repository;


import com.example.thescreen.entity.ReservationView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationViewRepository extends JpaRepository<ReservationView, String> {

    @Query(value = "SELECT DATE(reservationtime) AS reservationDate, SUM(amount) AS totalAmount " +
            "FROM reservation_view " +
            "WHERE reservationtime BETWEEN :startDate AND :endDate " +
            "GROUP BY DATE(reservationtime) " +
            "ORDER BY DATE(reservationtime) DESC", nativeQuery = true)
    List<Object[]> findDailySalesBetween(@Param("startDate") LocalDateTime startDate,
                                         @Param("endDate") LocalDateTime endDate);
}
