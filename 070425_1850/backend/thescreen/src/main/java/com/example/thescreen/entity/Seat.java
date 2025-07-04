// package com.example.thescreen.entity;

// import jakarta.persistence.*;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// @Entity
// @Table(name = "seat")
// @Getter
// @Setter
// @NoArgsConstructor
// public class Seat {


//     @Column
//     private int seatnum; // 좌석 번호

//     @Column(length = 20)
//     private String schedulecd; // 상영 스케줄 코드

//     @Enumerated(EnumType.STRING)
//     private SeatStatus status; // 좌석 상태

//     public enum SeatStatus {
//         AVAILABLE,    // 예약 가능
//         RESERVED      // 예약됨
//     }
// }


