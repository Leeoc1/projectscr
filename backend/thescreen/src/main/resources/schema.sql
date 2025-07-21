--CREATE OR REPLACE VIEW screen_view AS
--SELECT
--    r.regioncd,
--    r.regionnm,
--    c.cinemacd,
--    c.cinemanm,
--    s.screencd,
--    s.screenname,
--    s.seatcount
--FROM
--    region r
--    INNER JOIN cinema c ON r.regioncd = c.regioncd
--    INNER JOIN screen s ON c.cinemacd = s.cinemacd
--WHERE
--    s.screencd LIKE 'SCR%'
--    AND CAST(SUBSTRING(s.screencd FROM 4) AS INTEGER) <= 10;

create or replace view schedule_view as
select s.schedulecd, s.startdate, s.starttime, m.movienm, m.runningscreen, m.runningtime, sc.screenname, sc.screenstatus, sc.screentype, sc.allseat, sc.reservationseat, c.cinemanm, r.regionnm
from
    schedule s
    inner join movie m on s.moviecd = m.moviecd
    inner join screen sc on s.screencd = sc.screencd
    inner join cinema c on sc.cinemacd = c.cinemacd
    inner join region r on c.regioncd = r.regioncd;

create or replace view reservation_view as
select r.reservationcd, r.seatcd, r.reservationtime, r.reservationstatus, sv.starttime, sv.movienm, sv.runningtime, sv.screenname, sv.cinemanm, r.userid, p.paymenttime, p.paymentmethod, p.amount
from
    reservation r
    inner join schedule_view sv on r.schedulecd = sv.schedulecd
    inner join payment p on r.paymentcd = p.paymentcd;

DROP TABLE IF EXISTS movierank;

CREATE TABLE movierank (
    movierankcd VARCHAR(30) PRIMARY KEY, -- PK값, 자동 증가
    moviename VARCHAR(255) NOT NULL, -- 영화 이름, 최대 255자
    movierank INT NOT NULL, -- 영화 랭크, 정수형
    rankchange INT DEFAULT 0 -- 전날 대비 랭크 증감량, 기본값 0
);

--reservation의 seatnum을 seatcd로 바꾸고 string로 바꾸기 이것도 툴에서 실행
--ALTER TABLE reservation CHANGE seatnum seatcd VARCHAR(50);

--예약 테이블 pk인 예약 코드 string로 바꿔야 하는데 그걸 위해 툴에서 실행
--ALTER TABLE reservation MODIFY reservationcd VARCHAR(12);

--ALTER TABLE reservation
--MODIFY COLUMN reservationcd BIGINT NOT NULL AUTO_INCREMENT;
--
---- screen 테이블에 reservationseat 컬럼 추가 (기존 컬럼이 없는 경우)
--ALTER TABLE screen ADD COLUMN IF NOT EXISTS reservationseat INT DEFAULT 0;

--notice 테이블에 컬럼 추가
-- thescreen 데이터베이스 선택
--USE thescreen;
-- notice 테이블에 noticecontents 컬럼 추가
--ALTER TABLE notice
--ADD noticecontents TEXT;
-- notice 테이블에 writer 컬럼 추가
--ALTER TABLE notice
--ADD writer VARCHAR(20);

--faq 테이블에 컬럼 추가
-- thescreen 데이터베이스 선택
--USE thescreen;
-- faq 테이블에 faqcontents 컬럼 추가
--ALTER TABLE faq
--ADD faqcontents TEXT;

--reservation의 seatnum을 seatcd로 바꾸고 string로 바꾸기 이것도 툴에서 실행
--ALTER TABLE reservation CHANGE seatnum seatcd VARCHAR(50);

--예약 테이블 pk인 예약 코드 string로 바꿔야 하는데 그걸 위해 툴에서 실행
--ALTER TABLE reservation MODIFY reservationcd VARCHAR(12);

--유저 테이블에 가입일 컬럼 추가
--ALTER TABLE users ADD COLUMN reg_date date;

--유저 테이블에 데이터가 있으면 아래 쿼리문 먼저 실행하고 해야 합니다
--DELETE FROM users;
--ALTER TABLE users ADD COLUMN reg_date;

--유저 테이블에 데이터가 있으면 아래 쿼리문 먼저 실행하고 해야 합니다
--DELETE FROM users;

create or replace view screen_view as
select s.screencd, s.allseat, s.cinemacd, s.reservationseat, s.screenname, s.screenstatus, s.screentype, c.cinemanm, rg.regioncd, rg.regionnm
from
    screen s
    inner join cinema c on s.cinemacd = c.cinemacd
    inner join region rg on rg.regioncd = c.regioncd;


CREATE OR REPLACE VIEW view_movie_with_rank AS
SELECT
    m.moviecd,
    m.movienm,
    m.description,
    m.genre,
    m.director,
    m.actors,
    m.runningtime,
    m.releasedate,
    m.posterurl,
    m.runningscreen,
    m.movieinfo,
    m.isadult,
    r.movierankcd,
    r.movierank,
    r.rankchange
FROM movie m
LEFT JOIN movierank r ON m.movienm = r.moviename;

CREATE OR REPLACE VIEW review_view AS
SELECT
r.reviewnum,               -- 리뷰 번호
u.userid,                  -- 유저 ID
m.movienm,                 -- 영화 이름
r.rating,                  -- 평점
r.likes                    -- 추천(좋아요)
FROM
review r
LEFT JOIN users u ON r.userid = u.userid
LEFT JOIN movie m ON r.moviecd = m.moviecd;
