package com.example.thescreen.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "seat")
@Getter
@NoArgsConstructor
public class Seat {

    @Id
    @Column(length = 20)
    private String seatcd; // 좌석 코드 (PK)

    @Column(length = 20)
    private String screencd; // 상영관 코드

    @Column(length = 2)
    private String seatrow; // 좌석 행 (A~Z)

    @Column
    private int seatnum; // 좌석 번호

    @Enumerated(EnumType.STRING)
    private IsReservation isreservation;// 예약 여부 ("Y" or "N")

    public enum IsReservation {
        Y, N
    }
}


