import React from "react";
import "../style/ProgressBar.css";

const ProgressBar = ({ currentStep = 0, steps = ["날짜/극장", "인원/좌석", "결제"] }) => {
  return (
    <div className="progress-bar">
      <div className="progress-steps">
        {steps.map((step, idx) => (
          <div
            key={step}
            className={`progress-step${idx === currentStep ? " active" : ""}`}
          >
            <span className="step-number">{idx + 1}</span>
            <span className="step-title">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar; 