package com.example.thescreen.repository;

import com.example.thescreen.entity.Faq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FaqRepository extends JpaRepository<Faq, Long> {
    List<Faq> findTop5ByOrderByFaqnumDesc();
}
