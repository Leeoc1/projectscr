package com.example.thescreen.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user") // user 테이블 매핑
@Getter
@Setter
public class User {
    @Id
    @Column(name = "userid", length = 20) // 기본 키: userid
    private String userId;

    @Column(name = "userpw", length = 50) // userpw, 선택 입력
    private String userPw;

    @Column(name = "username", length = 20) // username, 선택 입력
    private String userName;

    @Column(name = "email", length = 50) // email, 선택 입력
    private String email;

    @Column(name = "phonenum", length = 20) // 전화번호, 선택 입력
    private String phoneNum;

    @Column(name = "birthdate") // 생년월일, 선택 입력
    private String birthDate;
}