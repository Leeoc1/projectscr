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


-- 포스터 + 줄거리
 UPDATE movie
 SET
     description = CASE
                     WHEN movienm = '라이언 일병 구하기' THEN '세계 2차 대전 중 미군인 밀러 대위는 모마하 해변을 공격하는데 예정지가 아닌 곳에 상륙하게 돼 부하들의 희생이 많았다. 그럼에도 밀러 대위는 몇 안 되는 부하와 함께 해변을 정복한다. 한편 미군 사령관은 군인인 라이언 형제에 관한 보고를 듣는다. 참전중인 네 형제 중 세 형제가 전사했고 넷째이자 막내인 제임스 라이언은 생사조차 확인 할 수 없다는 내용이었다. 사령관은 막내를 찾아 집으로 돌려보내라는 명령을 내리고, 밀러 대위의 지휘하에 8명의 군인이 명령을 수행하게 된다. 8명이 목숨을 걸고 한 명을 구해야 하는 임무를 부여받은 부대원들은 불만에 차 있었지만 밀러 대위는 이들을 이해시키며 작전을 진행시킨다.'
                     WHEN movienm = '무명 無名' THEN '나는 조선과 조선인을 사랑하는 일본인 선교사입니다”1896년, 노리마츠는 조선에서 온 한 남자로부터 조선의 국모가 일본인에게 살해당했다는 소식을 전해 듣는다.일본인으로서의 죄책감을 가진 그는 주변의 만류에도 불구하고 암흑과 같은 시기를 보내던 조선 땅으로 향한다.그로부터 수년 후, 노리마츠의 정신을 이은 또 한 명의 일본인이 여전히 예수가 필요한 곳, 조선으로 향하는데….오직 복음만 전한, 이름 대신 예수의 사랑만 남긴 선교사들의 이야기를 만난다.'
                     WHEN movienm = '영화 코바야시네 메이드래곤 외로움쟁이 용' THEN '이 손을 놓고 싶지 않아. 이제 우린, 가족이니까. 평범한 회사원 코바야시 씨.코바야시 씨에게 이끌려 모인 드래곤들.그중 하나 어린 드래곤 칸나에게 누군가가 찾아온다.그 정체는 놀랍게도 칸나의 아버지였는데.'
                       WHEN movienm = '노이즈' THEN '시끄러워 죽겠어요못 살겠네 죽이고 싶다내 집 마련에 성공한 주영(이선빈)과 주희(한수아) 자매어느 날부터 아파트 어딘가에서 들려오는 정체불명의 층간소음에 시달린다.그러던 중 동생 주희와 연락이 끊기자 불안에 휩싸인 주영은급히 지방 공장에서 집으로 돌아오고,주희의 남자친구 기훈(김민석)과 함께 실종된 동생을 추적하기 시작한다.한편, 자매와 마찬가지로 층간소음에 시달리던 아랫집 남자(류경수)는그 소음의 근원이 윗집 자매에게 있다고 생각해 살인 협박을 하게 되는데….'
                       WHEN movienm = '드래곤 길들이기' THEN '수백년간 지속되어온 바이킹과 드래곤의 전쟁.드래곤을 없애는 것이 삶의 모든 목적인 바이킹들과 다른 신념을 가진 ‘히컵’은 무리 속에 속하지 못하고 족장인 아버지에게도 인정받지 못한다.그러던 어느 날,히컵은 베일에 싸인 전설의 드래곤 나이트 퓨어리인 ‘투슬리스’와 만나게 되고, 드래곤을 죽이라는 바이킹의 신념을 깨고 ‘투슬리스’와 친구가 된다.하지만 드래곤을 죽여야 된다고 믿는 바이킹 족과 모든 드래곤을 위협하는 더 거대한 존재와 맞닥뜨리게 된 ‘히컵’과 ‘투슬리스’.세상을 변화시키기 위한 특별한 여정을 시작하게 되는데...다르다는 건, 특별하다는 것.세상을 바꿀 우리들의 모험이 시작된다!'
                       WHEN movienm = '엘리오' THEN '나도 어딘가에 속하고 싶어” 세상 그 어디에서도 소속감을 느끼지 못한 채, 외계인의 납치를 꿈꾸는 외톨이 소년 엘리오. 그러던 어느 날 작은 오해로 인해 지구 대표로 우주에 소환되고, 그곳에서 자신과는 너무도 다른 특별한 존재 글로든을 만나 처음으로 마음을 나눌 친구를 갖게 된다. 낯설지만 따뜻한 우주에서 꿈같은 나날들을 보내던 엘리오 앞에 온 우주를 위험에 빠뜨릴 크나큰 위기가 닥쳐오는데... 조금은 외롭고, 조금은 다른 지구별 여행자들을 위한 디즈니·픽사가 보내는 따뜻한 위로!'
                       WHEN movienm = '괴기열차' THEN '공포 실화를 찾아다니는 유튜브 크리에이터 다경(주현영)은 운영 중인 ‘호러퀸 다경’의 구독자 수가 줄자 더 열성적으로 무서운 이야기를 찾아 나선다. 목표는 미스터리한 사건이 벌어진다는 지하철 ‘광림역’이다. 광림역의 역장(전배수)은 꺼림칙한 듯 말을 아끼지만, 다경의 귀여운 술수에 넘어가 광림역의 숨겨진 이야기를 하나씩 털어놓기 시작한다. 이때부터 영화는 익숙한 공공장소에서 어디에나 있을법한 에피소드를 정교하게 설계해 나가며 기이한 폐쇄 공포를 일으킨다. 섬뜩한 실감과 장르적 쾌감을 증폭시켜 나가는 괴기열차 는 괴이한 이야기를 품고 느릿하게 때로는 숨 막히는 속도감으로 질주한다. 괴담의 짜릿한 유혹과 유머 그리고 호러물의 흥취를 안기는 흥미로운 대중 영화다. (홍은미)'
                       WHEN movienm = '슈퍼맨' THEN '세상의 희망인가, 위협인가?‘슈퍼맨’은 오늘도 세계 곳곳의 위협에 맞서 싸우지만, 시민들의 반응은 극과 극으로 갈린다.한편, ‘렉스 루터’는 ‘슈퍼맨’을 무너뜨릴 비밀을 손에 넣고 역대 최강의 슈퍼-빌런들과 함께 총 공격에 나선다.‘슈퍼맨’은 첫 패배와 함께 이들의 계속된 공세에 직면하고 모든 것을 바로잡기 위해 슈퍼독 ‘크립토’와 함께 맞서게 되는데…과연 그는 이 전례 없는 위기에서 다시 날아오를 수 있을까?올여름, 가장 강력한 슈퍼히어로 블록버스터가 온다!'
                       WHEN movienm = '쥬라기 월드: 새로운 시작' THEN '가장 위험한 놈들만 여기 남겨진 거야“지구 최상위 포식자가 된 공룡들이 인간 세상으로 나온 5년 후, 인간과 공룡의 위태로운 공존이 이어지는 가운데 인류를 구할 신약 개발을 위해 육지, 하늘, 바다를 지배하는 가장 거대한 공룡들의 DNA가 필요하게 된다.불가능한 미션 수행을 위해 ‘조라‘(스칼렛 요한슨)과 ‘헨리 박사’(조나단 베일리) 그리고 ‘던컨’(마허샬라 알리)은 공룡들을 추적하며 지구상에서 가장 위험한 섬에 도착하고 폐쇄된 쥬라기 공원의 연구소가 감추어 온 충격적인 진실을 마주하게 되는데...새로운 캐스트, 새로운 미션, 새로운 공룡, 지상 최대 블록버스터의 새로운 시작!'
                       WHEN movienm = 'F1 더 무비' THEN '최고가 되지 못한 전설 VS 최고가 되고 싶은 루키한때 주목받는 유망주였지만 끔찍한 사고로 F1®에서 우승하지 못하고 한순간에 추락한 드라이버 소니 헤이스(브래드 피트).그의 오랜 동료인 루벤 세르반테스(하비에르 바르뎀)에게 레이싱 복귀를 제안받으며 최하위 팀인 APXGP에 합류한다.그러나 팀 내 떠오르는 천재 드라이버 조슈아 피어스(댐슨 이드리스)와 소니 헤이스의 갈등은 날이 갈수록 심해지고.설상가상 우승을 향한 APXGP 팀의 전략 또한 번번이 실패하며 최하위권을 벗어나지 못하고 고전하는데···빨간 불이 꺼지고 운명을 건 레이스가 시작된다!'
                       WHEN movienm = '신명' THEN '성형, 주술, 무당, 신분 위조까지…대한민국을 뒤흔든 ‘그녀’를 둘러싼 수많은 의혹들이 마침내 드러난다!어린 시절, 분신사바를 시작으로 주술에 심취한 윤지희(김규리 분). 남자를 이용해 원하는 것을 얻을 수 있다는 사실을 깨달은 그녀는 성형으로 얼굴을 바꾸기 시작해서 이름, 학력, 신분까지 위조해 전혀 다른 삶을 살아간다. 그러던 중 권력의 맛을 본 윤지희는 마침내 대한민국을 손에 넣겠다는 야망에 사로잡히고 필요하다면 주술로 사람의 목숨조차 앗아갈 만큼 잔혹한 행보를 이어간다.'
                       WHEN movienm = '명탐정 코난: 척안의 잔상' THEN '국립천문대 노베야마의 괴한 침입 사건을 조사하던 나가노현경 형사 야마토 칸스케.사건을 수사하던 중, 천문대의 파라볼라 안테나가 움직이자 10개월 전 눈사태 속 총격 피습으로 인한 왼쪽 눈의 상처에 갑자기 통증이 이는데…그날 밤, 모리 코고로에게 형사 시절의 옛 동료 와니 형사의 전화가 걸려 온다.나가노현 눈사태 사고의 내막을 조사하고 있던 와니는 사건 파일에서 모리 탐정의 이름을 발견, 참고 차 모리 탐정과 만나기로 한다.약속 당일, 코난과 란도 모리 탐정을 따라 약속 장소로 향하지만 그곳에서 의문의 총성이 울려 퍼진다.설원에 묻힌 그 날의 기억, 척안에 숨겨진 진실이 눈을 뜬다!눈 속에 감춰진 비밀을 찾는 화이트아웃 미스터리 액션'
                       WHEN movienm = '극장판 도라에몽: 진구의 그림이야기' THEN '만약, 그림 속 세계로 들어갈 수 있다면?환상의 보석을 둘러싼 도라에몽과 친구들의 시공 초월 대모험이 지금 시작된다!수백억 원의 가치를 지닌 그림이 발견되었다는 뉴스가 보도되는 가운데, 여름방학 숙제로 ‘그림’을 그리고 있던 진구 앞에 갑자기 오래된 그림 조각 하나가 떨어진다.도라에몽과 진구는 비밀도구 ‘들어가는 라이트’를 사용해 그림 속으로 탐험을 떠나고 그곳에서 신비로운 소녀 클레어와 만나게 된다.그런데 그곳은 바로 뉴스에서 화제가 된 그림 속에 그려진 중세 유럽 ‘아트리아 공국’이었다!그곳 어딘가에는 ‘아트리아 블루’라는 환상의 보석이 숨겨져 있다고 하는데…환상의 보석의 비밀을 파헤치는 도라에몽과 친구들.하지만, ‘아트리아 공국’에 전해 내려오는 ‘세계 멸망’의 전설이 깨어나며 모두가 큰 위기에 빠진다!과연 도라에몽과 친구들은 전설을 뒤집고 세계를 구할 수 있을까?'
                       ELSE description
         END,
     posterurl = CASE
                     WHEN movienm = '라이언 일병 구하기' THEN 'http://file.koreafilm.or.kr/thm/02/99/19/03/tn_DPF031411.jpg'
                     WHEN movienm = '무명 無名' THEN 'http://file.koreafilm.or.kr/thm/02/99/19/00/tn_DPA002218.jpg'
                     WHEN movienm = '영화 코바야시네 메이드래곤 외로움쟁이 용' THEN 'http://file.koreafilm.or.kr/thm/02/99/19/05/tn_DPF031474.jpg'
                     WHEN movienm = '노이즈' THEN 'http://file.koreafilm.or.kr/thm/02/99/19/01/tn_DPK024077.jpg'
                     WHEN movienm = '드래곤 길들이기' THEN 'http://file.koreafilm.or.kr/thm/02/99/18/74/tn_DPF030717.jpg'
                     WHEN movienm = '엘리오' THEN 'http://file.koreafilm.or.kr/thm/02/99/19/00/tn_DPF031210.jpg'
                     WHEN movienm = '괴기열차' THEN 'http://file.koreafilm.or.kr/thm/02/99/19/03/tn_DPK024142.jpg'
                     WHEN movienm = '슈퍼맨' THEN 'http://file.koreafilm.or.kr/thm/02/99/19/01/tn_DPF031298.jpg'
                     WHEN movienm = '쥬라기 월드: 새로운 시작' THEN 'http://file.koreafilm.or.kr/thm/02/99/19/03/tn_DPF031370.jpg'
                     WHEN movienm = 'F1 더 무비' THEN 'http://file.koreafilm.or.kr/thm/02/99/18/99/tn_DPF031202.jpg'
                     WHEN movienm = '신명' THEN 'http://file.koreafilm.or.kr/thm/02/99/19/00/tn_DPK024048.jpg'
                     WHEN movienm = '명탐정 코난: 척안의 잔상' THEN 'http://file.koreafilm.or.kr/thm/02/99/19/03/tn_DPF031419.jpg'
                     WHEN movienm = '극장판 도라에몽: 진구의 그림이야기' THEN 'http://file.koreafilm.or.kr/thm/02/99/19/02/tn_DPF031300.jpg'
                     ELSE posterurl
         END
 WHERE movienm IN (
                   '라이언 일병 구하기','무명 無名','영화 코바야시네 메이드래곤 외로움쟁이 용', '노이즈', '드래곤 길들이기', '엘리오', '괴기열차', '슈퍼맨',
                   '쥬라기 월드: 새로운 시작', 'F1 더 무비', '신명', '명탐정 코난: 척안의 잔상', '극장판 도라에몽: 진구의 그림이야기'
     );
