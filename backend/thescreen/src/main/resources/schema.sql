CREATE OR REPLACE VIEW screen_view AS
SELECT
    r.regioncd,
    r.regionnm,
    c.cinemacd,
    c.cinemanm,
    s.screencd,
    s.screenname,
    s.seatcount
FROM
    region r
    INNER JOIN cinema c ON r.regioncd = c.regioncd
    INNER JOIN screen s ON c.cinemacd = s.cinemacd
WHERE
    s.screencd LIKE 'SCR%'
    AND CAST(SUBSTRING(s.screencd FROM 4) AS INTEGER) <= 10;