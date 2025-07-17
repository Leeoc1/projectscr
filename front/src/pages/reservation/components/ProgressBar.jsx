import React from "react";
import "../style/ProgressBar.css";

const ProgressBar = ({
  currentStep = 0,
  steps = ["날짜/극장", "인원/좌석", "결제"],
}) => {
  const progressPercentage = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="progress-bar">
      <div className="card p-4 shadow-sm">
        <div className="progress-wrapper mb-3"></div>
        <div className="progress-steps d-flex justify-content-between align-items-center position-relative">
          {steps.map((step, idx) => {
            const stepClass = `progress-step text-center ${
              idx === currentStep
                ? "active"
                : idx < currentStep
                ? "completed"
                : ""
            }`.trim();
            return (
              <div key={step} className={stepClass}>
                <span className="step-number badge rounded-pill">
                  {idx + 1}
                </span>
                <p className="step-title small">{step}</p>
              </div>
            );
          })}
          <div
            className="progress-line"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
