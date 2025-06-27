import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="adp-main">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminPage;
