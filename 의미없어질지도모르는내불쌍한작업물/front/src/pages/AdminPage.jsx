import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SalesOverview from "../admin/SalesOverview";
import StaffManagement from "../admin/StaffManagement";
import UserManagement from "../admin/UserManagement";
import TheaterManagement from "../admin/TheaterManagement";
import MovieManagement from "../admin/MovieManagement";
import ScreenManagement from "../admin/ScreenManagement";
import ReservationManagement from "../admin/ReservationManagement";
import Inquiries from "../admin/Inquiries";
import EventManagement from "../admin/EventManagement";
import AdminSidebar from "../admin/AdminSideBar";
import AdminHeader from "../admin/AdminHeader";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("sales");
  const navigate = useNavigate();
  const location = useLocation();

  // URL에서 탭 정보 추출
  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const tabFromUrl = pathSegments[pathSegments.length - 1];

    const validTabs = [
      "sales",
      "staff",
      "users",
      "theaters",
      "movies",
      "screens",
      "reservations",
      "inquiries",
      "events",
    ];

    if (validTabs.includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    } else if (location.pathname === "/admin") {
      setActiveTab("sales");
      navigate("/admin/sales", { replace: true });
    }
  }, [location.pathname, navigate]);

  // 탭 변경 시 URL 업데이트
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/admin/${tab}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "sales":
        return <SalesOverview />;
      case "staff":
        return <StaffManagement />;
      case "users":
        return <UserManagement />;
      case "theaters":
        return <TheaterManagement />;
      case "movies":
        return <MovieManagement />;
      case "screens":
        return <ScreenManagement />;
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
    <div className="adp-dashboard">
      <AdminHeader />
      <div className="adp-layout">
        <AdminSidebar activeTab={activeTab} setActiveTab={handleTabChange} />
        <div className="adp-main">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminPage;
