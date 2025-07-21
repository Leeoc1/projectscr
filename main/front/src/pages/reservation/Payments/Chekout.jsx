import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./paycss/pay.css";

// TODO: clientKey는 개발자센터의 결제위젯 연동 키 > 클라이언트 키로 바꾸세요.
// TODO: 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요. 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = generateRandomString();

export function CheckoutPage() {
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 0,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);

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
    console.log("=== Checkout 페이지의 예약 정보 ===");
    console.log("전체 예약 정보:", reservationInfo);
    console.log("영화 제목:", reservationInfo.movienm);
    console.log("극장명:", reservationInfo.cinemanm);
    console.log("상영관:", reservationInfo.screenname);
    console.log("상영 시간:", reservationInfo.starttime);
    console.log("러닝타임:", reservationInfo.runningtime);
    console.log("선택된 좌석:", reservationInfo.selectedSeats);
    console.log("인원 정보:", reservationInfo.guestCount);
    console.log("총 인원:", reservationInfo.totalGuests);
    console.log("최종 결제 금액:", price);
    console.log("================================");
  }, []);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        // ------  SDK 초기화 ------
        // @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
        const tossPayments = await loadTossPayments(clientKey);

        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentswidgets
        const widgets = tossPayments.widgets({
          customerKey,
        });
        // 비회원 결제
        // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

        setWidgets(widgets);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    }

    fetchPaymentWidgets();
  }, [clientKey, customerKey]);

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
            disabled={!ready}
            onClick={async () => {
              try {
                // 결제 요청 시 amount.value(즉, finalPrice)로 결제
                await widgets.requestPayment({
                  orderId: generateRandomString(),
                  orderName: "영화 예매",
                  successUrl: window.location.origin + "/success",
                  failUrl: window.location.origin + "/fail",
                  customerEmail: "customer123@gmail.com",
                  customerName: "전요한",
                  customerMobilePhone: "01012341234",
                });
              } catch (error) {
                console.error(error);
              }
            }}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}

function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}
