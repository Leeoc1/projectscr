package com.example.thescreen.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "users") // user 테이블 매핑 (H2 예약어 충돌 방지)
@Getter
@Setter
public class User {
    @Id
    @Column(length = 20) // 기본 키: userid
    private String userid;

    @Column(length = 50) // userpw, 선택 입력
    private String userpw;

    @Column(length = 20) // username, 선택 입력
    private String username;

    @Column(length = 50) // email, 선택 입력
    private String email;

    @Column(length = 20) // 전화번호, 선택 입력
    private String phone;

    @Column(length = 20)
    private String birth;  // 생년월일, 선택 입력

    @Column(length = 10) // 회원 상태: 활성, 탈퇴
    private String status;

    @Column
    private LocalDate reg_date;
}