import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import {
  getGoogleUserInfo,
  getGooglePeopleData,
  saveGoogleUserToBackend,
  getGoogleClientId,
} from "../../../api/api";

const GoogleLoginButton = ({ onLoginAttempt }) => {
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // 기본 사용자 정보 가져오기
        const userInfo = await getGoogleUserInfo(tokenResponse.access_token);

        // People API를 통해 추가 정보 가져오기
        const peopleData = await getGooglePeopleData(
          tokenResponse.access_token
        );

        // 모든 정보 결합
        const completeUserInfo = {
          ...userInfo,
          birthdays: peopleData.birthdays,
          phoneNumbers: peopleData.phoneNumbers,
        };

        // 백엔드로 사용자 정보 전송
        await saveGoogleUserToBackend(completeUserInfo);
        console.log("사용자 정보를 데이터베이스에 저장했습니다.");

        navigate("/");
      } catch (error) {
        console.error("Google 로그인 처리 실패:", error);
      }
    },
    onError: (error) => {
      console.error("Google 로그인 실패:", error);
    },
    scope:
      "openid email profile https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.phonenumbers.read",
  });

  const handleClick = () => {
    if (onLoginAttempt) {
      onLoginAttempt("구글");
    }
    googleLogin();
  };

  return (
    <button className="lgs-social-btn lgs-google" onClick={handleClick}>
      <span className="lgs-social-icon">G</span>
      구글로 로그인
    </button>
  );
};

const GoogleLogin = ({ onLoginAttempt }) => {
  const [googleClientId, setGoogleClientId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const clientId = await getGoogleClientId();
        setGoogleClientId(clientId);
      } catch (error) {
        console.error("Google 클라이언트 ID 가져오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientId();
  }, []);

  if (isLoading || !googleClientId) {
    return (
      <button className="lgs-social-btn lgs-google" disabled>
        <span className="lgs-social-icon">G</span>
        로딩 중...
      </button>
    );
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <GoogleLoginButton onLoginAttempt={onLoginAttempt} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLogin;
