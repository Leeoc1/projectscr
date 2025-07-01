package com.example.thescreen.data;

import com.example.thescreen.entity.Staff;
import com.example.thescreen.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class StaffData {

    @Autowired
    private StaffRepository staffRepository;

    @PostConstruct
    public void seed() {
        System.out.println("직원 데이터 생성 시작...");

        // 데이터가 비어 있는 경우에만 삽입
        if (staffRepository.count() == 0) {
            // 직원 데이터 배열 [직원ID, 이름, 부서, 지점명, 직급, 담당, 휴대폰, 이메일, 채용날짜, 고용형태, 근무상태]
            String[][] staffData = {
                {"STF001", "김영수", "영업팀", "CGV 강남점", "팀장", "영업 관리", "010-1234-5678", "kim@thescreen.com", "2020-01-15", "정규직", "근무중"},
                {"STF002", "이미영", "고객서비스팀", "CGV 강남점", "사원", "고객 응대", "010-2345-6789", "lee@thescreen.com", "2021-03-20", "정규직", "근무중"},
                {"STF003", "박준호", "시설관리팀", "CGV 강남점", "대리", "시설 관리", "010-3456-7890", "park@thescreen.com", "2019-07-10", "정규직", "근무중"},
                {"STF004", "최수진", "영업팀", "CGV 잠실점", "사원", "영업 보조", "010-4567-8901", "choi@thescreen.com", "2022-02-28", "정규직", "근무중"},
                {"STF005", "정민수", "고객서비스팀", "CGV 잠실점", "팀장", "고객 관리", "010-5678-9012", "jung@thescreen.com", "2018-11-05", "정규직", "근무중"},
                {"STF006", "한지영", "시설관리팀", "CGV 잠실점", "사원", "청소 관리", "010-6789-0123", "han@thescreen.com", "2023-01-15", "계약직", "근무중"},
                {"STF007", "송태현", "영업팀", "CGV 부산점", "대리", "영업 관리", "010-7890-1234", "song@thescreen.com", "2020-09-12", "정규직", "휴가"},
                {"STF008", "윤서연", "고객서비스팀", "CGV 부산점", "사원", "고객 응대", "010-8901-2345", "yoon@thescreen.com", "2022-06-20", "정규직", "근무중"},
                {"STF009", "임동현", "시설관리팀", "CGV 부산점", "팀장", "시설 관리", "010-9012-3456", "lim@thescreen.com", "2017-04-08", "정규직", "근무중"},
                {"STF010", "강미라", "영업팀", "CGV 대구점", "사원", "영업 보조", "010-0123-4567", "kang@thescreen.com", "2023-03-10", "계약직", "근무중"}
            };

            List<Staff> staffs = new ArrayList<>();
            
            for (String[] data : staffData) {
                String staffid = data[0];
                String staffname = data[1];
                String dept = data[2];
                String theater = data[3];
                String position = data[4];
                String role = data[5];
                String phone = data[6];
                String email = data[7];
                LocalDate hiredate = LocalDate.parse(data[8]);
                String shifttype = data[9];
                String status = data[10];

                Staff staff = new Staff();
                staff.setStaffid(staffid);
                staff.setStaffname(staffname);
                staff.setDept(dept);
                staff.setTheater(theater);
                staff.setPosition(position);
                staff.setRole(role);
                staff.setPhone(phone);
                staff.setEmail(email);
                staff.setHiredate(hiredate);
                staff.setShifttype(shifttype);
                staff.setStatus(status);

                staffs.add(staff);
                System.out.println("직원 추가: " + staff.getStaffname() + " (" + staff.getStaffid() + ")");
            }

            // 리스트를 한 번에 저장
            staffRepository.saveAll(staffs);
            System.out.println("직원 데이터 생성 완료! 총 " + staffs.size() + "명의 직원이 추가되었습니다.");
        } else {
            System.out.println("직원 데이터가 이미 존재합니다. 초기화를 건너뜁니다.");
        }
    }
}
