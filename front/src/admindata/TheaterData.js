export const ScreenData = [
    {
      screenId: "SCR001",
      theaterName: "강남점 1관",
      seatCount: 180,
      screenSize: "대형",
      soundSystem: "Dolby Atmos",
      status: "정상",
      seatLayout: Array(8).fill().map(() => Array(12).fill("available")),
      lastMaintenanceDate: "2025-05-15"
    },
    {
      screenId: "SCR002",
      theaterName: "강남점 2관",
      seatCount: 220,
      screenSize: "IMAX",
      soundSystem: "IMAX Enhanced",
      status: "점검중",
      seatLayout: Array(10).fill().map(() => Array(14).fill("available")),
      lastMaintenanceDate: "2025-06-20"
    },
    {
      screenId: "SCR003",
      theaterName: "홍대점 1관",
      seatCount: 150,
      screenSize: "중형",
      soundSystem: "Standard",
      status: "정상",
      seatLayout: Array(7).fill().map(() => Array(10).fill("available")),
      lastMaintenanceDate: "2025-04-10"
    },
    {
      screenId: "SCR004",
      theaterName: "홍대점 2관",
      seatCount: 200,
      screenSize: "대형",
      soundSystem: "Dolby Atmos",
      status: "정상",
      seatLayout: Array(8).fill().map(() => Array(12).fill("available")),
      lastMaintenanceDate: "2025-05-01"
    },
    {
      screenId: "SCR005",
      theaterName: "부산점 1관",
      seatCount: 250,
      screenSize: "IMAX",
      soundSystem: "IMAX Enhanced",
      status: "정상",
      seatLayout: Array(10).fill().map(() => Array(16).fill("available")),
      lastMaintenanceDate: "2025-06-01"
    },
    {
      screenId: "SCR006",
      theaterName: "부산점 2관",
      seatCount: 120,
      screenSize: "소형",
      soundSystem: "Standard",
      status: "비활성",
      seatLayout: Array(6).fill().map(() => Array(10).fill("available")),
      lastMaintenanceDate: "2024-12-15"
    },
    {
      screenId: "SCR007",
      theaterName: "여의도점 1관",
      seatCount: 180,
      screenSize: "중형",
      soundSystem: "Dolby Atmos",
      status: "정상",
      seatLayout: Array(8).fill().map(() => Array(12).fill("available")),
      lastMaintenanceDate: "2025-05-20"
    },
    {
      screenId: "SCR008",
      theaterName: "여의도점 2관",
      seatCount: 280,
      screenSize: "4DX",
      soundSystem: "4DX Sound",
      status: "점검중",
      seatLayout: Array(10).fill().map(() => Array(18).fill("available")),
      lastMaintenanceDate: "2025-06-25"
    },
    {
      screenId: "SCR009",
      theaterName: "신촌점 1관",
      seatCount: 160,
      screenSize: "중형",
      soundSystem: "Standard",
      status: "정상",
      seatLayout: Array(7).fill().map(() => Array(12).fill("available")),
      lastMaintenanceDate: "2025-04-25"
    },
    {
      screenId: "SCR010",
      theaterName: "신촌점 2관",
      seatCount: 200,
      screenSize: "대형",
      soundSystem: "Dolby Atmos",
      status: "정상",
      seatLayout: Array(8).fill().map(() => Array(14).fill("available")),
      lastMaintenanceDate: "2025-05-10"
    }
  ];


  export const TheaterData = [
    {
      theaterId: "THR001",
      theaterName: "시네맥스 강남점",
      address: "서울시 강남구 테헤란로 123",
      screenCount: 6,
      seatCount: 1240,
      status: "정상 운영",
      contactNumber: "02-1234-5678",
      openDate: "2015-03-10"
    },
    {
      theaterId: "THR002",
      theaterName: "시네맥스 홍대점",
      address: "서울시 마포구 홍익로 456",
      screenCount: 4,
      seatCount: 980,
      status: "정상 운영",
      contactNumber: "02-2345-6789",
      openDate: "2017-06-15"
    },
    {
      theaterId: "THR003",
      theaterName: "시네맥스 부산점",
      address: "부산시 해운대구 센텀로 789",
      screenCount: 5,
      seatCount: 1100,
      status: "점검중",
      contactNumber: "051-3456-7890",
      openDate: "2012-09-01"
    },
    {
      theaterId: "THR004",
      theaterName: "시네맥스 여의도점",
      address: "서울시 영등포구 여의대로 101",
      screenCount: 4,
      seatCount: 900,
      status: "정상 운영",
      contactNumber: "02-4567-8901",
      openDate: "2018-04-20"
    },
    {
      theaterId: "THR005",
      theaterName: "시네맥스 신촌점",
      address: "서울시 서대문구 신촌로 234",
      screenCount: 3,
      seatCount: 700,
      status: "정상 운영",
      contactNumber: "02-5678-9012",
      openDate: "2016-11-05"
    },
    {
      theaterId: "THR006",
      theaterName: "시네맥스 대구점",
      address: "대구시 중구 동성로 567",
      screenCount: 7,
      seatCount: 1400,
      status: "정상 운영",
      contactNumber: "053-6789-0123",
      openDate: "2014-07-15"
    },
    {
      theaterId: "THR007",
      theaterName: "시네맥스 인천점",
      address: "인천시 남동구 구월로 890",
      screenCount: 5,
      seatCount: 1050,
      status: "비활성",
      contactNumber: "032-7890-1234",
      openDate: "2013-02-10"
    },
    {
      theaterId: "THR008",
      theaterName: "시네맥스 분당점",
      address: "경기도 성남시 분당구 정자로 345",
      screenCount: 6,
      seatCount: 1200,
      status: "정상 운영",
      contactNumber: "031-8901-2345",
      openDate: "2019-08-25"
    }
  ];