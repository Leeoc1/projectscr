package com.example.thescreen.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScreenDTO {
    private String regioncd;    // 지역 코드
    private String regionnm;    // 지역 이름
    private String cinemacd;    // 극장 코드
    private String cinemanm;    // 극장 이름
    private String screencd;    // 상영관 코드
    private String screenname;  // 상영관 이름
    private int seatcount;      // 좌석 수
}