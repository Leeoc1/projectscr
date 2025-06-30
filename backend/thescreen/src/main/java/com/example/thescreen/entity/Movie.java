package com.example.thescreen.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "movie") // movie 테이블 매핑
@Getter
@Setter
public class Movie {
    @Id
    @Column(length = 20) // 기본 키: moviecd, 길이 20
    private String moviecd;

    @Column(length = 100) // movienm, 길이 100, 선택 입력
    private String movienm;

    @Column(columnDefinition = "TEXT") // description, text, 선택 입력
    private String description;

    @Column(length = 20) // genre, 길이 20, 선택 입력
    private String genre;

    @Column(length = 50) // director, 길이 50, 선택 입력
    private String director;

    @Column(length = 100) // actors, 길이 100, 선택 입력
    private String actors;

    private Integer runningtime; // runningtime, int, 선택 입력

    private LocalDate releasedate; // releasedate, date, 선택 입력

    @Enumerated(EnumType.STRING)
    private IsAdult isadult; // isadult, enum(Y,N), 선택 입력

    public enum IsAdult {
        Y, N
    }
}