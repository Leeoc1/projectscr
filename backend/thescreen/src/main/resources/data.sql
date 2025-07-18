-- Notice 가데이터 생성
INSERT IGNORE INTO notice (noticenum, noticetype, noticesub, noticedate, noticecontents, writer) VALUES
  (1, '공지', '시스템 점검 안내', '2025-07-01 10:00:00', '시스템 점검 일정 안내입니다.', 'admin'),
  (2, '공지', '이용약관 개정', '2025-07-02 09:30:00', '이용약관이 변경되었습니다.', 'admin'),
  (3, '이벤트', '여름 할인 이벤트', '2025-07-03 14:00:00', '여름 시즌 할인 이벤트!', 'event_manager'),
  (4, '이벤트', '신규 회원 이벤트', '2025-07-04 15:00:00', '신규 가입 시 쿠폰 증정!', 'event_manager'),
  (5, '문의', '예매 취소 문의', '2025-07-05 11:20:00', '예매 취소 방법?', 'user01'),
  (6, '문의', '포인트 문의', '2025-07-05 13:40:00', '포인트 확인 방법?', 'user02'),
  (7, '문의', '좌석 오류 문의', '2025-07-06 16:00:00', '좌석 선택이 안됩니다.', 'user03'),
  (8, '문의', '결제 오류 문의', '2025-07-06 17:30:00', '결제 오류 발생.', 'user04'),
  (9, '문의', '로그인 문제 문의', '2025-07-07 09:10:00', '로그인 안됩니다.', 'user05'),
  (10, '점검', '정기 점검 안내', '2025-07-08 00:00:00', '정기 점검 예정.', 'admin'),
  (11, '점검', '긴급 점검 공지', '2025-07-08 02:30:00', '긴급 점검 안내.', 'admin'),
  (12, '공지', '상영시간 변경 안내', '2025-07-09 10:00:00', '영화 상영시간 변경.', 'admin'),
  (13, '공지', '서비스 정책 변경', '2025-07-09 11:00:00', '정책 일부 변경.', 'admin'),
  (14, '공지', '회원 혜택 안내', '2025-07-10 09:30:00', '등급별 혜택 안내.', 'admin'),
  (15, '공지', '앱 업데이트 공지', '2025-07-10 14:00:00', '앱을 최신 버전으로 업데이트.', 'admin');

-- FAQ 가데이터 생성
INSERT IGNORE INTO faq (faqnum, faqsub, faqdate, faqcontents) VALUES
    (1, '회원가입은 어떻게 하나요?', '2025-07-01 09:00:00', '홈페이지에서 가입할 수 있습니다.'),
    (2, '비밀번호를 잊어버렸어요.', '2025-07-01 10:00:00', '비밀번호 찾기 기능을 이용하세요.'),
    (3, '예매한 영화는 어디서 확인하나요?', '2025-07-02 11:00:00', '마이페이지 > 예매내역에서 확인하세요.'),
    (4, '예매 취소는 어떻게 하나요?', '2025-07-02 12:30:00', '마이페이지에서 예매 취소 가능합니다.'),
    (5, '포인트 적립은 어떻게 되나요?', '2025-07-03 13:00:00', '결제 시 포인트가 적립됩니다.'),
    (6, '쿠폰은 어디서 사용하나요?', '2025-07-03 14:00:00', '결제 단계에서 쿠폰을 사용할 수 있습니다.'),
    (7, '좌석 변경은 가능한가요?', '2025-07-04 15:30:00', '좌석 변경은 불가능하며 취소 후 재예매 해주세요.'),
    (8, '문의사항은 어디서 남기나요?', '2025-07-04 16:30:00', '고객센터에서 문의하실 수 있습니다.'),
    (9, '모바일 티켓 발급 방법은?', '2025-07-05 17:00:00', '예매 완료 후 문자로 발급됩니다.'),
    (10, '관람 등급은 어디서 확인하나요?', '2025-07-05 18:00:00', '영화 상세 페이지에서 확인 가능합니다.');

-- 결제(payment) 가데이터 15개 생성
DROP TEMPORARY TABLE IF EXISTS temp_numbers;
CREATE TEMPORARY TABLE temp_numbers (n INT);
INSERT INTO temp_numbers (n)
SELECT a.N + 1
FROM (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION
      SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION
      SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14) a;

INSERT IGNORE INTO payment (
    paymentcd,
    paymentmethod,
    paymenttime,
    amount,
    paymentstatus
)
SELECT
    CONCAT('PAY', LPAD(n, 3, '0')),
    ELT(FLOOR(1 + (RAND() * 4)), '카카오 뱅크', '농협', '토스페이', '네이버 페이'),
    DATE_ADD('2025-07-01', INTERVAL FLOOR(RAND()*7) DAY) + INTERVAL FLOOR(RAND()*24) HOUR + INTERVAL FLOOR(RAND()*60) MINUTE,
    ELT(FLOOR(1 + (RAND() * 3)), 10000, 20000, 30000),
    '결제 완료'
FROM temp_numbers;

-- 예약(reservation) 가데이터 300개 생성
DROP TEMPORARY TABLE IF EXISTS temp_numbers;
CREATE TEMPORARY TABLE temp_numbers (n INT);

INSERT INTO temp_numbers (n)
SELECT (a.N + b.N * 10 + c.N * 100 + 1) AS num
FROM (
         SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION
         SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9
     ) a,
     (
         SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION
         SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9
     ) b,
     (
         SELECT 0 AS N UNION SELECT 1 UNION SELECT 2
     ) c
WHERE (a.N + b.N * 10 + c.N * 100 + 1) <= 300;

INSERT IGNORE INTO reservation (
    reservationcd,
    userid,
    schedulecd,
    reservationtime,
    reservationstatus,
    seatcd,
    paymentcd
)
SELECT
    CONCAT(LPAD(n, 12, '0')),
    CONCAT('user', LPAD(FLOOR(1 + (RAND() * 50)), 3, '0')),
    (SELECT schedulecd FROM schedule ORDER BY RAND() LIMIT 1),
    DATE_ADD('2025-07-13', INTERVAL FLOOR(RAND()*13) DAY)
      + INTERVAL FLOOR(RAND()*24) HOUR + INTERVAL FLOOR(RAND()*60) MINUTE,
    IF(RAND() < 0.5, '예약완료', '예약취소'),
    CONCAT(CHAR(65 + FLOOR(RAND()*10)), LPAD(FLOOR(1 + (RAND()*10)), 2, '0')),
    CONCAT('PAY', LPAD(FLOOR(1 + (RAND()*15)), 3, '0'))
FROM temp_numbers;

-- 사용자(users) 가데이터 200개 생성
DROP TEMPORARY TABLE IF EXISTS temp_numbers;
CREATE TEMPORARY TABLE temp_numbers (n INT);
INSERT INTO temp_numbers (n)
SELECT a.N + b.N * 10 + 1
FROM (
         SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9
     ) a,
     (
         SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9
     ) b
WHERE a.N + b.N * 10 + 1 <= 200;

INSERT IGNORE INTO users (
    userid,
    userpw,
    username,
    email,
    phone,
    birth,
    status,
    reg_date
)
SELECT
    CONCAT('user', LPAD(n, 3, '0')),
    CONCAT('pass_', LPAD(n, 3, '0')),
    CONCAT('테스트', n, '번'),
    CONCAT('user', n, '@example.com'),
    CONCAT('010-', LPAD(FLOOR(RAND()*9000)+1000, 4, '0'), '-', LPAD(FLOOR(RAND()*9000)+1000, 4, '0')),
    DATE_ADD('1980-01-01', INTERVAL FLOOR(RAND()*9000) DAY),
    '활성',
    DATE_ADD('2025-07-10', INTERVAL FLOOR(RAND()*6) DAY)
FROM temp_numbers;

-- staff 가데이터 30개 생성
DROP TEMPORARY TABLE IF EXISTS temp_numbers;
CREATE TEMPORARY TABLE temp_numbers (n INT);
INSERT INTO temp_numbers (n)
SELECT a.N + 1
FROM (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION
      SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION
      SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14
      UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19
      UNION SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24
      UNION SELECT 25 UNION SELECT 26 UNION SELECT 27 UNION SELECT 28 UNION SELECT 29
     ) a;

INSERT IGNORE INTO staff (
    staffid,
    staffname,
    dept,
    position,
    phone,
    email,
    theater,
    hiredate,
    shifttype,
    role,
    status
)
SELECT
    CONCAT('staff', LPAD(n, 3, '0')),
    CONCAT('직원', n, '번'),
    ELT(FLOOR(1 + (RAND() * 5)), '운영팀', '고객서비스', '매표팀', '상영관팀', '매점팀'),
    ELT(FLOOR(1 + (RAND() * 3)), '사원', '대리', '매니저'),
    CONCAT('010-', LPAD(FLOOR(RAND()*9000)+1000, 4, '0'), '-', LPAD(FLOOR(RAND()*9000)+1000, 4, '0')),
    CONCAT('staff', n, '@example.com'),
    ELT(FLOOR(1 + (RAND() * 8)), 'THR001', 'THR002', 'THR003', 'THR004', 'THR005', 'THR006', 'THR007', 'THR008'),
    DATE_ADD('2000-01-01', INTERVAL FLOOR(RAND()*9000) DAY),
    ELT(FLOOR(1 + (RAND() * 2)), '주간', '야간'),
    ELT(FLOOR(1 + (RAND() * 5)), '지점 관리', '고객 응대', '매표', '상영관 관리', '매점 판매'),
    ELT(FLOOR(1 + (RAND() * 2)), '근무중', '휴가')
FROM temp_numbers;

-- 스케줄(schedule) 가데이터 (영화 200개 × 각 20개씩)
-- 기존 temp_nums 테이블 삭제 및 생성
-- 기존 temp_nums 테이블 삭제 및 생성
DROP TEMPORARY TABLE IF EXISTS temp_nums;
CREATE TEMPORARY TABLE temp_nums (n INT);
INSERT INTO temp_nums (n)
SELECT a.N + 1
FROM (
    SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION
    SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION
    SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION
    SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION
    SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24 UNION
    SELECT 25 UNION SELECT 26 UNION SELECT 27 UNION SELECT 28 UNION SELECT 29 UNION
    SELECT 30 UNION SELECT 31 UNION SELECT 32 UNION SELECT 33 UNION SELECT 34 UNION
    SELECT 35 UNION SELECT 36 UNION SELECT 37 UNION SELECT 38 UNION SELECT 39 UNION
    SELECT 40 UNION SELECT 41 UNION SELECT 42 UNION SELECT 43 UNION SELECT 44 UNION
    SELECT 45 UNION SELECT 46 UNION SELECT 47 UNION SELECT 48 UNION SELECT 49 UNION
    SELECT 50 UNION SELECT 51 UNION SELECT 52 UNION SELECT 53 UNION SELECT 54 UNION
    SELECT 55 UNION SELECT 56 UNION SELECT 57 UNION SELECT 58 UNION SELECT 59 UNION
    SELECT 60 UNION SELECT 61 UNION SELECT 62 UNION SELECT 63 UNION SELECT 64 UNION
    SELECT 65 UNION SELECT 66 UNION SELECT 67 UNION SELECT 68 UNION SELECT 69 UNION
    SELECT 70 UNION SELECT 71 UNION SELECT 72 UNION SELECT 73 UNION SELECT 74 UNION
    SELECT 75 UNION SELECT 76 UNION SELECT 77 UNION SELECT 78 UNION SELECT 79 UNION
    SELECT 80 UNION SELECT 81 UNION SELECT 82 UNION SELECT 83 UNION SELECT 84 UNION
    SELECT 85 UNION SELECT 86 UNION SELECT 87 UNION SELECT 88 UNION SELECT 89 UNION
    SELECT 90 UNION SELECT 91 UNION SELECT 92 UNION SELECT 93 UNION SELECT 94 UNION
    SELECT 95 UNION SELECT 96 UNION SELECT 97 UNION SELECT 98 UNION SELECT 99
) a;

-- schedule 테이블에 데이터 삽입
INSERT IGNORE INTO schedule (
    schedulecd, moviecd, screencd, startdate, starttime, endtime
)
-- 1. movierank가 NULL이 아닌 영화들로 1000개 데이터 생성 (영화 10개 * 각 100개)
SELECT
    CONCAT('SCH', LPAD((m.idx - 1) * 100 + t.n, 4, '0')) AS schedulecd,
    m.moviecd,
    (SELECT screencd FROM screen ORDER BY RAND() LIMIT 1) AS screencd,
    DATE_ADD(CURRENT_DATE(), INTERVAL FLOOR(RAND() * 7) DAY) AS startdate,
    SEC_TO_TIME(FLOOR(RAND() * (12 * 3600)) + (8 * 3600)) AS starttime,
    ADDTIME(
        SEC_TO_TIME(FLOOR(RAND() * (12 * 3600)) + (8 * 3600)),
        SEC_TO_TIME(FLOOR(RAND() * 61 + 90) * 60 + 30 * 60)
    ) AS endtime
FROM (
    SELECT moviecd, ROW_NUMBER() OVER () AS idx
    FROM view_movie_with_rank
    WHERE movieinfo = 'Y' AND movierank IS NOT NULL
    LIMIT 10
) m
CROSS JOIN (
    SELECT n FROM temp_nums WHERE n <= 100
) t
LIMIT 1000;

-- 2. movieinfo가 'Y'인 영화들 중 랜덤으로 3000개 데이터 생성
INSERT IGNORE INTO schedule (
    schedulecd, moviecd, screencd, startdate, starttime, endtime
)
SELECT
    CONCAT('SCH', LPAD(1000 + (m.idx - 1) * 100 + t.n, 4, '0')) AS schedulecd,
    m.moviecd,
    (SELECT screencd FROM screen ORDER BY RAND() LIMIT 1) AS screencd,
    DATE_ADD(CURRENT_DATE(), INTERVAL FLOOR(RAND() * 7) DAY) AS startdate,
    SEC_TO_TIME(FLOOR(RAND() * (12 * 3600)) + (8 * 3600)) AS starttime,
    ADDTIME(
        SEC_TO_TIME(FLOOR(RAND() * (12 * 3600)) + (8 * 3600)),
        SEC_TO_TIME(FLOOR(RAND() * 61 + 90) * 60 + 30 * 60)
    ) AS endtime
FROM (
    SELECT moviecd, ROW_NUMBER() OVER () AS idx
    FROM view_movie_with_rank
    WHERE movieinfo = 'Y'
    ORDER BY RAND()
    LIMIT 30
) m
CROSS JOIN (
    SELECT n FROM temp_nums WHERE n <= 100
) t
LIMIT 3000;