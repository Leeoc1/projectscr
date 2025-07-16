-- Region 데이터 삽입
INSERT IGNORE INTO
    region (regioncd, regionnm)
VALUES ('01', '서울'),
    ('02', '인천'),
    ('03', '대전'),
    ('04', '대구'),
    ('05', '광주'),
    ('06', '울산'),
    ('07', '부산'),
    ('08', '경기'),
    ('09', '강원'),
    ('10', '충북'),
    ('11', '충남'),
    ('12', '경북'),
    ('13', '경남'),
    ('14', '전북'),
    ('15', '전남'),
    ('16', '제주');

-- Cinema 데이터 삽입
INSERT IGNORE INTO
    cinema (
        cinemacd,
        cinemanm,
        address,
        tel,
        status,
        regioncd
    )
VALUES (
        'THR001',
        '시네맥스 강남점',
        '서울특별시 강남구 테헤란로 123',
        '02-1234-5678',
        '정상',
        '01'
    ),
    (
        'THR002',
        '시네맥스 잠실점',
        '서울특별시 송파구 올림픽로 240',
        '02-2345-6789',
        '정상',
        '01'
    ),
    (
        'THR003',
        '시네맥스 부산점',
        '부산광역시 부산진구 중앙대로 668',
        '051-3456-7890',
        '점검중',
        '07'
    ),
    (
        'THR004',
        '시네맥스 여의도점',
        '서울특별시 영등포구 여의대로 108',
        '02-4567-8901',
        '정상',
        '01'
    ),
    (
        'THR005',
        '시네맥스 대구점',
        '대구광역시 중구 동성로 2길 80',
        '053-5678-9012',
        '정상',
        '04'
    ),
    (
        'THR006',
        '시네맥스 인천점',
        '인천광역시 중구 제물량로 266',
        '032-6789-0123',
        '정상',
        '02'
    ),
    (
        'THR007',
        '시네맥스 분당점',
        '경기도 성남시 분당구 정자로 178',
        '031-7890-1234',
        '정상',
        '08'
    ),
    (
        'THR008',
        '시네맥스 대전점',
        '대전광역시 중구 중앙로 100',
        '042-8901-2345',
        '정상',
        '03'
    );

-- Screen 데이터 삽입
INSERT IGNORE INTO
    screen (
        screencd,
        screenname,
        screentype,
        allseat,
        reservationseat,
        screenstatus,
        cinemacd
    )
VALUES (
        'SCR001',
        '1관',
        '2D',
        120,
        0,
        '운영중',
        'THR001'
    ),
    (
        'SCR002',
        '1관',
        '3D',
        90,
        10,
        '운영중',
        'THR001'
    ),
    (
        'SCR003',
        '1관',
        'IMAX',
        150,
        0,
        '운영중',
        'THR002'
    ),
    (
        'SCR004',
        '1관',
        '4DX',
        100,
        5,
        '운영중',
        'THR002'
    ),
    (
        'SCR005',
        '2관',
        '2D',
        110,
        0,
        '운영중',
        'THR003'
    ),
    (
        'SCR006',
        '2관',
        '3D',
        95,
        0,
        '운영중',
        'THR003'
    ),
    (
        'SCR007',
        '2관',
        'IMAX',
        130,
        20,
        '운영중',
        'THR004'
    ),
    (
        'SCR008',
        '2관',
        '4DX',
        85,
        0,
        '운영중',
        'THR004'
    ),
    (
        'SCR009',
        '3관',
        '2D',
        115,
        0,
        '운영중',
        'THR005'
    ),
    (
        'SCR010',
        '3관',
        '3D',
        80,
        15,
        '운영중',
        'THR005'
    ),
    (
        'SCR011',
        '4관',
        '2D',
        105,
        0,
        '운영중',
        'THR006'
    ),
    (
        'SCR012',
        '3관',
        '4DX',
        90,
        0,
        '운영중',
        'THR006'
    ),
    (
        'SCR013',
        '3관',
        'IMAX',
        140,
        0,
        '운영중',
        'THR007'
    ),
    (
        'SCR014',
        '5관',
        '2D',
        100,
        5,
        '운영중',
        'THR007'
    ),
    (
        'SCR015',
        '4관',
        '3D',
        95,
        0,
        '운영중',
        'THR008'
    );

-- -- Movie 데이터 삽입
-- INSERT IGNORE INTO
--     movie (
--         moviecd,
--         movienm,
--         description,
--         genre,
--         director,
--         actors,
--         runningtime,
--         releasedate,
--         posterurl,
--         isadult
--     )
-- VALUES (
--         'MOV001',
--         '드래곤 길들이기',
--         '드래곤과 인간의 우정을 그린 판타지 애니메이션',
--         '애니메이션',
--         '딘 데블로이스',
--         '제이 바루첼, 아메리카 페레라',
--         98,
--         '2010-03-26',
--         '/images/Dragon.png',
--         'N'
--     ),
--     (
--         'MOV002',
--         '인터스텔라',
--         '우주를 배경으로 한 SF 드라마',
--         'SF',
--         '크리스토퍼 놀란',
--         '매튜 맥커너히, 앤 해서웨이',
--         169,
--         '2014-11-06',
--         '/images/cloud.jpg',
--         'N'
--     ),
--     (
--         'MOV003',
--         '어벤져스: 엔드게임',
--         '마블 시리즈의 대단원',
--         '액션',
--         '루소 형제',
--         '로버트 다우니 주니어, 크리스 에반스',
--         181,
--         '2019-04-24',
--         '/images/Hifive.png',
--         'N'
--     ),
--     (
--         'MOV004',
--         '기생충',
--         '한국 영화의 새로운 전설',
--         '드라마',
--         '봉준호',
--         '송강호, 이선균',
--         132,
--         '2019-05-30',
--         '/images/Tiger.png',
--         'N'
--     ),
--     (
--         'MOV005',
--         '조커',
--         'DC 코믹스의 악역을 다룬 심리 드라마',
--         '드라마',
--         '토드 필립스',
--         '호아킨 피닉스',
--         122,
--         '2019-10-02',
--         '/images/Noise.png',
--         'Y'
--     ),
--     (
--         'MOV006',
--         '나우시카',
--         '미야자키 하야오의 걸작 애니메이션',
--         '애니메이션',
--         '미야자키 하야오',
--         '성우: 나가시마 유키',
--         116,
--         '1984-03-11',
--         '/images/Nausicaa.png',
--         'N'
--     ),
--     (
--         'MOV007',
--         '엘리오',
--         '픽사 애니메이션',
--         '애니메이션',
--         '에이드리언 몰리나',
--         '성우: 유니스 에이',
--         102,
--         '2024-03-01',
--         '/images/Elio.png',
--         'N'
--     ),
--     (
--         'MOV008',
--         'F1 더 무비',
--         'F1 레이싱을 다룬 액션 영화',
--         '액션',
--         '조셉 코신스키',
--         '브래드 피트, 루이스 해밀턴',
--         138,
--         '2024-07-05',
--         '/images/F1_TheMovie.png',
--         'N'
--     ),
--     (
--         'MOV009',
--         '28년 후',
--         '좀비 아포칼립스 영화',
--         '스릴러',
--         '대니 보일',
--         '킬리언 머피, 나오미 해리스',
--         145,
--         '2024-06-28',
--         '/images/28Years.png',
--         'Y'
--     ),
--     (
--         'MOV010',
--         '퓨러루',
--         '일본 애니메이션',
--         '애니메이션',
--         '신보 마코토',
--         '성우: 카미야 히로시',
--         108,
--         '2024-04-12',
--         '/images/Fureru.png',
--         'N'
--     ),
--     (
--         'MOV011',
--         '아바타 3',
--         '제임스 카메론의 SF 시리즈 3편',
--         'SF',
--         '제임스 카메론',
--         '샘 워싱턴, 조 샐다나',
--         180,
--         '2026-12-18',
--         '/images/28Years.png',
--         'N'
--     ),
--     (
--         'MOV012',
--         '스파이더맨: 비욘드 더 유니버스',
--         '애니메이션 스파이더맨 시리즈',
--         '애니메이션',
--         '호아킴 도스 산토스',
--         '샤메익 무어, 헤일리 스타인펠드',
--         120,
--         '2026-03-29',
--         '/images/Elio.png',
--         'N'
--     ),
--     (
--         'MOV013',
--         '토이스토리 5',
--         '픽사의 클래식 애니메이션 시리즈',
--         '애니메이션',
--         '앤드류 스탠턴',
--         '톰 행크스, 팀 앨런',
--         95,
--         '2026-06-19',
--         '/images/Dragon.png',
--         'N'
--     ),
--     (
--         'MOV014',
--         '블랙 팬서: 와칸다 포에버',
--         '마블 시리즈의 새로운 챕터',
--         '액션',
--         '라이언 쿠글러',
--         '레티샤 라이트, 댄게라',
--         150,
--         '2026-07-24',
--         '/images/Hifive.png',
--         'N'
--     ),
--     (
--         'MOV015',
--         '인디아나 존스 6',
--         '해리슨 포드의 마지막 인디아나 존스',
--         '어드벤처',
--         '제임스 맨골드',
--         '해리슨 포드, 피비 월러브리지',
--         140,
--         '2026-06-30',
--         '/images/Tiger.png',
--         'N'
--     ),
--     (
--         'MOV016',
--         '미션 임파서블 8',
--         '톰 크루즈의 액션 시리즈',
--         '액션',
--         '크리스토퍼 맥쿼리',
--         '톰 크루즈, 레베카 퍼거슨',
--         155,
--         '2026-06-28',
--         '/images/Noise.png',
--         'N'
--     ),
--     (
--         'MOV017',
--         '쥬라기 월드: 새로운 시대',
--         '공룡 시리즈의 새로운 시작',
--         '액션',
--         '가레스 에드워즈',
--         '스카를렛 요한슨, 조나단 베일리',
--         135,
--         '2026-07-02',
--         '/images/F1_TheMovie.png',
--         'N'
--     ),
--     (
--         'MOV018',
--         '데드풀 3',
--         '마블의 액션 코미디 시리즈',
--         '액션',
--         '숀 레비',
--         '라이언 레이놀즈, 휴 잭맨',
--         130,
--         '2026-09-06',
--         '/images/cloud.jpg',
--         'Y'
--     ),
--     (
--         'MOV019',
--         '스타워즈: 새로운 제다이',
--         '스타워즈 시리즈의 새로운 챕터',
--         'SF',
--         '샤민 오바이드-친노이',
--         '데이지 리들리, 아담 드라이버',
--         145,
--         '2026-12-17',
--         '/images/Nausicaa.png',
--         'N'
--     ),
--     (
--         'MOV020',
--         '트랜스포머: 새로운 시작',
--         '트랜스포머 시리즈의 리부트',
--         '액션',
--         '스티븐 카프리',
--         '앤서니 라모스, 도미닉 피셔',
--         140,
--         '2026-06-27',
--         '/images/Fureru.png',
--         'N'
--     );

-- Schedule 데이터 삽입

-- 1. 숫자 시퀀스 생성을 위한 임시 테이블
CREATE TEMPORARY TABLE numbers (n INT);
INSERT INTO numbers (n)
SELECT a.N + b.N * 10 + c.N * 100 + d.N * 1000 + 1
FROM
    (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) a,
    (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) b,
    (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) c,
    (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3) d
WHERE a.N + b.N * 10 + c.N * 100 + d.N * 1000 + 1 <= 4000;

-- 2. 영화 및 상영관 코드 임시 테이블
CREATE TEMPORARY TABLE temp_movies (moviecd VARCHAR(20));
CREATE TEMPORARY TABLE temp_screens (screencd VARCHAR(20));

-- 영화 코드 삽입 (MOV001 ~ MOV020)
INSERT INTO temp_movies (moviecd)
SELECT CONCAT('MOV', LPAD(n, 3, '0'))
FROM numbers WHERE n <= 20;

-- 상영관 코드 삽입 (SCR001 ~ SCR015)
INSERT INTO temp_screens (screencd)
SELECT CONCAT('SCR', LPAD(n, 3, '0'))
FROM numbers WHERE n <= 15;

-- 3. 가데이터 삽입

-- 3. 가데이터 삽입 (스케줄 테이블)
-- 기존 스케줄 데이터 모두 삭제

-- 7일 × 20개씩 스케줄 데이터 생성
INSERT IGNORE INTO schedule (schedulecd, moviecd, screencd, startdate, starttime, endtime)
SELECT
    CONCAT('SCH', LPAD((d.n - 1) * 20 + s.n, 4, '0')) AS schedulecd,
    (SELECT moviecd FROM movie ORDER BY RAND() LIMIT 1) AS moviecd,
    (SELECT screencd FROM screen ORDER BY RAND() LIMIT 1) AS screencd,
    DATE_ADD(CURRENT_DATE(), INTERVAL (d.n - 1) DAY) AS startdate,
    SEC_TO_TIME(FLOOR(RAND() * (12 * 3600)) + (8 * 3600)) AS starttime,
    ADDTIME(
        SEC_TO_TIME(FLOOR(RAND() * (12 * 3600)) + (8 * 3600)),
        SEC_TO_TIME(FLOOR(RAND() * 61 + 90) * 60 + 30 * 60)
    ) AS endtime
FROM
    (SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7) d, -- 7일
    (SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
     UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20) s; -- 1일당 20개

-- 4. 임시 테이블 삭제
DROP TEMPORARY TABLE numbers;
DROP TEMPORARY TABLE temp_movies;
DROP TEMPORARY TABLE temp_screens;


INSERT IGNORE INTO
    payment (
        paymentcd,
        paymentmethod,
        paymenttime,
        amount,
        paymentstatus
    )
VALUES (
        'PAY001',
        'Credit Card',
        '2025-07-01 10:00:00',
        15000,
        'SUCCESS'
    ),
    (
        'PAY002',
        'Bank Transfer',
        '2025-07-01 12:30:00',
        25000,
        'SUCCESS'
    ),
    (
        'PAY003',
        'Mobile Payment',
        '2025-07-02 09:15:00',
        3000,
        'SUCCESS'
    ),
    (
        'PAY004',
        'Credit Card',
        '2025-07-02 14:45:00',
        45000,
        'SUCCESS'
    ),
    (
        'PAY005',
        'PayPal',
        '2025-07-03 11:20:00',
        12000,
        'SUCCESS'
    ),
    (
        'PAY006',
        'Debit Card',
        '2025-07-03 16:50:00',
        8000,
        'SUCCESS'
    ),
    (
        'PAY007',
        'Bank Transfer',
        '2025-07-04 08:10:00',
        60000,
        'SUCCESS'
    ),
    (
        'PAY008',
        'Credit Card',
        '2025-07-04 13:25:00',
        22000,
        'SUCCESS'
    ),
    (
        'PAY009',
        'Mobile Payment',
        '2025-07-05 10:40:00',
        5000,
        'SUCCESS'
    ),
    (
        'PAY010',
        'PayPal',
        '2025-07-05 15:15:00',
        35000,
        'SUCCESS'
    ),
    (
        'PAY011',
        'Credit Card',
        '2025-07-06 09:00:00',
        18000,
        'SUCCESS'
    ),
    (
        'PAY012',
        'Bank Transfer',
        '2025-07-06 12:00:00',
        40000,
        'SUCCESS'
    ),
    (
        'PAY013',
        'Debit Card',
        '2025-07-07 07:30:00',
        10000,
        'SUCCESS'
    ),
    (
        'PAY014',
        'Mobile Payment',
        '2025-07-07 11:45:00',
        27000,
        'SUCCESS'
    ),
    (
        'PAY015',
        'PayPal',
        '2025-07-07 14:20:00',
        32000,
        'SUCCESS'
    );

-- users 테이블 가데이터 (50개: 2025-07-07 30개, 2025-07-08 20개)
INSERT IGNORE INTO
    users (
        userid,
        userpw,
        username,
        email,
        phone,
        birth,
        status,
        reg_date
    )
VALUES (
        'user001',
        'pass_001',
        '김민수',
        'minsu.kim@example.com',
        '010-1234-5678',
        '1990-05-15',
        '활성',
        '2025-07-07'
    ),
    (
        'user002',
        'pass_002',
        '이서연',
        'seoyeon.lee@example.com',
        '010-2345-6789',
        '1988-11-22',
        '활성',
        '2025-07-07'
    ),
    (
        'user003',
        'pass_003',
        '박지훈',
        'jihoon.park@example.com',
        '010-3456-7890',
        '1995-03-10',
        '활성',
        '2025-07-07'
    ),
    (
        'user004',
        'pass_004',
        '최유진',
        'yujin.choi@example.com',
        '010-4567-8901',
        '1992-07-25',
        '활성',
        '2025-07-07'
    ),
    (
        'user005',
        'pass_005',
        '정하늘',
        'haneul.jung@example.com',
        '010-5678-9012',
        '1998-12-30',
        '활성',
        '2025-07-07'
    ),
    (
        'user006',
        'pass_006',
        '강다연',
        'dayeon.kang@example.com',
        '010-6789-0123',
        '1985-09-12',
        '활성',
        '2025-07-07'
    ),
    (
        'user007',
        'pass_007',
        '윤서준',
        'seojun.yoon@example.com',
        '010-7890-1234',
        '1993-04-18',
        '활성',
        '2025-07-07'
    ),
    (
        'user008',
        'pass_008',
        '한지민',
        'jimin.han@example.com',
        '010-8901-2345',
        '1991-06-22',
        '활성',
        '2025-07-07'
    ),
    (
        'user009',
        'pass_009',
        '오태현',
        'taehyun.oh@example.com',
        '010-9012-3456',
        '1987-02-14',
        '활성',
        '2025-07-07'
    ),
    (
        'user010',
        'pass_010',
        '류하린',
        'harin.ryu@example.com',
        '010-0123-4567',
        '1996-08-30',
        '활성',
        '2025-07-07'
    ),
    (
        'user011',
        'pass_011',
        '김도현',
        'dohyun.kim@example.com',
        '010-1235-5678',
        '1989-11-05',
        '활성',
        '2025-07-07'
    ),
    (
        'user012',
        'pass_012',
        '이예진',
        'yejin.lee@example.com',
        '010-2346-6789',
        '1994-03-27',
        '활성',
        '2025-07-07'
    ),
    (
        'user013',
        'pass_013',
        '박소율',
        'soyul.park@example.com',
        '010-3457-7890',
        '1997-07-19',
        '활성',
        '2025-07-07'
    ),
    (
        'user014',
        'pass_014',
        '최민재',
        'minjae.choi@example.com',
        '010-4568-8901',
        '1990-10-11',
        '활성',
        '2025-07-07'
    ),
    (
        'user015',
        'pass_015',
        '정유나',
        'yuna.jung@example.com',
        '010-5679-9012',
        '1986-05-25',
        '활성',
        '2025-07-07'
    ),
    (
        'user016',
        'pass_016',
        '강시우',
        'siwoo.kang@example.com',
        '010-6780-0123',
        '1992-12-08',
        '활성',
        '2025-07-07'
    ),
    (
        'user017',
        'pass_017',
        '윤지우',
        'jiwoo.yoon@example.com',
        '010-7891-1234',
        '1995-01-16',
        '활성',
        '2025-07-07'
    ),
    (
        'user018',
        'pass_018',
        '한서아',
        'seoa.han@example.com',
        '010-8902-2345',
        '1988-04-29',
        '활성',
        '2025-07-07'
    ),
    (
        'user019',
        'pass_019',
        '오민서',
        'minseo.oh@example.com',
        '010-9013-3456',
        '1993-09-03',
        '활성',
        '2025-07-07'
    ),
    (
        'user020',
        'pass_020',
        '류지안',
        'jian.ryu@example.com',
        '010-0124-4567',
        '1991-02-17',
        '활성',
        '2025-07-07'
    ),
    (
        'user021',
        'pass_021',
        '김하윤',
        'hayoon.kim@example.com',
        '010-1236-5678',
        '1987-06-21',
        '활성',
        '2025-07-07'
    ),
    (
        'user022',
        'pass_022',
        '이수민',
        'sumin.lee@example.com',
        '010-2347-6789',
        '1994-10-13',
        '활성',
        '2025-07-07'
    ),
    (
        'user023',
        'pass_023',
        '박예린',
        'yerin.park@example.com',
        '010-3458-7890',
        '1996-03-28',
        '활성',
        '2025-07-07'
    ),
    (
        'user024',
        'pass_024',
        '최서진',
        'seojin.choi@example.com',
        '010-4569-8901',
        '1989-08-09',
        '활성',
        '2025-07-07'
    ),
    (
        'user025',
        'pass_025',
        '정다인',
        'dain.jung@example.com',
        '010-5670-9012',
        '1992-11-24',
        '활성',
        '2025-07-07'
    ),
    (
        'user026',
        'pass_026',
        '강지윤',
        'jiyoon.kang@example.com',
        '010-6781-0123',
        '1990-04-06',
        '활성',
        '2025-07-07'
    ),
    (
        'user027',
        'pass_027',
        '윤하진',
        'hajin.yoon@example.com',
        '010-7892-1234',
        '1986-07-30',
        '활성',
        '2025-07-07'
    ),
    (
        'user028',
        'pass_028',
        '한태민',
        'taemin.han@example.com',
        '010-8903-2345',
        '1993-12-12',
        '활성',
        '2025-07-07'
    ),
    (
        'user029',
        'pass_029',
        '오서율',
        'seoyul.oh@example.com',
        '010-9014-3456',
        '1995-05-04',
        '활성',
        '2025-07-07'
    ),
    (
        'user030',
        'pass_030',
        '류민재',
        'minjae.ryu@example.com',
        '010-0125-4567',
        '1988-09-26',
        '활성',
        '2025-07-07'
    ),
    (
        'user031',
        'pass_031',
        '김아린',
        'arin.kim@example.com',
        '010-1237-5678',
        '1991-01-08',
        '활성',
        '2025-07-08'
    ),
    (
        'user032',
        'pass_032',
        '이현우',
        'hyunwoo.lee@example.com',
        '010-2348-6789',
        '1994-06-22',
        '활성',
        '2025-07-08'
    ),
    (
        'user033',
        'pass_033',
        '박소윤',
        'soyoon.park@example.com',
        '010-3459-7890',
        '1987-10-15',
        '활성',
        '2025-07-08'
    ),
    (
        'user034',
        'pass_034',
        '최지율',
        'jiyul.choi@example.com',
        '010-4560-8901',
        '1992-03-29',
        '활성',
        '2025-07-08'
    ),
    (
        'user035',
        'pass_035',
        '정하린',
        'harin.jung@example.com',
        '010-5671-9012',
        '1996-08-11',
        '활성',
        '2025-07-08'
    ),
    (
        'user036',
        'pass_036',
        '강예준',
        'yejun.kang@example.com',
        '010-6782-0123',
        '1989-12-04',
        '활성',
        '2025-07-08'
    ),
    (
        'user037',
        'pass_037',
        '윤서현',
        'seohyun.yoon@example.com',
        '010-7893-1234',
        '1993-04-17',
        '활성',
        '2025-07-08'
    ),
    (
        'user038',
        'pass_038',
        '한지수',
        'jisoo.han@example.com',
        '010-8904-2345',
        '1990-09-01',
        '활성',
        '2025-07-08'
    ),
    (
        'user039',
        'pass_039',
        '오태윤',
        'taeyoon.oh@example.com',
        '010-9015-3456',
        '1986-02-23',
        '활성',
        '2025-07-08'
    ),
    (
        'user040',
        'pass_040',
        '류다연',
        'dayeon.ryu@example.com',
        '010-0126-4567',
        '1994-07-06',
        '활성',
        '2025-07-08'
    ),
    (
        'user041',
        'pass_041',
        '김민재',
        'minjae2.kim@example.com',
        '010-1238-5678',
        '1991-11-19',
        '활성',
        '2025-07-08'
    ),
    (
        'user042',
        'pass_042',
        '이하윤',
        'hayoon2.lee@example.com',
        '010-2349-6789',
        '1988-05-12',
        '활성',
        '2025-07-08'
    ),
    (
        'user043',
        'pass_043',
        '박지민',
        'jimin2.park@example.com',
        '010-3450-7890',
        '1995-09-25',
        '활성',
        '2025-07-08'
    ),
    (
        'user044',
        'pass_044',
        '최서아',
        'seoa2.choi@example.com',
        '010-4561-8901',
        '1992-02-07',
        '활성',
        '2025-07-08'
    ),
    (
        'user045',
        'pass_045',
        '정예린',
        'yerin2.jung@example.com',
        '010-5672-9012',
        '1987-06-30',
        '활성',
        '2025-07-08'
    ),
    (
        'user046',
        'pass_046',
        '강소율',
        'soyul2.kang@example.com',
        '010-6783-0123',
        '1993-10-13',
        '활성',
        '2025-07-08'
    ),
    (
        'user047',
        'pass_047',
        '윤하린',
        'harin2.yoon@example.com',
        '010-7894-1234',
        '1990-03-27',
        '활성',
        '2025-07-08'
    ),
    (
        'user048',
        'pass_048',
        '한민서',
        'minseo2.han@example.com',
        '010-8905-2345',
        '1986-08-09',
        '활성',
        '2025-07-08'
    ),
    (
        'user049',
        'pass_049',
        '오지윤',
        'jiyoon2.oh@example.com',
        '010-9016-3456',
        '1994-12-22',
        '활성',
        '2025-07-08'
    ),
    (
        'user050',
        'pass_050',
        '류서진',
        'seojin2.ryu@example.com',
        '010-0127-4567',
        '1991-05-04',
        '활성',
        '2025-07-08'
    );

-- staff 테이블 가데이터 (30개)
INSERT IGNORE INTO
    staff (
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
VALUES (
        'staff001',
        '김영훈',
        '운영팀',
        '매니저',
        '010-1111-2222',
        'younghoon.kim@example.com',
        'THR001',
        '2023-01-15',
        '주간',
        '지점 관리',
        '근무중'
    ),
    (
        'staff002',
        '이수진',
        '고객서비스',
        '대리',
        '010-2222-3333',
        'sujin.lee@example.com',
        'THR002',
        '2023-06-20',
        '야간',
        '고객 응대',
        '근무중'
    ),
    (
        'staff003',
        '박민재',
        '매표팀',
        '사원',
        '010-3333-4444',
        'minjae.park@example.com',
        'THR003',
        '2024-02-10',
        '주간',
        '매표',
        '근무중'
    ),
    (
        'staff004',
        '최지은',
        '상영관팀',
        '사원',
        '010-4444-5555',
        'jieun.choi@example.com',
        'THR004',
        '2024-03-05',
        '야간',
        '상영관 관리',
        '휴가'
    ),
    (
        'staff005',
        '정태영',
        '매점팀',
        '대리',
        '010-5555-6666',
        'taeyoung.jung@example.com',
        'THR005',
        '2023-09-12',
        '주간',
        '매점 판매',
        '근무중'
    ),
    (
        'staff006',
        '강다연',
        '운영팀',
        '대리',
        '010-6666-7777',
        'dayeon.kang@example.com',
        'THR006',
        '2023-04-22',
        '야간',
        '지점 관리',
        '근무중'
    ),
    (
        'staff007',
        '윤서준',
        '고객서비스',
        '사원',
        '010-7777-8888',
        'seojun.yoon@example.com',
        'THR007',
        '2024-01-10',
        '주간',
        '고객 응대',
        '근무중'
    ),
    (
        'staff008',
        '한지민',
        '매표팀',
        '매니저',
        '010-8888-9999',
        'jimin.han@example.com',
        'THR008',
        '2023-07-15',
        '야간',
        '매표',
        '휴가'
    ),
    (
        'staff009',
        '오태현',
        '상영관팀',
        '사원',
        '010-9999-0000',
        'taehyun.oh@example.com',
        'THR001',
        '2024-05-20',
        '주간',
        '상영관 관리',
        '근무중'
    ),
    (
        'staff010',
        '류하린',
        '매점팀',
        '사원',
        '010-0000-1111',
        'harin.ryu@example.com',
        'THR002',
        '2023-11-30',
        '야간',
        '매점 판매',
        '근무중'
    ),
    (
        'staff011',
        '김도현',
        '운영팀',
        '매니저',
        '010-1112-2223',
        'dohyun.kim@example.com',
        'THR003',
        '2023-02-25',
        '주간',
        '지점 관리',
        '근무중'
    ),
    (
        'staff012',
        '이예진',
        '고객서비스',
        '대리',
        '010-2223-3334',
        'yejin.lee@example.com',
        'THR004',
        '2023-08-12',
        '야간',
        '고객 응대',
        '휴가'
    ),
    (
        'staff013',
        '박소율',
        '매표팀',
        '사원',
        '010-3334-4445',
        'soyul.park@example.com',
        'THR005',
        '2024-03-15',
        '주간',
        '매표',
        '근무중'
    ),
    (
        'staff014',
        '최민재',
        '상영관팀',
        '사원',
        '010-4445-5556',
        'minjae2.choi@example.com',
        'THR006',
        '2024-06-10',
        '야간',
        '상영관 관리',
        '근무중'
    ),
    (
        'staff015',
        '정유나',
        '매점팀',
        '대리',
        '010-5556-6667',
        'yuna.jung@example.com',
        'THR007',
        '2023-10-05',
        '주간',
        '매점 판매',
        '근무중'
    ),
    (
        'staff016',
        '강시우',
        '운영팀',
        '사원',
        '010-6667-7778',
        'siwoo.kang@example.com',
        'THR008',
        '2023-05-18',
        '야간',
        '지점 관리',
        '휴가'
    ),
    (
        'staff017',
        '윤지우',
        '고객서비스',
        '사원',
        '010-7778-8889',
        'jiwoo.yoon@example.com',
        'THR001',
        '2024-02-22',
        '주간',
        '고객 응대',
        '근무중'
    ),
    (
        'staff018',
        '한서아',
        '매표팀',
        '대리',
        '010-8889-9990',
        'seoa.han@example.com',
        'THR002',
        '2023-09-25',
        '야간',
        '매표',
        '근무중'
    ),
    (
        'staff019',
        '오민서',
        '상영관팀',
        '매니저',
        '010-9990-0001',
        'minseo.oh@example.com',
        'THR003',
        '2023-03-30',
        '주간',
        '상영관 관리',
        '근무중'
    ),
    (
        'staff020',
        '류지안',
        '매점팀',
        '사원',
        '010-0001-1112',
        'jian.ryu@example.com',
        'THR004',
        '2024-04-12',
        '야간',
        '매점 판매',
        '휴가'
    ),
    (
        'staff021',
        '김하윤',
        '운영팀',
        '대리',
        '010-1113-2224',
        'hayoon.kim@example.com',
        'THR005',
        '2023-06-15',
        '주간',
        '지점 관리',
        '근무중'
    ),
    (
        'staff022',
        '이수민',
        '고객서비스',
        '사원',
        '010-2224-3335',
        'sumin.lee@example.com',
        'THR006',
        '2024-01-20',
        '야간',
        '고객 응대',
        '근무중'
    ),
    (
        'staff023',
        '박예린',
        '매표팀',
        '사원',
        '010-3335-4446',
        'yerin.park@example.com',
        'THR007',
        '2023-11-10',
        '주간',
        '매표',
        '근무중'
    ),
    (
        'staff024',
        '최서진',
        '상영관팀',
        '대리',
        '010-4446-5557',
        'seojin.choi@example.com',
        'THR008',
        '2023-07-22',
        '야간',
        '상영관 관리',
        '휴가'
    ),
    (
        'staff025',
        '정다인',
        '매점팀',
        '매니저',
        '010-5557-6668',
        'dain.jung@example.com',
        'THR001',
        '2023-04-05',
        '주간',
        '매점 판매',
        '근무중'
    ),
    (
        'staff026',
        '강지윤',
        '운영팀',
        '사원',
        '010-6668-7779',
        'jiyoon.kang@example.com',
        'THR002',
        '2024-05-15',
        '야간',
        '지점 관리',
        '근무중'
    ),
    (
        'staff027',
        '윤하진',
        '고객서비스',
        '대리',
        '010-7779-8880',
        'hajin.yoon@example.com',
        'THR003',
        '2023-08-30',
        '주간',
        '고객 응대',
        '근무중'
    ),
    (
        'staff028',
        '한태민',
        '매표팀',
        '사원',
        '010-8880-9991',
        'taemin.han@example.com',
        'THR004',
        '2024-02-25',
        '야간',
        '매표',
        '휴가'
    ),
    (
        'staff029',
        '오서율',
        '상영관팀',
        '사원',
        '010-9991-0002',
        'seoyul.oh@example.com',
        'THR005',
        '2023-10-12',
        '주간',
        '상영관 관리',
        '근무중'
    ),
    (
        'staff030',
        '류민재',
        '매점팀',
        '대리',
        '010-0002-1113',
        'minjae3.ryu@example.com',
        'THR006',
        '2023-05-20',
        '야간',
        '매점 판매',
        '근무중'
    );

-- notice 테이블 가데이터

 INSERT IGNORE INTO notice (noticenum, noticetype, noticesub, noticedate, noticecontents, writer) VALUES
 (1, '공지', '시스템 점검 안내', '2025-07-01 10:00:00', '더 스크린 시스템 점검 일정 안내입니다.', 'admin'),
 (2, '공지', '서비스 이용약관 개정', '2025-07-02 09:30:00', '이용약관이 일부 변경되어 안내드립니다.', 'admin'),
 (3, '이벤트', '여름 맞이 영화 할인 이벤트', '2025-07-03 14:00:00', '여름 시즌 할인 이벤트 진행중입니다.', 'event_manager'),
 (4, '이벤트', '신규 회원 가입 이벤트', '2025-07-04 15:00:00', '신규 가입 시 영화 쿠폰 증정!', 'event_manager'),
 (5, '문의', '예매 취소 방법 문의', '2025-07-05 11:20:00', '예매 취소는 어떻게 하나요?', 'user01'),
 (6, '문의', '포인트 사용 관련 문의', '2025-07-05 13:40:00', '포인트는 어디서 확인하나요?', 'user02'),
 (7, '문의', '좌석 선택 오류 문의', '2025-07-06 16:00:00', '좌석 선택이 안됩니다.', 'user03'),
 (8, '문의', '결제 오류 발생 문의', '2025-07-06 17:30:00', '결제 진행 시 오류가 발생했어요.', 'user04'),
 (9, '문의', '로그인 문제 문의', '2025-07-07 09:10:00', '로그인이 안됩니다.', 'user05'),
 (10, '점검', '정기 점검 안내', '2025-07-08 00:00:00', '정기 점검이 예정되어 있습니다.', 'admin'),
 (11, '점검', '긴급 점검 공지', '2025-07-08 02:30:00', '긴급 점검으로 서비스가 일시 중단됩니다.', 'admin');

-- notice 테이블 가데이터 추가 (12~30)

 INSERT IGNORE INTO notice (noticenum, noticetype, noticesub, noticedate, noticecontents, writer) VALUES
 (12, '공지', '영화 상영시간 변경 안내', '2025-07-09 10:00:00', '특정 영화의 상영 시간이 변경되어 안내드립니다.', 'admin'),
 (13, '공지', '서비스 정책 변경 안내', '2025-07-09 11:00:00', '더 나은 서비스를 위해 정책이 일부 변경됩니다.', 'admin'),
 (14, '공지', '회원 혜택 안내', '2025-07-10 09:30:00', '회원 등급별 혜택을 확인해주세요.', 'admin'),
 (15, '공지', '앱 업데이트 공지', '2025-07-10 14:00:00', '앱 최신 버전으로 업데이트 해주세요.', 'admin'),
 (16, '이벤트', '리뷰 작성 이벤트', '2025-07-11 12:00:00', '리뷰 작성 시 포인트를 드립니다.', 'event_manager'),
 (17, '이벤트', '생일 축하 쿠폰 이벤트', '2025-07-11 15:00:00', '생일 달에 쿠폰을 드립니다.', 'event_manager'),
 (18, '이벤트', 'SNS 공유 이벤트', '2025-07-12 11:00:00', 'SNS 공유하고 선물 받아가세요.', 'event_manager'),
 (19, '이벤트', 'VIP 고객 초청 시사회', '2025-07-12 17:00:00', 'VIP 고객님들을 위한 특별 시사회 초대.', 'event_manager'),
 (20, '문의', '할인 쿠폰 적용 문의', '2025-07-13 10:00:00', '쿠폰이 적용되지 않아요.', 'user06'),
 (21, '문의', '회원 탈퇴 방법 문의', '2025-07-13 11:30:00', '회원 탈퇴는 어떻게 하나요?', 'user07'),
 (22, '문의', '아이디 변경 문의', '2025-07-13 12:45:00', '아이디 변경이 가능한가요?', 'user08'),
 (23, '문의', '예매 내역 영수증 문의', '2025-07-13 14:00:00', '영수증 출력은 어디서 하나요?', 'user09'),
 (24, '문의', '포인트 소멸 시기 문의', '2025-07-13 16:00:00', '포인트는 언제 소멸되나요?', 'user10'),
 (25, '문의', '이벤트 참여 확인 문의', '2025-07-14 09:00:00', '이벤트 참여 여부는 어떻게 확인하나요?', 'user11'),
 (26, '점검', '서버 긴급 점검', '2025-07-14 11:00:00', '서버 긴급 점검이 진행됩니다.', 'admin'),
 (27, '점검', '앱 점검 안내', '2025-07-14 13:00:00', '앱 점검으로 일부 기능이 제한됩니다.', 'admin'),
 (28, '점검', '영화관 시스템 업그레이드', '2025-07-14 15:00:00', '시스템 업그레이드 작업이 예정되어 있습니다.', 'admin'),
 (29, '공지', '홈페이지 리뉴얼 안내', '2025-07-15 09:00:00', '홈페이지가 새롭게 개편됩니다.', 'admin'),
 (30, '공지', '설문 참여 안내', '2025-07-15 10:30:00', '설문에 참여해주시면 추첨을 통해 경품을 드립니다.', 'admin');

--     faq 테이블 가데이터

 INSERT IGNORE INTO faq (faqnum, faqsub, faqdate) VALUES
 (1, '회원가입은 어떻게 하나요?', '2025-07-01 09:00:00'),
 (2, '비밀번호를 잊어버렸어요.', '2025-07-01 10:00:00'),
 (3, '예매한 영화는 어디서 확인하나요?', '2025-07-02 11:00:00'),
 (4, '예매 취소는 어떻게 하나요?', '2025-07-02 12:30:00'),
 (5, '포인트 적립은 어떻게 되나요?', '2025-07-03 13:00:00'),
 (6, '쿠폰은 어디서 사용하나요?', '2025-07-03 14:00:00'),
 (7, '좌석 변경은 가능한가요?', '2025-07-04 15:30:00'),
 (8, '문의사항은 어디서 남기나요?', '2025-07-04 16:30:00'),
 (9, '모바일 티켓 발급 방법은?', '2025-07-05 17:00:00'),
 (10, '관람 등급은 어디서 확인하나요?', '2025-07-05 18:00:00');

-- faq 테이블 가데이터 추가 (11~15)

 INSERT IGNORE INTO faq (faqnum, faqsub, faqdate) VALUES
 (11, '무통장 입금은 가능한가요?', '2025-07-06 10:00:00'),
 (12, '현장 결제도 가능한가요?', '2025-07-06 11:30:00'),
 (13, '단체 관람은 어떻게 신청하나요?', '2025-07-07 09:00:00'),
 (14, '청소년 할인은 어떻게 적용되나요?', '2025-07-07 10:30:00'),
 (15, '환불은 얼마나 걸리나요?', '2025-07-07 12:00:00');

-- faq 테이블 가데이터 (faqcontents 컬럼) UPDATE

-- ✅ faq 테이블 기존 데이터에 faqcontents 내용 추가하기

 UPDATE faq SET faqcontents = '회원가입은 홈페이지 상단의 회원가입 버튼을 통해 진행할 수 있습니다.' WHERE faqnum = 1;
 UPDATE faq SET faqcontents = '비밀번호를 잊으셨다면 로그인 화면에서 비밀번호 찾기를 이용해주세요.' WHERE faqnum = 2;
 UPDATE faq SET faqcontents = '예매한 영화는 마이페이지 > 예매내역에서 확인할 수 있습니다.' WHERE faqnum = 3;
 UPDATE faq SET faqcontents = '마이페이지에서 직접 예매 취소가 가능합니다.' WHERE faqnum = 4;
 UPDATE faq SET faqcontents = '영화 관람 시 결제 금액의 일부가 포인트로 적립됩니다.' WHERE faqnum = 5;
 UPDATE faq SET faqcontents = '쿠폰은 결제 단계에서 선택하여 사용하실 수 있습니다.' WHERE faqnum = 6;
 UPDATE faq SET faqcontents = '예매 완료 후 좌석 변경은 불가능하며, 취소 후 재예매해주세요.' WHERE faqnum = 7;
 UPDATE faq SET faqcontents = '1:1 문의는 고객센터 메뉴를 통해 작성하실 수 있습니다.' WHERE faqnum = 8;
 UPDATE faq SET faqcontents = '모바일 티켓은 예매 완료 후 문자와 마이페이지에서 확인 가능합니다.' WHERE faqnum = 9;
 UPDATE faq SET faqcontents = '관람 등급은 영화 상세 페이지에서 확인하실 수 있습니다.' WHERE faqnum = 10;
 UPDATE faq SET faqcontents = '무통장 입금은 지원하지 않으며, 카드나 간편결제를 이용해주세요.' WHERE faqnum = 11;
 UPDATE faq SET faqcontents = '현장 결제는 일부 영화관에서만 가능하며, 온라인 결제를 권장합니다.' WHERE faqnum = 12;
 UPDATE faq SET faqcontents = '20인 이상 단체 관람은 고객센터를 통해 별도로 문의해주세요.' WHERE faqnum = 13;
 UPDATE faq SET faqcontents = '청소년 할인은 관람 등급과 나이에 따라 자동 적용됩니다.' WHERE faqnum = 14;
 UPDATE faq SET faqcontents = '환불은 취소 완료 후 영업일 기준 3~5일 이내 처리됩니다.' WHERE faqnum = 15;

-- 예약 가데이터
-- 1. 숫자 시퀀스 생성을 위한 임시 테이블
CREATE TEMPORARY TABLE numbers (n INT);
INSERT INTO numbers (n)
SELECT a.N + b.N * 10 + c.N * 100 + 1
FROM
    (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) a,
    (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) b,
    (SELECT 0 AS N UNION SELECT 1) c
WHERE a.N + b.N * 10 + c.N * 100 + 1 <= 160;

-- 2. 사용자, 결제, 좌석, 상태 임시 테이블
CREATE TEMPORARY TABLE temp_users (userid VARCHAR(20));
CREATE TEMPORARY TABLE temp_payments (paymentcd VARCHAR(20));
CREATE TEMPORARY TABLE temp_seats (seatcd VARCHAR(10));

-- 사용자 코드 삽입 (user001 ~ user050)
INSERT INTO temp_users (userid)
SELECT CONCAT('user', LPAD(n, 3, '0'))
FROM numbers WHERE n <= 50;

-- 결제 코드 삽입 (PAY001 ~ PAY015)
INSERT INTO temp_payments (paymentcd)
SELECT CONCAT('PAY', LPAD(n, 3, '0'))
FROM numbers WHERE n <= 15;

-- 좌석 코드 삽입 (A01 ~ J10)
INSERT INTO temp_seats (seatcd)
SELECT CONCAT(row_letter, LPAD(col_num, 2, '0'))
FROM (
    SELECT 'A' AS row_letter UNION SELECT 'B' UNION SELECT 'C' UNION SELECT 'D' UNION SELECT 'E'
    UNION SELECT 'F' UNION SELECT 'G' UNION SELECT 'H' UNION SELECT 'I' UNION SELECT 'J'
) row_data
CROSS JOIN (
    SELECT n AS col_num FROM numbers WHERE n BETWEEN 1 AND 10
) cols;


-- 3. 날짜 시퀀스 (2025-07-03 ~ 2025-07-10)
CREATE TEMPORARY TABLE temp_dates (day_num INT, reservation_date DATE);
INSERT INTO temp_dates (day_num, reservation_date)
SELECT n, DATE_SUB('2025-07-10', INTERVAL (n - 1) DAY)
FROM numbers WHERE n BETWEEN 1 AND 8;

-- 4. 가데이터 삽입 (날짜별 20개)
INSERT IGNORE INTO reservation (reservationcd, userid, schedulecd, reservationtime, reservationstatus, seatcd, paymentcd)
SELECT
    LPAD(ROW_NUMBER() OVER (ORDER BY d.reservation_date, n.n), 12, '0') AS reservationcd,
    (SELECT userid FROM temp_users ORDER BY RAND() LIMIT 1) AS userid,
    (SELECT schedulecd FROM schedule ORDER BY RAND() LIMIT 1) AS schedulecd,
    
    DATE_ADD(d.reservation_date, INTERVAL FLOOR(RAND() * 24 * 60) MINUTE) AS reservationtime,
    CASE WHEN RAND() < 0.5 THEN '예약완료' ELSE '예약취소' END AS reservationstatus,
    (SELECT seatcd FROM temp_seats ORDER BY RAND() LIMIT 1) AS seatcd,
    (SELECT paymentcd FROM temp_payments ORDER BY RAND() LIMIT 1) AS paymentcd
FROM temp_dates d
CROSS JOIN (
    SELECT n FROM numbers WHERE n BETWEEN 1 AND 20
) n
ORDER BY d.reservation_date, n.n;

-- 5. 임시 테이블 삭제
DROP TEMPORARY TABLE numbers;
DROP TEMPORARY TABLE temp_users;
DROP TEMPORARY TABLE temp_payments;
DROP TEMPORARY TABLE temp_seats;
DROP TEMPORARY TABLE temp_dates;

