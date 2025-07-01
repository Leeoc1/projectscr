package com.example.thescreen.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservation") // reservation 테이블 매핑
@Getter
@Setter
public class Reservation {
    @Id
    @Column(length = 20) // 기본 키: reservationcd, 길이 20
    private String reservationcd;

<<<<<<< HEAD
=======
    // @Column(length = 20) // userid, 길이 20, 선택 입력
    // private String userid;

>>>>>>> ee44428e6f70464f49fbb3cad2d41128779cd105
    @ManyToOne
    @JoinColumn(name = "userid") // 외래 키: userid
    private User user;

    @Column(length = 20) // schedulecd, 길이 20, 선택 입력
    private String schedulecd;

    private LocalDateTime reservationtime; // reservationtime, datetime, 선택 입력

    @Column(length = 20) // reservationstatus, 길이 20, 선택 입력
    private String reservationstatus;

    @Column(length = 20) // paymentcd, 길이 20, 선택 입력
    private String paymentcd;
}