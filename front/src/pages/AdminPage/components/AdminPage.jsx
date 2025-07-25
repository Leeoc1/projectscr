import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SalesOverview from "./adminmain/SalesOverview";
import StaffManagement from "./StaffManagement/StaffManagement";
import UserManagement from "./UserManagement";
import MovieManagement from "./MovieManagement";
import ReservationManagement from "./ReservationManagement";
import Inquiries from "./Inquiries";
import EventManagement from "./EventManagement";
import AdminSidebar from "./AdminSideBar";
import AdminHeader from "./AdminHeader";
import TheaterManagement from "./TheaterManagement/TheaterManagement";
import { NotificationProvider } from "../../../contexts/NotificationContext";
import { getAdminToken } from "../../../api/adminApi";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("sales");
  const navigate = useNavigate();
  const location = useLocation();

  // 관리자 토큰 발급
  useEffect(() => {
    const fetchToken = async () => {
      const userid = localStorage.getItem("userid") || "master001";
      try {
        console.log("토큰 발급 시도 중...", userid);
        const token = await getAdminToken(userid);
        localStorage.setItem("adminToken", token);
        console.log("관리자 토큰 저장 완료:", token);
      } catch (e) {
        console.error("관리자 토큰 발급 실패:", e);
        console.error("에러 상세:", e.response?.data);
        alert(`관리자 인증 토큰 발급 실패: ${e.message}`);
        navigate("/");
      }
    };

    // 토큰 발급
    fetchToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // URL에서 탭 정보 추출
  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const tabFromUrl = pathSegments[pathSegments.length - 1];

    const validTabs = [
      "dashboard",
      "staff",
      "users",
      "theaters",
      "movies",
      "reservations",
      "inquiries",
      "events",
    ];

    if (validTabs.includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    } else if (location.pathname === "/admin") {
      setActiveTab("dashboard");
      navigate("/admin/dashboard", { replace: true });
    }
  }, [location.pathname, navigate]);

  // 탭 변경 시 URL 업데이트
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/admin/${tab}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <SalesOverview />;
      case "staff":
        return <StaffManagement />;
      case "users":
        return <UserManagement />;
      case "theaters":
        return <TheaterManagement />;
      case "movies":
        return <MovieManagement />;
      case "reservations":
        return <ReservationManagement />;
      case "inquiries":
        return <Inquiries />;
      case "events":
        return <EventManagement />;
      default:
        return <SalesOverview />;
    }
  };

  return (
    <NotificationProvider>
      <div className="adp-dashboard">
        <AdminHeader />
        <div className="adp-layout">
          <AdminSidebar activeTab={activeTab} setActiveTab={handleTabChange} />
          <div className="adp-main">{renderContent()}</div>
        </div>
      </div>
    </NotificationProvider>
  );
};

export default AdminPage;
