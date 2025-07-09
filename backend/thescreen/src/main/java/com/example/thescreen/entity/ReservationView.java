package com.example.thescreen.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "reservation_view")
@Getter
@Setter
public class ReservationView {
    @Id
    private String reservationcd;
    private String seatcd;
    private String reservationtime;
    private String starttime;
    private String movienm;
    private Integer runningtime;
    private String screenname;
    private String cinemanm;
}
