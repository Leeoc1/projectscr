import React, { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
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

  const handleUsernameCheck = () => {
    if (!formData.username) {
      alert("아이디를 입력해주세요.");
      return;
    }

    // 아이디 중복 체크 로직 (백엔드 구현 없이 버튼만)
    console.log("아이디 중복 체크:", formData.username);

    // 시뮬레이션: 랜덤하게 사용 가능/불가능 결정
    const isAvailable = Math.random() > 0.3;

    setValidationState({
      ...validationState,
      usernameChecked: true,
      usernameAvailable: isAvailable,
    });

    if (isAvailable) {
      alert("사용 가능한 아이디입니다.");
    } else {
      alert("이미 사용 중인 아이디입니다.");
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

  const handleSignup = (e) => {
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

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 회원가입 로직 (백엔드 구현 없이 버튼만)
    console.log("회원가입 시도:", formData);
    alert("회원가입이 완료되었습니다!");
    navigate("/login"); // 페이지 이동
  };

  return (
    <div className="rg-signup-page">
      <div className="rg-signup-container">
        <div className="rg-signup-header">
          <h1 className="rg-signup-title">CineMax</h1>
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
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

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
