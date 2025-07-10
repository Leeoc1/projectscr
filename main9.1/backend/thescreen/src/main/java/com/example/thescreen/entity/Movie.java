package com.example.thescreen.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "movie")
@Getter
@Setter
public class Movie {
    @Id
    @Column(length = 20)
    private String moviecd;

    @Column(columnDefinition = "TEXT")
    private String movienm;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String genre;

    @Column(columnDefinition = "TEXT")
    private String director;

    @Column(columnDefinition = "TEXT")
    private String actors;

    private Integer runningtime;

    private LocalDate releasedate;

    @Column(columnDefinition = "TEXT")
    private String posterurl;

    @Column(length = 20)
    private String runningscreen;

    @Enumerated(EnumType.STRING)
    private IsAdult isadult;

    public enum IsAdult {
        Y, N
    }
}