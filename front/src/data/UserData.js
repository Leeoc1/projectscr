// UserData.js
export const ReservationData = [
  {
    id: 1,
    movieTitle: "드래곤",
    theater: "CGV 강남",
    date: "2024-01-15",
    time: "14:30",
    seats: ["A1", "A2"],
    status: "예매완료"
  },
  {
    id: 2,
    movieTitle: "엘리오",
    theater: "롯데시네마 홍대",
    date: "2024-01-20",
    time: "19:00",
    seats: ["B5"],
    status: "예매완료"
  }
];

export const InquiriesData = [
  {
    id: 1,
    title: "예매 취소 문의",
    content: "예매한 영화를 취소하고 싶습니다.",
    date: "2024-01-10",
    status: "답변완료"
  },
  {
    id: 2,
    title: "학생 할인 문의",
    content: "학생 할인은 어떻게 받을 수 있나요?",
    date: "2024-01-12",
    status: "답변대기"
  }
]; 