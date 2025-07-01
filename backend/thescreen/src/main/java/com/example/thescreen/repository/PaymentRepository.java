package com.example.thescreen.repository;

import com.example.thescreen.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, String> { // Payment 엔티티 리포지토리
}