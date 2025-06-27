import React from "react";
import "../admincss/AdminSideBar.css";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const sidebarItems = [
    { id: "sales", label: "매출 현황", icon: "📊" },
    { id: "staff", label: "직원 관리", icon: "👥" },
    { id: "users", label: "회원 관리", icon: "👤" },
    { id: "theaters", label: "극장 관리", icon: "🏢" },
    { id: "movies", label: "영화 관리", icon: "🎬" },
    { id: "screens", label: "상영관 관리", icon: "🎭" },
    { id: "reservations", label: "예약 관리", icon: "🎫" },
    { id: "inquiries", label: "고객 지원", icon: "💬" },
    { id: "events", label: "이벤트 관리", icon: "🎉" },
  ];

  return (
    <div className="adsb-sidebar">
      <nav className="adsb-sidebar-nav">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            className={`adsb-sidebar-item ${
              activeTab === item.id ? "adsb-active" : ""
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="adsb-sidebar-icon">{item.icon}</span>
            <span className="adsb-sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
