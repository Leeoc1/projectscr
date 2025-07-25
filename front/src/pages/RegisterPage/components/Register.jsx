import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateUsernameLength,
  validateUsernameFormat,
  validatePasswordLength,
  validatePasswordStrength,
} from "./RegisterValidation";
import { isAvailableUserId, registerUser } from "../../../api/userApi";
import SmsAuthForm from "./SmsAuthForm";
import RegisterBirth from "./RegisterBirth";
import Toast from "../../../components/Toast";
import logoImg from "../../../images/logo_2.png";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

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

  const setBirthDate = React.useCallback(
    (val) => setFormData((f) => ({ ...f, birthDate: val })),
    []
  );

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "username") {
      setValidationState({
        ...validationState,
        usernameChecked: false,
        usernameAvailable: false,
      });
    }
  };

  const validateUsernameBlur = () => {
    if (formData.username) {
      const lengthValid = validateUsernameLength(formData.username);
      const formatValid = validateUsernameFormat(formData.username);

      setValidationState({
        ...validationState,
        usernameError: !lengthValid || !formatValid,
      });
    }
  };

  const validatePasswordBlur = () => {
    if (formData.password) {
      const lengthValid = validatePasswordLength(formData.password);
      const strengthValid = validatePasswordStrength(formData.password);

      setValidationState({
        ...validationState,
        passwordError: !lengthValid || !strengthValid,
      });
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
      setValidationState({
        ...validationState,
        usernameChecked: true,
        usernameAvailable: response.available,
      });
      alert(
        response.available
          ? "사용 가능한 아이디입니다."
          : "이미 사용 중인 아이디입니다."
      );
    } catch (error) {
      console.error("아이디 중복 체크 오류:", error);
      alert("아이디 중복 체크에 실패했습니다.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

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
        setToastMessage(
          "환영합니다! 회원가입이 완료되었습니다.\n신규회원 쿠폰이 발급되었습니다."
        );
        setToastType("success");
        setShowToast(true);

        // 3초 후 로그인 페이지로 이동
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setToastMessage("회원가입에 실패했습니다.");
        setToastType("error");
        setShowToast(true);
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      setToastMessage("회원가입에 실패했습니다.");
      setToastType("error");
      setShowToast(true);
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
              <RegisterBirth
                birthDate={formData.birthDate}
                setBirthDate={setBirthDate}
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
              {validationState.passwordError && (
                <p className="rg-validation-message rg-error">
                  비밀번호는 8~20자 영문, 숫자, 특수문자만 가능합니다.
                </p>
              )}
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

            <SmsAuthForm
              formData={formData}
              setFormData={setFormData}
              validationState={validationState}
              setValidationState={setValidationState}
            />

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

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Register;
