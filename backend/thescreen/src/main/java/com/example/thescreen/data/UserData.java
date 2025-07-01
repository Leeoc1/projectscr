package com.example.thescreen.data;

import com.example.thescreen.entity.User;
import com.example.thescreen.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class UserData {

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void seed() {
        System.out.println("사용자 데이터 생성 시작...");

        // 데이터가 비어 있는 경우에만 삽입
        if (userRepository.count() == 0) {
            // 사용자 데이터 배열 [사용자ID, 사용자명, 이메일, 전화번호, 생년월일, 상태]
            String[][] userData = {
                {"admin", "관리자", "admin@thescreen.com", "010-0000-0000", "1990-01-01", "활성"},
                {"user001", "김철수", "kim@email.com", "010-1111-1111", "1995-03-15", "활성"},
                {"user002", "이영희", "lee@email.com", "010-2222-2222", "1992-07-22", "활성"},
                {"user003", "박민수", "park@email.com", "010-3333-3333", "1988-11-08", "활성"},
                {"user004", "최지영", "choi@email.com", "010-4444-4444", "1997-05-30", "활성"},
                {"user005", "정현우", "jung@email.com", "010-5555-5555", "1993-09-12", "활성"},
                {"user006", "한미라", "han@email.com", "010-6666-6666", "1991-12-25", "활성"},
                {"user007", "송태현", "song@email.com", "010-7777-7777", "1996-02-14", "활성"},
                {"user008", "윤서연", "yoon@email.com", "010-8888-8888", "1994-08-03", "활성"},
                {"user009", "임동현", "lim@email.com", "010-9999-9999", "1989-06-18", "탈퇴"},
                {"user010", "강미라", "kang@email.com", "010-1010-1010", "1998-04-07", "활성"}
            };

            List<User> users = new ArrayList<>();
            
            for (String[] data : userData) {
                String userid = data[0];
                String username = data[1];
                String email = data[2];
                String phone = data[3];
                LocalDate birth = LocalDate.parse(data[4]);
                String status = data[5];

                User user = new User();
                user.setUserid(userid);
                user.setUsername(username);
                user.setEmail(email);
                user.setPhone(phone);
                user.setBirth(birth.toString());
                user.setStatus(status);

                users.add(user);
                System.out.println("사용자 추가: " + user.getUsername() + " (" + user.getUserid() + ")");
            }

            // 리스트를 한 번에 저장
            userRepository.saveAll(users);
            System.out.println("사용자 데이터 생성 완료! 총 " + users.size() + "명의 사용자가 추가되었습니다.");
        } else {
            System.out.println("사용자 데이터가 이미 존재합니다. 초기화를 건너뜁니다.");
        }
    }
} 