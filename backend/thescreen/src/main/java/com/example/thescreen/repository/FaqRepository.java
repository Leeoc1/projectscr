package com.example.thescreen.repository;

import com.example.thescreen.entity.Faq;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FaqRepository extends JpaRepository<Faq, Long> {
}
