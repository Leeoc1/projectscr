import React from "react";
import "./BackNavigationModal.css";

const BackNavigationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  title = "🚫 페이지를 떠나시겠습니까?",
  message = "현재 진행 중인 작업이 있습니다.",
  submessage = "페이지를 떠나면 현재까지의 작업 내용이 사라집니다.",
  confirmText = "페이지 나가기",
  cancelText = "취소"
}) => {
  if (!isOpen) return null;

  const handleConfirmClick = () => {
    onConfirm();
    onClose();
  };

  const handleCancelClick = () => {
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="bnm-backdrop" onClick={handleBackdropClick}>
      <div className="bnm-modal">
        <div className="bnm-header">
          <h2 className="bnm-title">{title}</h2>
        </div>

        <div className="bnm-content">
          <p className="bnm-message">
            {message}
          </p>
          <p className="bnm-submessage">
            {submessage}
          </p>
        </div>

        <div className="bnm-buttons">
          <button 
            className="bnm-btn bnm-btn-cancel" 
            onClick={handleCancelClick}
          >
            {cancelText}
          </button>
          <button 
            className="bnm-btn bnm-btn-confirm" 
            onClick={handleConfirmClick}
          >
            {confirmText}
          </button>
        </div>

        <button 
          className="bnm-close-btn" 
          onClick={handleCancelClick}
          aria-label="모달 닫기"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default BackNavigationModal;
