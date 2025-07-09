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
select s.schedulecd, s.startdate, s.starttime, m.movienm, m.runningscreen, m.runningtime, sc.screenname, sc.screentype, sc.allseat, sc.reservationseat, c.cinemanm, r.regionnm
from
    schedule s
    inner join movie m on s.moviecd = m.moviecd
    inner join screen sc on s.screencd = sc.screencd
    inner join cinema c on sc.cinemacd = c.cinemacd
    inner join region r on c.regioncd = r.regioncd;


--create or replace view reservation_view as
--select
--    r.reservationcd,
--    r.seatcd,
--    r.reservationtime,
--    sv.starttime,
--    sv.movienm,
--    sv.runningtime,
--    sv.screenname,
--    sv.cinemanm
--from
--    reservation r
--    inner join schedule_view sv on r.schedulecd = sv.schedulecd;
--    inner join payment p on r.paymentcd = p.paymentcd

create or replace view reservation_view as
select
    r.reservationcd,
    r.seatcd,
    r.reservationtime,
    r.reservationstatus,
    sv.starttime,
    sv.movienm,
    sv.runningtime,
    sv.screenname,
    sv.cinemanm,
    r.userid,
    p.paymenttime,
    p.paymentmethod,
    p.amount

from
    reservation r
    inner join schedule_view sv on r.schedulecd = sv.schedulecd
    inner join payment p on r.paymentcd = p.paymentcd;




--reservation의 seatnum을 seatcd로 바꾸고 string로 바꾸기 이것도 툴에서 실행
--ALTER TABLE reservation CHANGE seatnum seatcd VARCHAR(50);

--예약 테이블 pk인 예약 코드 string로 바꿔야 하는데 그걸 위해 툴에서 실행
--ALTER TABLE reservation MODIFY reservationcd VARCHAR(12);

--유저 테이블에 가입일 컬럼 추가
--ALTER TABLE users ADD COLUMN reg_date;

--유저 테이블에 데이터가 있으면 아래 쿼리문 먼저 실행하고 해야 합니다
--DELETE FROM users;