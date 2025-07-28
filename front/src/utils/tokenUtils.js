// 토큰화된 userid를 처리하는 유틸리티 함수

// JWT 토큰 형식 간단 검증
const isValidJWTFormat = (token) => {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  return parts.length === 3; // JWT는 header.payload.signature 형태
};

// 토큰화된 userid에서 실제 userid 추출
export const decodeUserid = async (tokenizedUserid) => {
  try {
    if (!tokenizedUserid) {
      console.log('[decodeUserid] 토큰이 없음');
      return null;
    }
    
    console.log('[decodeUserid] 디코딩 시도할 토큰:', tokenizedUserid);
    console.log('[decodeUserid] 토큰 길이:', tokenizedUserid.length);
    console.log('[decodeUserid] 토큰 타입:', typeof tokenizedUserid);
    console.log('[decodeUserid] JWT 형식 검증:', isValidJWTFormat(tokenizedUserid));
    
    // JWT 형식이 아니면 바로 반환 (이미 디코딩된 userid일 수 있음)
    if (!isValidJWTFormat(tokenizedUserid)) {
      console.log('[decodeUserid] JWT 형식이 아님. 이미 디코딩된 userid로 간주:', tokenizedUserid);
      return tokenizedUserid;
    }
    
    const response = await fetch('http://localhost:8080/api/auth/decode-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: tokenizedUserid })
    });
    
    console.log('[decodeUserid] 응답 상태:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('[decodeUserid] 디코딩 성공:', data);
      return data.userid;
    } else {
      const errorText = await response.text();
      console.log('[decodeUserid] 디코딩 실패 응답:', errorText);
      
      // 토큰이 유효하지 않으면 localStorage 정리
      if (response.status === 401) {
        console.log('[decodeUserid] 토큰이 유효하지 않음. localStorage 정리');
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userid");
        localStorage.removeItem("tokenizedUserid");
        localStorage.removeItem("username");
      }
    }
    return null;
  } catch (error) {
    console.error('[decodeUserid] 토큰 디코딩 실패:', error);
    return null;
  }
};

// 현재 로그인된 사용자의 실제 userid 가져오기
export const getCurrentUserId = async () => {
  const storedValue = localStorage.getItem("userid");
  
  console.log('[getCurrentUserId] localStorage에서 가져온 값:', storedValue);
  console.log('[getCurrentUserId] 전체 localStorage 내용:', {
    isLoggedIn: localStorage.getItem("isLoggedIn"),
    userid: localStorage.getItem("userid"),
    loginType: localStorage.getItem("loginType")
  });
  
  if (!storedValue) {
    console.log('[getCurrentUserId] userid가 localStorage에 없음');
    return null;
  }
  
  // JWT 형식인지 확인하고 디코딩
  if (isValidJWTFormat(storedValue)) {
    console.log('[getCurrentUserId] JWT 토큰 디코딩 시도:', storedValue.substring(0, 20) + '...');
    return await decodeUserid(storedValue);
  } else {
    // JWT 형식이 아니면 이미 디코딩된 userid (기존 데이터 호환성)
    console.log('[getCurrentUserId] 이미 디코딩된 userid 사용:', storedValue);
    return storedValue;
  }
};

// 보안 로그아웃 (기존 로그아웃과 동일)
export const secureLogout = () => {
  console.log("보안 로그아웃 실행");
  
  // 기본 로그인 정보 제거
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userid"); // JWT 토큰화된 userid 제거
  localStorage.removeItem("username"); // 보안상 제거

  // 카카오 로그인 관련 데이터 제거
  localStorage.removeItem("loginType");
  localStorage.removeItem("kakao_access_token");
  sessionStorage.removeItem("loginType");

  // 네이버 로그인 관련 데이터 제거
  localStorage.removeItem("userInfo");

  // 토스페이먼츠 관련 데이터 제거
  localStorage.removeItem("@tosspayments/merchant-browser-id");
  localStorage.removeItem("@tosspayments/payment-widget-previous-payment-method-id");

  // 추가 보안을 위해 다른 사용자 관련 데이터도 제거
  localStorage.removeItem("authData");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  // 레거시 데이터 정리 (기존에 잘못 저장된 데이터)
  localStorage.removeItem("tokenizedUserid");

  // 세션 스토리지 전체 정리
  sessionStorage.clear();
  
  return true;
};
