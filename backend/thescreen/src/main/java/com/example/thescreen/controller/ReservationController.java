package com.example.thescreen.controller;

import com.example.thescreen.entity.Reservation;
import com.example.thescreen.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reservation")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {

    private ReservationRepository reservationRepository;

    @Autowired
    public ReservationController(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    @GetMapping("/seat")
    public List<Reservation> getSeat() {
        return reservationRepository.findAll();
    }

    // 예매 정보 저장 (post)
    @PostMapping
    public ResponseEntity<?> saveReservation(@RequestBody Map<String, Object> requestData) {
        try {
            // 필수 데이터 검증
            if (requestData.get("schedulecd") == null || requestData.get("seatcd") == null) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "필수 데이터가 누락되었습니다.");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            // Reservation 엔티티 생성
            Reservation reservation = new Reservation();
            reservation.setSchedulecd((String) requestData.get("schedulecd"));

            // seatcd 처리 - 배열을 문자열로 변환
            Object seatcdObj = requestData.get("seatcd");
            String seatcd;
            if (seatcdObj instanceof java.util.List) {
                // 배열을 쉼표로 구분된 문자열로 변환
                java.util.List<?> seatList = (java.util.List<?>) seatcdObj;
                seatcd = String.join(",", seatList.stream().map(Object::toString).toList());
            } else {
                seatcd = (String) seatcdObj;
            }
            reservation.setSeatcd(seatcd);

            reservation.setReservationtime(LocalDateTime.now());
            reservation.setReservationstatus("예약완료");
            // userid는 현재 로그인한 사용자 정보에서 가져와야 함 (임시로 null)
            reservation.setUser(null);
            // paymentcd는 결제 완료 후 설정 (임시로 null)
            Object paymentcdObj = requestData.get("paymentcd");
            if (paymentcdObj != null) {
                reservation.setPaymentcd(paymentcdObj.toString());
            } else {
                reservation.setPaymentcd(null);
            }

            Long maxId = reservationRepository.findMaxReservationId();
            Long newId = (maxId != null) ? maxId + 1 : 1;
            String formattedId = String.format("%012d", newId);
            reservation.setReservationcd(formattedId);
            // 저장
            Reservation savedReservation = reservationRepository.save(reservation);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "예약이 성공적으로 저장되었습니다.");
            response.put("reservationId", savedReservation.getReservationcd());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "예약 저장 중 오류가 발생했습니다: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
}
