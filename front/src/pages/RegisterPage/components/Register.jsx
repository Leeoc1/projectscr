import React, { useState } from "react";
import "../styles/Register.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  validateUsernameLength,
  validateUsernameFormat,
  validatePasswordLength,
  validatePasswordStrength,
} from "./RegisterValidation";
import { isAvailableUserId, registerUser } from "../../../api/userApi";
import logoImg from "../../../images/logo_2.png";

const Register = () => {
  // 네이버 로그인 시 회원정보 없을 때 넘어옴
  const location = useLocation();
  const naverUserInfo = location.state?.naverUserInfo; // 넘어온 네이버 정보

  const navigate = useNavigate(); // useNavigate 훅 사용
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    name: "",
    birthDate: "",
    verificationCode: "",
  });

  const [validationState, setValidationState] = useState({
    usernameChecked: false,
    usernameAvailable: false,
    usernameError: false,
    passwordError: false,
    phoneVerified: false,
    verificationSent: false,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // 아이디 입력 시 중복 체크 상태 초기화
    if (e.target.name === "username") {
      setValidationState({
        ...validationState,
        usernameChecked: false,
        usernameAvailable: false,
      });
    }
  };

  // 아이디 필드에서 포커스 벗어날 때 유효성 검사
  const validateUsernameBlur = () => {
    if (formData.username) {
      const lengthValid = validateUsernameLength(formData.username);
      const formatValid = validateUsernameFormat(formData.username);

      if (!lengthValid || !formatValid) {
        setValidationState({
          ...validationState,
          usernameError: true,
        });
      } else {
        setValidationState({
          ...validationState,
          usernameError: false,
        });
      }
    }
  };

  // 비밀번호 필드에서 포커스 벗어날 때 유효성 검사
  const validatePasswordBlur = () => {
    if (formData.password) {
      const lengthValid = validatePasswordLength(formData.password);
      const strengthValid = validatePasswordStrength(formData.password);

      if (!lengthValid || !strengthValid) {
        setValidationState({
          ...validationState,
          passwordError: true,
        });
      } else {
        setValidationState({
          ...validationState,
          passwordError: false,
        });
      }
    }
  };

  const handleUsernameCheck = async () => {
    if (!formData.username) {
      alert("아이디를 입력해주세요.");
      return;
    }

    if (validationState.usernameError) {
      alert("아이디 형식이 올바르지 않습니다.");
      return;
    }

    try {
      const response = await isAvailableUserId(formData.username);

      if (response) {
        // 사용가능한 아이디
        setValidationState({
          ...validationState,
          usernameChecked: true,
          usernameAvailable: true,
        });
        alert("사용 가능한 아이디입니다.");
      } else {
        // 사용불가능한 아이디
        setValidationState({
          ...validationState,
          usernameChecked: true,
          usernameAvailable: false,
        });
        alert("이미 사용 중인 아이디입니다.");
      }
    } catch (error) {
      console.error("아이디 중복 체크 오류:", error);
    }
  };

  const handlePhoneVerification = () => {
    if (!formData.phone) {
      alert("전화번호를 입력해주세요.");
      return;
    }

    // 전화번호 인증 코드 발송 로직 (백엔드 구현 없이 버튼만)
    console.log("인증번호 발송:", formData.phone);

    setValidationState({
      ...validationState,
      verificationSent: true,
    });

    alert("인증번호가 발송되었습니다.");
  };

  const handleVerificationCodeCheck = () => {
    if (!formData.verificationCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    // 인증번호 확인 로직 (백엔드 구현 없이 버튼만)
    console.log("인증번호 확인:", formData.verificationCode);

    // 시뮬레이션: 1234가 맞는 코드라고 가정
    const isValid = formData.verificationCode === "1234";

    if (isValid) {
      setValidationState({
        ...validationState,
        phoneVerified: true,
      });
      alert("전화번호 인증이 완료되었습니다.");
    } else {
      alert("인증번호가 일치하지 않습니다.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!validationState.usernameAvailable) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }

    if (!validationState.phoneVerified) {
      alert("전화번호 인증을 완료해주세요.");
      return;
    }

    if (validationState.passwordError) {
      alert("비밀번호 형식이 올바르지 않습니다.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 회원가입 요청
    try {
      const userData = {
        userid: formData.username,
        userpw: formData.password,
        username: formData.name,
        email: formData.email,
        phone: formData.phone,
        birth: formData.birthDate,
      };
      const response = await registerUser(userData);
      if (response) {
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      } else {
        alert("회원가입에 실패했습니다.");
        navigate("/login");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="rg-signup-page">
      <div className="rg-signup-container">
        <div className="rg-signup-header">
          <img
            src={logoImg}
            alt="logo"
            className="l-logo-img"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <p className="rg-signup-subtitle">회원가입</p>
        </div>

        <div className="rg-signup-form-container">
          <form className="rg-signup-form" onSubmit={handleSignup}>
            <div className="rg-form-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="이름을 입력하세요"
                required
              />
            </div>

            <div className="rg-form-group">
              <label htmlFor="birthDate">생년월일</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="rg-form-group">
              <label htmlFor="username">아이디</label>
              <div className="rg-input-with-button">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  onBlur={validateUsernameBlur}
                  placeholder="아이디를 입력하세요"
                  required
                />
                <button
                  type="button"
                  className="rg-check-btn"
                  onClick={handleUsernameCheck}
                >
                  중복확인
                </button>
              </div>
              {validationState.usernameError && (
                <p className="rg-validation-message rg-error">
                  아이디는 6~12자 영문, 숫자, 특수문자만 가능합니다.
                </p>
              )}
              {validationState.usernameChecked && (
                <p
                  className={`rg-validation-message ${
                    validationState.usernameAvailable
                      ? "rg-success"
                      : "rg-error"
                  }`}
                >
                  {validationState.usernameAvailable
                    ? "사용 가능한 아이디입니다."
                    : "이미 사용 중인 아이디입니다."}
                </p>
              )}
            </div>

            <div className="rg-form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={validatePasswordBlur}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
            {validationState.passwordError && (
              <p className="rg-validation-message rg-error">
                비밀번호는 8~20자 영문, 숫자, 특수문자만 가능합니다.
              </p>
            )}

            <div className="rg-form-group">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="비밀번호를 다시 입력하세요"
                required
              />
            </div>

            <div className="rg-form-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="이메일을 입력하세요"
                required
              />
            </div>

            <div className="rg-form-group">
              <label htmlFor="phone">전화번호</label>
              <div className="rg-input-with-button">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="전화번호를 입력하세요"
                  required
                />
                <button
                  type="button"
                  className="rg-verify-btn"
                  onClick={handlePhoneVerification}
                  disabled={validationState.phoneVerified}
                >
                  {validationState.phoneVerified ? "인증완료" : "인증하기"}
                </button>
              </div>
            </div>

            {validationState.verificationSent &&
              !validationState.phoneVerified && (
                <div className="rg-form-group">
                  <div className="rg-input-with-button">
                    <input
                      type="text"
                      id="verificationCode"
                      name="verificationCode"
                      value={formData.verificationCode}
                      onChange={handleInputChange}
                      placeholder="인증번호를 입력하세요 (1234)"
                    />
                    <button
                      type="button"
                      className="rg-check-btn"
                      onClick={handleVerificationCodeCheck}
                    >
                      확인
                    </button>
                  </div>
                </div>
              )}

            <button type="submit" className="rg-signup-btn">
              회원가입
            </button>
          </form>

          <div className="rg-login-link">
            <p>
              이미 회원이신가요?
              <button
                className="rg-link-btn"
                onClick={() => navigate("/login")}
              >
                로그인
              </button>
            </p>
          </div>

          <div className="rg-back-to-home">
            <button className="rg-back-btn" onClick={() => navigate("/")}>
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
