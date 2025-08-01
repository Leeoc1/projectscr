package com.example.thescreen.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "schedule_view")
@Getter
@Setter
public class ScheduleView {
    @Id
    private String schedulecd;

    private String startdate;

    private String starttime;

    private String moviecd;

    private String movienm;

    private String director;

    private String description;

    private Integer runningtime;

    private String genre;

    private String actors;

    private LocalDate releasedate;

    private String posterurl;

    private String screenname;

    private String screenstatus;

    private String screentype;

    private Integer allseat;

    private Integer reservationseat;

    private String cinemanm;

    private String regionnm;

    private String movieinfo = "N";

    private Movie.IsAdult isadult;

    private String movierank;

    private Integer rankchange;
}