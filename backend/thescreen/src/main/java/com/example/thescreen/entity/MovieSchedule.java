package com.example.thescreen.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "schedule_movies")
@Data
public class MovieSchedule {
    @Id
    @Column(length = 20)
    private String moviecd;

    @Column(length = 100)
    private String movienm;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String genre;

    @Column(length = 50)
    private String director;

    @Column(columnDefinition = "TEXT")
    private String actors;

    private Integer runningtime;

    private LocalDate releasedate;

    @Column(length = 200)
    private String posterurl;

    @Column(length = 20)
    private String runningscreen;

    @Column(length = 50, columnDefinition = "VARCHAR(50) DEFAULT 'N'")
    private String movieinfo = "N";

    @Enumerated(EnumType.STRING)
    private Movie.IsAdult isadult;

    public enum IsAdult {
        Y, N
    }

    @Column(length = 30) // movierankcd의 길이를 적절히 설정 (MovieRank의 movierankcd와 일치)
    private String movierankcd; // MovieRank와의 연관성을 위한 필드

    @Column(name = "movierank", length = 30)
    private String movierank; // varchar(30)

    @Column(name = "rankchange", columnDefinition = "int(11)")
    private Integer rankchange; // int(11)
}
