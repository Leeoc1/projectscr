import React from "react";

const AddStaffPopup = ({
  setIsAddPopupOpen,
  formData,
  setFormData,
  handleAddStaff,
}) => {
  const DEPT = ["운영팀", "고객서비스", "매표팀", "상영관팀", "매점팀"];
  const POSITION = ["매니저", "대리", "사원"];
  const ROLE = ["지점 관리", "고객 응대", "매표", "상영관 관리", "매점 판매"];
  const STATUS = ["근무중", "휴가", "퇴사", "퇴근"];

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // form 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지
    handleAddStaff();
  };

  return (
    <div className="sup-popup-overlay">
      <div className="sup-popup-content">
        <div className="sup-popup-header">
          <h3>직원 추가</h3>
        </div>
        <form className="sup-popup-body" onSubmit={handleSubmit}>
          <div className="sup-staff-edit-form">
            <div className="sup-form-group">
              <label>직원 ID:</label>
              <input
                type="text"
                name="staffid"
                value={""}
                onChange={handleChange}
              />
            </div>
            <div className="sup-form-group">
              <label>이름:</label>
              <input
                type="text"
                name="staffname"
                value={""}
                onChange={handleChange}
              />
            </div>
            <div className="sup-form-group">
              <label>부서:</label>
              <select
                name="dept"
                value={""}
                onChange={handleChange}
              >
                <option value="">선택</option>
                {DEPT.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div className="sup-form-group">
              <label>지점명:</label>
              <input
                type="text"
                name="theater"
                value={""}
                onChange={handleChange}
              />
            </div>
            <div className="sup-form-group">
              <label>직급:</label>
              <select
                name="position"
                value={""}
                onChange={handleChange}
              >
                <option value="">선택</option>
                {POSITION.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>
            <div className="sup-form-group">
              <label>담당:</label>
              <select
                name="role"
                value={""}
                onChange={handleChange}
              >
                <option value="">선택</option>
                {ROLE.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="sup-form-group">
              <label>휴대폰:</label>
              <input
                type="text"
                name="phone"
                value={""}
                onChange={handleChange}
              />
            </div>
            <div className="sup-form-group">
              <label>이메일:</label>
              <input
                type="text"
                name="email"
                value={""}
                onChange={handleChange}
              />
            </div>
            <div className="sup-form-group">
              <label>채용 날짜:</label>
              <input
                type="text"
                name="hiredate"
                value={""}
                onChange={handleChange}
              />
            </div>
            <div className="sup-form-group">
              <label>고용 형태:</label>
              <input
                type="text"
                name="shifttype"
                value={""}
                onChange={handleChange}
              />
            </div>
            <div className="sup-form-group">
              <label>근무 상태:</label>
              <select
                name="status"
                value={""}
                onChange={handleChange}
              >
                <option value="">선택</option>
                {STATUS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="sup-popup-footer">
            <button
              className="sup-popup-btn-cancel"
              type="button"
              onClick={() => setIsAddPopupOpen(false)}
            >
              취소
            </button>
            <button className="sup-popup-btn-save" type="submit">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaffPopup;
