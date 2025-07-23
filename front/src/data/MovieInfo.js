export const getRating = (isAdult) => {
  return isAdult === "Y" ? "청소년 관람불가" : "전체 관람가";
};
