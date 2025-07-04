import { useState, useEffect, useCallback } from "react";
import { getReservationInfo, setReservationInfo } from "../utils/reservationStorage";
import { validateSeatSelection } from "../utils/validationUtils";

// 초기 좌석 선택 상태
const initialSeatState = {
  guestCount: { adult: 1, child: 0, senior: 0 },
  selectedSeats: [],
  totalPrice: 10000,
};

// 가격 정보 (상수로 분리)
const PRICES = { adult: 10000, child: 6000, senior: 5000 };

export const useSeatSelection = () => {
  const [seatState, setSeatState] = useState(initialSeatState);
  const [reservationInfo, setReservationInfoState] = useState(null);

  // 예매 정보 로드
  useEffect(() => {
    const reservationInfoRaw = getReservationInfo();
    const info = {
      ...reservationInfoRaw,
      selectedDate: reservationInfoRaw.selectedDate ? new Date(reservationInfoRaw.selectedDate) : null,
    };
    setReservationInfoState(info);

    // 저장된 좌석 정보가 있으면 로드
    if (reservationInfoRaw.guestCount) {
      setSeatState(prev => ({
        ...prev,
        guestCount: reservationInfoRaw.guestCount,
        selectedSeats: reservationInfoRaw.selectedSeats || [],
        totalPrice: reservationInfoRaw.totalPrice || 10000,
      }));
    }
  }, []);

  // 총 인원 수 계산
  const totalGuests = seatState.guestCount.adult + seatState.guestCount.child + seatState.guestCount.senior;

  // 인원/좌석/총금액이 바뀔 때마다 세션스토리지에 저장
  useEffect(() => {
    if (reservationInfo) {
      const info = {
        ...reservationInfo,
        guestCount: seatState.guestCount,
        selectedSeats: seatState.selectedSeats,
        totalPrice: seatState.totalPrice,
      };
      setReservationInfo(info);
    }
  }, [seatState.guestCount, seatState.selectedSeats, seatState.totalPrice, reservationInfo]);

  // 인원 수 변경
  const handleGuestChange = useCallback((type, change) => {
    const newCount = Math.max(0, seatState.guestCount[type] + change);
    const newGuestCount = {
      ...seatState.guestCount,
      [type]: newCount,
    };

    const newTotalPrice = 
      newGuestCount.adult * PRICES.adult +
      newGuestCount.child * PRICES.child +
      newGuestCount.senior * PRICES.senior;

    setSeatState(prev => {
      const newState = {
        ...prev,
        guestCount: newGuestCount,
        totalPrice: newTotalPrice,
      };

      // 인원 수가 줄어들면 초과된 좌석 선택 해제
      const newTotalGuests = newGuestCount.adult + newGuestCount.child + newGuestCount.senior;
      if (prev.selectedSeats.length > newTotalGuests) {
        newState.selectedSeats = prev.selectedSeats.slice(0, newTotalGuests);
      }

      return newState;
    });
  }, [seatState.guestCount]);

  // 좌석 선택/해제
  const handleSeatClick = useCallback((row, column) => {
    const seatId = `${row}${column}`;

    setSeatState(prev => {
      if (prev.selectedSeats.includes(seatId)) {
        // 이미 선택된 좌석이면 해제
        return {
          ...prev,
          selectedSeats: prev.selectedSeats.filter((seat) => seat !== seatId),
        };
      } else {
        // 새로운 좌석 선택 시 인원 수 체크
        if (prev.selectedSeats.length < totalGuests) {
          return {
            ...prev,
            selectedSeats: [...prev.selectedSeats, seatId],
          };
        } else {
          alert(`최대 ${totalGuests}명까지만 좌석을 선택할 수 있습니다.`);
          return prev;
        }
      }
    });
  }, [totalGuests]);

  // 결제 페이지로 이동 준비
  const prepareForPayment = useCallback(() => {
    const validation = validateSeatSelection({
      totalGuests,
      selectedSeats: seatState.selectedSeats,
    });

    if (!validation.isValid) {
      alert(validation.error);
      return false;
    }

    // 예매 정보 누적 저장
    const fullReservationInfo = {
      ...reservationInfo,
      guestCount: seatState.guestCount,
      selectedSeats: seatState.selectedSeats,
      totalPrice: seatState.totalPrice,
    };
    setReservationInfo(fullReservationInfo);
    return true;
  }, [totalGuests, seatState.selectedSeats, seatState.guestCount, seatState.totalPrice, reservationInfo]);

  return {
    // 상태
    seatState,
    reservationInfo,
    prices: PRICES,
    totalGuests,
    
    // 이벤트 핸들러들
    handleGuestChange,
    handleSeatClick,
    prepareForPayment,
  };
}; 