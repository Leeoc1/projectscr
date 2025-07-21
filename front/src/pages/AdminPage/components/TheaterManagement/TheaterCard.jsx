import React from "react";

const TheaterCard = ({ theater, onDetailClick, onEdit, onDelete }) => {
  return (
    <div className="thm-theater-card">
      <h3>{theater.cinemanm}</h3>
      <div className="thm-theater-info">
        <p>
          <strong>주소:</strong> {theater.address}
        </p>
        <p>
          <strong>전화번호:</strong> {theater.tel}
        </p>
      </div>
      <div className="thm-theater-actions">
        <button className="adp-btn-edit" onClick={() => onEdit(theater)}>
          수정
        </button>
        <button className="adp-btn-view" onClick={onDetailClick}>
          상세보기
        </button>
        <button className="adp-btn-delete" onClick={() => onDelete(theater)}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default TheaterCard;
