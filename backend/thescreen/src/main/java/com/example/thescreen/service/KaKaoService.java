package com.example.thescreen.service;

import com.example.thescreen.entity.ReservationView;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.time.format.DateTimeFormatter;

@Service
public class KaKaoService {
    @Value("${kakao.client.id}")
    private String clientId;

    private final RestTemplate restTemplate = new RestTemplate();

    public String sendKakaoMessage(ReservationView reservationView, String accessToken) {
        String url = "https://kapi.kakao.com/v2/api/talk/memo/default/send";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", "Bearer " + accessToken);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("template_id", "122730");
        params.add("template_args", String.format(
                "{\"title\":\"%s\",\"date\":\"%s\",\"screenname\":\"%s\",\"payment\":\"%s\"}",
                escapeJsonString(reservationView.getMovienm()),
                escapeJsonString(reservationView.getReservationtime() != null
                        ? reservationView.getReservationtime().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
                        : ""),
                escapeJsonString(reservationView.getScreenname()),
                escapeJsonString(String.valueOf(reservationView.getAmount()))));

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            String response = restTemplate.postForObject(url, request, String.class);
            return "Message sent: " + response;
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    private String escapeJsonString(String input) {
        if (input == null)
            return "";
        return input.replace("\"", "\\\"").replace("\n", "\\n");
    }
}