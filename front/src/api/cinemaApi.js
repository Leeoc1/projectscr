import { apiRequest, apiRequestWithErrorHandling } from "./apiUtils";

// ========== 극장 관련 API (Cinema, screen 테이블) ==========

// 극장 목록 조회 (Cinema 테이블)
export const getCinemas = () =>
  apiRequestWithErrorHandling(
    "get", 
    "/cinemas", 
    null, 
    {}, 
    "Error fetching cinema:", 
    []
  );

// 상영관 조회 (screen 테이블)
export const getScreens = () =>
  apiRequestWithErrorHandling(
    "get", 
    "/screens", 
    null, 
    {}, 
    "Error fetching screens:", 
    []
  );

// 상영관 뷰 조회 (screen_view)
export const getScreenView = async () => {
  return await apiRequest("get", "/screens/view");
};

// 상영관 상태 업데이트 (screen 테이블)
export const updateScreenStatus = async (screenData) => {
  return await apiRequest("put", "/screens/statusupdate", {
    screencd: screenData.screencd,
    screenstatus: screenData.screenstatus,
  });
};

// 지역 목록 조회 (region 테이블)
export const getRegions = () =>
  apiRequestWithErrorHandling(
    "get", 
    "/regions", 
    null, 
    {}, 
    "Error fetching regions:", 
    []
  );

// ========== 스케줄 관련 API (schedule, schedule_view) ==========

// 스케줄 뷰 조회 (schedule_view)
export const getSchedules = (cinemaCd, date) =>
  apiRequestWithErrorHandling(
    "get", 
    "/schedules", 
    null, 
    { params: { cinemaCd, date } }, 
    "Error fetching schedules:", 
    []
  );
