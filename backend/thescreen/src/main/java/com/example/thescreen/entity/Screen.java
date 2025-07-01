package com.example.thescreen.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "screen")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Screen {

    @Id
    @Column(length = 20)
    private String screencd; // 상영관 코드 (PK)

    @Column(length = 20)
    private String cinemacd; // 소속 지점 코드

    @Column(length = 10)
    private String screenType; // 상영관 유형 (ex: 2D, 3D, IMAX, 4DX)

    @Column(length = 10)
    private String screenNumber; // 관 번호 (ex: 1관, 2관)

    @Column
    private int allcount; // 좌석 수

    @Column(columnDefinition = "INTEGER DEFAULT 0")
    private int reservationseat; // 예약된 좌석 수

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "VARCHAR(50) DEFAULT '운영중'")
    private ScreenStatus scstatus; // 상영관 상태

    public enum ScreenStatus {
        운영중, 점검중;
    }
}
