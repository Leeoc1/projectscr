import { useState, useCallback } from "react";
import { getDateArray, getHeaderText } from "../utils/DateUtils";

export const useDateNavigation = (initialDate = new Date()) => {
  const [offset, setOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  // 날짜 배열 생성
  const today = new Date();
  const baseDate = new Date(today);
  baseDate.setDate(today.getDate() + offset);
  const dateArr = getDateArray(baseDate, 8, today);

  // 헤더 텍스트 생성
  const headerText = getHeaderText(selectedDate, today);

  // 화살표 네비게이션
  const canGoPrev = offset > 0;

  const goToPrevious = useCallback(() => {
    if (canGoPrev) {
      setOffset(prev => prev - 1);
    }
  }, [canGoPrev]);

  const goToNext = useCallback(() => {
    setOffset(prev => prev + 1);
  }, []);

  // 날짜 선택
  const handleDateSelect = useCallback((dateItem) => {
    if (!dateItem.isDisabled) {
      const newDate = new Date(
        dateItem.date.getFullYear(),
        dateItem.date.getMonth(),
        dateItem.date.getDate()
      );
      setSelectedDate(newDate);
    }
  }, []);

  return {
    // 상태
    selectedDate,
    dateArr,
    
    // 계산된 값들
    headerText,
    canGoPrev,
    
    // 이벤트 핸들러들
    goToPrevious,
    goToNext,
    handleDateSelect,
  };
}; 