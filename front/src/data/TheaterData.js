// TheaterData.js
export const TheaterData = [
  {
    id: 1,
    name: "CGV 강남",
    location: "서울 강남구",
    screens: 8,
    address: "서울 강남구 강남대로 438"
  },
  {
    id: 2,
    name: "롯데시네마 홍대",
    location: "서울 마포구",
    screens: 6,
    address: "서울 마포구 와우산로 35"
  }
];

export const ScreenData = [
  {
    id: 1,
    name: "1관",
    theaterId: 1,
    seats: 120,
    type: "일반"
  },
  {
    id: 2,
    name: "2관",
    theaterId: 1,
    seats: 80,
    type: "일반"
  }
]; 