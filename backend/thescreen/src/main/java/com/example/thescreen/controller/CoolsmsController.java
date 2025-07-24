package com.example.thescreen.controller;

import com.example.thescreen.service.CoolsmsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sms")
public class CoolsmsController {

    private final CoolsmsService coolsmsService;

    public CoolsmsController(CoolsmsService coolsmsService) {
        this.coolsmsService = coolsmsService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendSms(@RequestBody SmsDto smsDto) {
        coolsmsService.certificateSMS(smsDto.getPhoneNumber());
        return ResponseEntity.ok("인증번호 전송 완료");
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifySms(@RequestBody CertificateDto certificateDto) {
        boolean isVerified = coolsmsService.verifySMS(certificateDto.getPhoneNumber(), certificateDto.getCertificateNum());
        if (isVerified) {
            return ResponseEntity.ok("인증 성공");
        } else {
            return ResponseEntity.badRequest().body("인증 실패: 잘못된 인증번호 또는 만료");
        }
    }
}

class SmsDto {
    private String phoneNumber;

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}

class CertificateDto {
    private String phoneNumber;
    private String certificateNum;

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCertificateNum() {
        return certificateNum;
    }

    public void setCertificateNum(String certificateNum) {
        this.certificateNum = certificateNum;
    }
}