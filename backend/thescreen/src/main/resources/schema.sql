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
select
    s.schedulecd,
    s.startdate,
    s.starttime,
    m.movienm,
    m.runningscreen,
    m.runningtime,
    sc.screenname,
    sc.screentype,
    sc.allseat,
    sc.reservationseat,
    c.cinemanm,
    r.regionnm
from
    schedule s
        inner join movie m on s.moviecd = m.moviecd
        inner join screen sc on s.screencd = sc.screencd
        inner join cinema c on sc.cinemacd = c.cinemacd
        inner join region r on c.regioncd = r.regioncd;