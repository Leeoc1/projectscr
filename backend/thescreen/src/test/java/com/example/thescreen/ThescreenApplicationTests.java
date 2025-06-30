package com.example.thescreen;

import com.example.thescreen.entity.Staff;
import com.example.thescreen.repository.StaffRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
class ThescreenApplicationTests {
	
	@Autowired
	StaffRepository staffRepository;

	@Test
	@Transactional
	@Rollback(false)
	public void testData() {
		List<Staff> staffs = Arrays.asList(
				new Staff("EMP001", "김민수", "운영팀", "매니저", "010-1234-5678", "minsu.kim@cinema.com", "강남점", LocalDate.parse("2023-01-15"), "풀타임", "지점 관리", "근무중"),
				new Staff("EMP002", "이서연", "고객서비스팀", "대리", "010-2345-6789", "seoyeon.lee@cinema.com", "강남점", LocalDate.parse("2023-06-01"), "풀타임", "매표", "근무중"),
				new Staff("EMP003", "박지훈", "운영팀", "사원", "010-3456-7890", "jihoon.park@cinema.com", "여의도점", LocalDate.parse("2024-03-10"), "파트타임", "안내", "휴가"),
				new Staff("EMP004", "최유진", "매점팀", "사원", "010-4567-8901", "yujin.choi@cinema.com", "강남점", LocalDate.parse("2024-07-20"), "파트타임", "매점 판매", "근무중"),
				new Staff("EMP005", "강현우", "상영관팀", "대리", "010-5678-9012", "hyunwoo.kang@cinema.com", "여의도점", LocalDate.parse("2022-11-05"), "풀타임", "상영관 관리", "퇴근"),
				new Staff("EMP006", "정소연", "고객서비스팀", "사원", "010-6789-0123", "soyeon.jung@cinema.com", "신촌점", LocalDate.parse("2023-09-12"), "파트타임", "고객 응대", "근무중"),
				new Staff("EMP007", "오태현", "운영팀", "매니저", "010-7890-1234", "taehyun.oh@cinema.com", "신촌점", LocalDate.parse("2021-04-01"), "풀타임", "지점 관리", "퇴사"),
				new Staff("EMP008", "한지민", "매점팀", "사원", "010-8901-2345", "jimin.han@cinema.com", "강남점", LocalDate.parse("2024-02-14"), "파트타임", "매점 판매", "근무중"),
				new Staff("EMP009", "윤도현", "상영관팀", "사원", "010-9012-3456", "dohyun.yoon@cinema.com", "여의도점", LocalDate.parse("2023-12-01"), "풀타임", "상영관 관리", "휴가"),
				new Staff("EMP010", "서민재", "고객서비스팀", "대리", "010-0123-4567", "minjae.seo@cinema.com", "신촌점", LocalDate.parse("2022-08-20"), "풀타임", "매표", "근무중"),
				new Staff("EMP011", "김하늘", "매점팀", "사원", "010-1122-3344", "haneul.kim@cinema.com", "홍대점", LocalDate.parse("2024-05-10"), "파트타임", "매점 판매", "퇴근"),
				new Staff("EMP012", "이준호", "상영관팀", "사원", "010-2233-4455", "junho.lee@cinema.com", "명동점", LocalDate.parse("2023-03-22"), "풀타임", "상영관 관리", "근무중"),
				new Staff("EMP013", "박소영", "고객서비스팀", "사원", "010-3344-5566", "soyoung.park@cinema.com", "홍대점", LocalDate.parse("2024-01-15"), "파트타임", "고객 응대", "휴가"),
				new Staff("EMP014", "최민혁", "운영팀", "대리", "010-4455-6677", "minhyuk.choi@cinema.com", "강남점", LocalDate.parse("2022-07-01"), "풀타임", "운영 지원", "근무중"),
				new Staff("EMP015", "강지윤", "매점팀", "사원", "010-5566-7788", "jiyoon.kang@cinema.com", "여의도점", LocalDate.parse("2024-06-05"), "파트타임", "매점 판매", "근무중"),
				new Staff("EMP016", "정우진", "상영관팀", "사원", "010-6677-8899", "woojin.jung@cinema.com", "신촌점", LocalDate.parse("2023-11-20"), "풀타임", "상영관 관리", "근무중"),
				new Staff("EMP017", "오세진", "고객서비스팀", "대리", "010-7788-9900", "sejin.oh@cinema.com", "명동점", LocalDate.parse("2022-09-10"), "풀타임", "매표", "휴가"),
				new Staff("EMP018", "한수민", "매점팀", "사원", "010-8899-0011", "sumin.han@cinema.com", "강남점", LocalDate.parse("2024-04-01"), "파트타임", "매점 판매", "휴가"),
				new Staff("EMP019", "윤지성", "운영팀", "매니저", "010-9900-1122", "jisung.yoon@cinema.com", "홍대점", LocalDate.parse("2021-06-15"), "풀타임", "지점 관리", "퇴사"),
				new Staff("EMP020", "서예린", "고객서비스팀", "사원", "010-0011-2233", "yerin.seo@cinema.com", "여의도점", LocalDate.parse("2023-10-05"), "파트타임", "고객 응대", "퇴근"),
				new Staff("EMP021", "김지우", "상영관팀", "사원", "010-1122-4455", "jiwoo.kim@cinema.com", "신촌점", LocalDate.parse("2024-02-20"), "파트타임", "상영관 관리", "근무중"),
				new Staff("EMP022", "이도윤", "매점팀", "사원", "010-2233-5566", "doyoon.lee@cinema.com", "명동점", LocalDate.parse("2024-08-01"), "파트타임", "매점 판매", "근무중"),
				new Staff("EMP023", "박하린", "고객서비스팀", "대리", "010-3344-6677", "harin.park@cinema.com", "강남점", LocalDate.parse("2022-12-10"), "풀타임", "매표", "근무중"),
				new Staff("EMP024", "최태민", "운영팀", "사원", "010-4455-7788", "taemin.choi@cinema.com", "홍대점", LocalDate.parse("2023-05-15"), "풀타임", "운영 지원", "퇴근"),
				new Staff("EMP025", "강서준", "상영관팀", "사원", "010-5566-8899", "seojun.kang@cinema.com", "여의도점", LocalDate.parse("2024-03-01"), "파트타임", "상영관 관리", "휴가"),
				new Staff("EMP026", "정민아", "매점팀", "사원", "010-6677-9900", "mina.jung@cinema.com", "신촌점", LocalDate.parse("2024-07-10"), "파트타임", "매점 판매", "근무중"),
				new Staff("EMP027", "오현서", "고객서비스팀", "사원", "010-7788-0011", "hyunseo.oh@cinema.com", "명동점", LocalDate.parse("2023-08-20"), "풀타임", "고객 응대", "근무중"),
				new Staff("EMP028", "한지호", "운영팀", "대리", "010-8899-1122", "jiho.han@cinema.com", "강남점", LocalDate.parse("2022-05-01"), "풀타임", "운영 지원", "근무중"),
				new Staff("EMP029", "윤서하", "매점팀", "사원", "010-9900-2233", "seoha.yoon@cinema.com", "홍대점", LocalDate.parse("2024-04-15"), "파트타임", "매점 판매", "퇴근"),
				new Staff("EMP030", "서은채", "고객서비스팀", "사원", "010-0011-3344", "eunchae.seo@cinema.com", "여의도점", LocalDate.parse("2023-11-01"), "파트타임", "고객 응대", "휴가"),
				new Staff("EMP031", "김태영", "상영관팀", "사원", "010-1122-5566", "taeyoung.kim@cinema.com", "신촌점", LocalDate.parse("2024-01-20"), "풀타임", "상영관 관리", "근무중"),
				new Staff("EMP032", "이수현", "매점팀", "사원", "010-2233-6677", "suhyun.lee@cinema.com", "명동점", LocalDate.parse("2024-06-10"), "파트타임", "매점 판매", "근무중"),
				new Staff("EMP033", "박건우", "운영팀", "매니저", "010-3344-7788", "gunwoo.park@cinema.com", "강남점", LocalDate.parse("2021-03-01"), "풀타임", "지점 관리", "퇴사"),
				new Staff("EMP034", "최예나", "고객서비스팀", "대리", "010-4455-8899", "yena.choi@cinema.com", "홍대점", LocalDate.parse("2022-10-15"), "풀타임", "매표", "근무중"),
				new Staff("EMP035", "강민서", "상영관팀", "사원", "010-5566-9900", "minseo.kang@cinema.com", "여의도점", LocalDate.parse("2023-07-01"), "파트타임", "상영관 관리", "근무중"),
				new Staff("EMP036", "정유나", "매점팀", "사원", "010-6677-0011", "yuna.jung@cinema.com", "신촌점", LocalDate.parse("2024-05-20"), "파트타임", "매점 판매", "근무중"),
				new Staff("EMP037", "오지훈", "고객서비스팀", "사원", "010-7788-1122", "jihun.oh@cinema.com", "명동점", LocalDate.parse("2023-09-01"), "풀타임", "고객 응대", "퇴근"),
				new Staff("EMP038", "한예진", "운영팀", "대리", "010-8899-2233", "yejin.han@cinema.com", "강남점", LocalDate.parse("2022-06-10"), "풀타임", "운영 지원", "근무중"),
				new Staff("EMP039", "윤하준", "매점팀", "사원", "010-9900-3344", "hajun.yoon@cinema.com", "홍대점", LocalDate.parse("2024-03-15"), "파트타임", "매점 판매", "휴가"),
				new Staff("EMP040", "서도현", "상영관팀", "사원", "010-0011-4455", "dohyun.seo@cinema.com", "여의도점", LocalDate.parse("2023-12-10"), "풀타임", "상영관 관리", "근무중"),
				new Staff("EMP041", "김소희", "고객서비스팀", "사원", "010-1122-6677", "sohee.kim@cinema.com", "신촌점", LocalDate.parse("2024-02-01"), "파트타임", "고객 응대", "근무중"),
				new Staff("EMP042", "이재민", "매점팀", "사원", "010-2233-7788", "jaemin.lee@cinema.com", "명동점", LocalDate.parse("2024-07-15"), "파트타임", "매점 판매", "퇴근"),
				new Staff("EMP043", "박시우", "운영팀", "사원", "010-3344-8899", "siwoo.park@cinema.com", "강남점", LocalDate.parse("2023-04-01"), "풀타임", "운영 지원", "근무중"),
				new Staff("EMP044", "최윤서", "고객서비스팀", "대리", "010-4455-9900", "yunseo.choi@cinema.com", "홍대점", LocalDate.parse("2022-11-20"), "풀타임", "매표", "근무중"),
				new Staff("EMP045", "강하영", "상영관팀", "사원", "010-5566-0011", "hayoung.kang@cinema.com", "여의도점", LocalDate.parse("2024-01-10"), "파트타임", "상영관 관리", "휴가"),
				new Staff("EMP046", "정민재", "매점팀", "사원", "010-6677-1122", "minjae.jung@cinema.com", "신촌점", LocalDate.parse("2024-06-01"), "파트타임", "매점 판매", "근무중"),
				new Staff("EMP047", "오수진", "고객서비스팀", "사원", "010-7788-2233", "sujin.oh@cinema.com", "명동점", LocalDate.parse("2023-10-15"), "풀타임", "고객 응대", "퇴근"),
				new Staff("EMP048", "한도윤", "운영팀", "매니저", "010-8899-3344", "doyoon.han@cinema.com", "강남점", LocalDate.parse("2021-05-01"), "풀타임", "지점 관리", "퇴사"),
				new Staff("EMP049", "윤예린", "매점팀", "사원", "010-9900-4455", "yerin.yoon@cinema.com", "홍대점", LocalDate.parse("2024-04-20"), "파트타임", "매점 판매", "근무중"),
				new Staff("EMP050", "서하준", "상영관팀", "사원", "010-0011-5566", "hajun.seo@cinema.com", "여의도점", LocalDate.parse("2023-08-01"), "풀타임", "상영관 관리", "근무중")
				);

		// 데이터 저장
		staffRepository.saveAll(staffs);
	}


}
