package com.example.thescreen.repository;

import com.example.thescreen.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, String> { // Reservation 엔티티 리포지토리

}