import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BackNavigationModal from "../../../utils/BackNavigationModal";
import { getCurrentUserIdForPayment } from "../../../utils/tokenUtils";
import { getUserInfo } from "../../../api/userApi";
import {
  cleanupOnReservationCancel,
  logSessionState,
} from "../../../utils/sessionCleanup";
import "./paycss/pay.css";

// TODO: clientKey는 개발자센터의 결제위젯 연동 키 > 클라이언트 키로 바꾸세요.
// TODO: 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요. 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export function CheckoutPage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 0,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);
  const [showBackModal, setShowBackModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [customerKey, setCustomerKey] = useState(null);
  const [orderId] = useState(generateRandomString());
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const beforeUnloadHandlerRef = useRef(null);

  // 결제 페이지 접근 시 로그인 상태 로깅
  useEffect(() => {
    console.log("=== 결제 페이지 접근 ===");
    console.log("localStorage token:", localStorage.getItem("userid"));
    console.log("localStorage isLoggedIn:", localStorage.getItem("isLoggedIn"));
    console.log("sessionStorage token:", sessionStorage.getItem("token"));
    console.log("sessionStorage role:", sessionStorage.getItem("role"));

    // 세션 상태 로깅
    logSessionState("(결제 페이지 접근)");

    // 로그인 상태 변화 감지
    const loginStatusMonitor = setInterval(() => {
      const currentLoginStatus = localStorage.getItem("isLoggedIn");
      const currentUserid = localStorage.getItem("userid");

      if (currentLoginStatus !== "true" || !currentUserid) {
        console.log("🚨 결제 페이지에서 로그인 상태 변화 감지!");
        console.log("현재 로그인 상태:", currentLoginStatus);
        console.log("현재 userid:", currentUserid);
        console.log("페이지를 홈으로 리다이렉트합니다.");
        clearInterval(loginStatusMonitor);

        // 로그인 상태가 변경되면 즉시 홈으로 이동
        navigate("/", { replace: true });
      }
    }, 1000); // 1초마다 체크

    return () => {
      clearInterval(loginStatusMonitor);
    };
  }, []);

  // 뒤로가기 방지 및 세션 보안 처리 (결제 위젯 페이지)
  useEffect(() => {
    // 결제 위젯에서 뒤로가기 방지 (더 엄격하게)
    const handlePopState = (event) => {
      event.preventDefault();

      // 모달을 표시하고 히스토리를 다시 푸시
      setShowBackModal(true);
      window.history.pushState(null, "", window.location.href);
    };

    // 페이지 이탈 방지 (결제 진행 중)
    const handleBeforeUnload = (event) => {
      if (isPaymentLoading) {
        event.preventDefault();
        event.returnValue = "결제가 진행 중입니다. 페이지를 벗어나시겠습니까?";
        console.log("⚠️ 결제 진행 중 페이지 이탈 시도 감지");
      }
    };

    // ref에 핸들러 저장
    beforeUnloadHandlerRef.current = handleBeforeUnload;

    // 히스토리 조작으로 뒤로가기 차단
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate, isPaymentLoading]);

  // 페이지 로드 시 body 백그라운드 설정
  useEffect(() => {
    document.body.style.backgroundColor = "#e8f3ff";

    // 컴포넌트 언마운트 시 원래 스타일로 복원
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    const reservationInfo = JSON.parse(
      sessionStorage.getItem("finalReservationInfo") || "{}"
    );
    // finalPrice가 있으면 그 값을 사용, 없으면 totalPrice 사용
    const price =
      reservationInfo.finalPrice !== undefined
        ? reservationInfo.finalPrice
        : reservationInfo.totalPrice;
    setAmount({
      currency: "KRW",
      value: price || 0,
    });
  }, []);

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      console.log("=== 사용자 정보 가져오기 시작 ===");
      console.log(
        "localStorage isLoggedIn:",
        localStorage.getItem("isLoggedIn")
      );
      console.log("localStorage userid:", localStorage.getItem("userid"));

      try {
        const userid = await getCurrentUserIdForPayment();
        console.log("getCurrentUserIdForPayment 결과:", userid);

        if (userid) {
          // customerKey는 토스페이먼츠에서 사용할 수 있는 형태로 변환
          // 특수문자나 공백, 점 등을 제거하고 영숫자만 사용
          const sanitizedCustomerKey = userid
            .replace(/[^a-zA-Z0-9]/g, "")
            .substring(0, 50);
          console.log("원본 userid:", userid);
          console.log("sanitized customerKey:", sanitizedCustomerKey);

          // customerKey가 비어있거나 너무 짧으면 기본값 사용
          const finalCustomerKey =
            sanitizedCustomerKey.length >= 3
              ? sanitizedCustomerKey
              : `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

          console.log("최종 customerKey:", finalCustomerKey);
          setCustomerKey(finalCustomerKey);

          try {
            const userData = await getUserInfo(userid);
            console.log("getUserInfo 결과:", userData);
            setUserInfo(userData);
          } catch (error) {
            console.error("getUserInfo 에러:", error);
            // 사용자 정보 로드 실패해도 결제는 진행할 수 있도록 기본값 설정
            setUserInfo({
              userid: userid,
              username: "사용자",
              email: "user@example.com",
              phone: "01012341234",
            });
          }
        } else {
          console.log("❌ userid가 null이므로 임시 customerKey 생성");
          // userid를 못 가져온 경우 임시 customerKey 생성
          const tempCustomerKey = `temp_${Date.now()}_${Math.random()
            .toString(36)
            .substr(2, 9)}`;
          setCustomerKey(tempCustomerKey);
          setUserInfo({
            userid: "temp_user",
            username: "게스트",
            email: "guest@example.com",
            phone: "01012341234",
          });
        }
      } catch (error) {
        console.error("사용자 정보 가져오기 전체 에러:", error);
        // 모든 과정이 실패한 경우 최후 수단
        const emergencyCustomerKey = `emergency_${Date.now()}`;
        setCustomerKey(emergencyCustomerKey);
        setUserInfo({
          userid: "emergency_user",
          username: "게스트",
          email: "guest@example.com",
          phone: "01012341234",
        });
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      if (!customerKey) return;

      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({
        customerKey,
      });
      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, [customerKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }

      // ------  주문서의 결제 금액 설정 ------
      // TODO: 위젯의 결제금액을 결제하려는 금액으로 초기화하세요.
      // TODO: renderPaymentMethods, renderAgreement, requestPayment 보다 반드시 선행되어야 합니다.
      await widgets.setAmount(amount);

      // ------  결제 UI 렌더링 ------
      // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderpaymentmethods
      await widgets.renderPaymentMethods({
        selector: "#payment-method",
        // 렌더링하고 싶은 결제 UI의 variantKey
        // 결제 수단 및 스타일이 다른 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
        // @docs https://docs.tosspayments.com/guides/v2/payment-widget/admin#새로운-결제-ui-추가하기
        variantKey: "DEFAULT",
      });

      // ------  이용약관 UI 렌더링 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
      await widgets.renderAgreement({
        selector: "#agreement",
        variantKey: "AGREEMENT",
      });

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  // 모달 핸들러 함수들
  const handleBackModalClose = () => {
    setShowBackModal(false);
  };

  const handleBackModalConfirm = () => {
    console.log("🚫 결제 취소 - 예매 관련 정보 정리");

    // 체계적인 세션 정리
    cleanupOnReservationCancel();

    navigate("/", { replace: true }); // 홈으로 이동
  };

  return (
    <div className="pay-body">
      <div className="wrapper">
        <div className="box_section">
          {/* 결제 UI */}
          <div id="payment-method" />
          {/* 이용약관 UI */}
          <div id="agreement" />

          {/* 최종 결제 금액 표시 */}
          <div
            className="checkout-final-amount"
            style={{ fontSize: "24px", fontWeight: "bold", marginTop: "30px" }}
          >
            최종 결제 금액: {amount.value.toLocaleString()}원
          </div>

          {/* 결제하기 버튼 */}
          <button
            className="button"
            style={{ marginTop: "30px" }}
            disabled={!ready || isPaymentLoading || amount.value <= 0}
            onClick={async () => {
              try {
                setIsPaymentLoading(true);

                console.log("=== 결제 버튼 클릭 ===");
                console.log("결제 금액:", amount.value);
                console.log("결제 준비 상태:", ready);
                console.log("사용자 정보:", userInfo);

                // 결제 금액 검증
                if (amount.value <= 0) {
                  alert("결제 금액이 올바르지 않습니다.");
                  return;
                }

                // 사용자 정보 검증
                if (!userInfo) {
                  alert(
                    "사용자 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요."
                  );
                  return;
                }

                // 위젯 준비 상태 검증
                if (!widgets) {
                  alert(
                    "결제 시스템을 준비하는 중입니다. 잠시 후 다시 시도해주세요."
                  );
                  return;
                }

                console.log(
                  "결제 전 로그인 상태:",
                  localStorage.getItem("isLoggedIn")
                );
                console.log("결제 전 userid:", localStorage.getItem("userid"));
                console.log("결제 시 userInfo:", userInfo);

                // 이메일 형식 검증 함수
                const isValidEmail = (email) => {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  return emailRegex.test(email);
                };

                // 안전한 이메일 처리
                const getValidEmail = (userEmail) => {
                  if (userEmail && isValidEmail(userEmail)) {
                    return userEmail;
                  }
                  return "guest@example.com"; // 기본값
                };

                const paymentData = {
                  orderId: orderId,
                  orderName: "영화 예매",
                  successUrl: window.location.origin + "/success",
                  failUrl: window.location.origin + "/fail",
                  customerEmail: getValidEmail(userInfo?.email),
                  customerName: userInfo?.username || "게스트",
                  customerMobilePhone:
                    userInfo?.phone?.replace(/[-\s]/g, "") || "01012341234",
                };

                console.log("결제 요청 데이터:", paymentData);

                // 결제 요청 데이터를 sessionStorage에 저장 (success/fail 페이지에서 확인용)
                sessionStorage.setItem(
                  "paymentRequestData",
                  JSON.stringify(paymentData)
                );

                // 결제 요청 전 현재 상태 로깅
                console.log("=== 결제 요청 직전 상태 ===");
                console.log("isLoggedIn:", localStorage.getItem("isLoggedIn"));
                console.log("userid:", localStorage.getItem("userid"));
                console.log("customerKey:", customerKey);
                console.log("현재 URL:", window.location.href);
                console.log("widgets 객체:", widgets);

                // 결제 요청 시 amount.value(즉, finalPrice)로 결제
                console.log("결제 요청 시작...");

                try {
                  console.log("🔄 결제 성공 시 beforeunload 이벤트 제거");
                  if (beforeUnloadHandlerRef.current) {
                    window.removeEventListener(
                      "beforeunload",
                      beforeUnloadHandlerRef.current
                    );
                    console.log("✅ beforeunload 이벤트 제거 완료");
                  }

                  const paymentResult = await widgets.requestPayment(
                    paymentData
                  );
                  console.log("✅ 결제 요청 성공:", paymentResult);
                  console.log(
                    "결제 요청 완료 - 이 로그가 보이면 성공 페이지로 리다이렉트되어야 함"
                  );
                } catch (paymentError) {
                  console.error("💳 결제 과정 중 에러:", paymentError);
                  console.log("결제 에러 코드:", paymentError.code);
                  console.log("결제 에러 메시지:", paymentError.message);

                  // 결제 취소나 실패 시 구체적인 처리
                  if (paymentError.code === "USER_CANCEL") {
                    console.log("사용자가 결제를 취소함");
                    alert("결제가 취소되었습니다.");
                    return;
                  } else if (paymentError.code === "INVALID_CARD") {
                    console.log("유효하지 않은 카드");
                    alert("유효하지 않은 카드 정보입니다.");
                    return;
                  } else {
                    console.log("기타 결제 에러:", paymentError);
                    throw paymentError; // 다른 에러는 상위로 전파
                  }
                }
              } catch (error) {
                console.error("결제 요청 오류:", error);
                console.log("오류 상세:", error.message, error.code);

                // 사용자에게 구체적인 오류 메시지 제공
                let errorMessage = "결제 요청 중 오류가 발생했습니다.";

                if (error.code === "USER_CANCEL") {
                  errorMessage = "결제가 취소되었습니다.";
                } else if (error.code === "INVALID_CARD") {
                  errorMessage = "유효하지 않은 카드 정보입니다.";
                } else if (error.message) {
                  errorMessage = `결제 오류: ${error.message}`;
                }

                alert(errorMessage);

                console.log(
                  "결제 오류 후 로그인 상태:",
                  localStorage.getItem("isLoggedIn")
                );
              } finally {
                setIsPaymentLoading(false);
              }
            }}
          >
            {isPaymentLoading ? "결제 진행 중..." : "결제하기"}
          </button>
        </div>
      </div>

      {/* 뒤로가기 확인 모달 */}
      <BackNavigationModal
        isOpen={showBackModal}
        onClose={handleBackModalClose}
        onConfirm={handleBackModalConfirm}
        title="🚫 결제를 취소하시겠습니까?"
        message="결제를 취소하시겠습니까?"
        submessage="모든 선택 정보가 초기화되고 홈으로 이동합니다."
        confirmText="결제 취소"
        cancelText="계속 진행"
      />
    </div>
  );
}

function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}
