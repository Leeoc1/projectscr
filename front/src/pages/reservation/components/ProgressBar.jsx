import React from "react";
import "../style/ProgressBar.css";

const ProgressBar = ({
  currentStep = 0,
  steps = ["날짜/극장", "인원/좌석", "결제"],
}) => {
  return (
    <div className="progress-bar">
      <div className="progress-steps">
        {steps.map((step, idx) => {
          let stepClass = "progress-step";
          if (idx === currentStep) {
            stepClass += " active";
          } else if (idx < currentStep) {
            stepClass += " completed";
          }

          return (
            <div key={step} className={stepClass}>
              <span className="step-number">{idx + 1}</span>
              <span className="step-title">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
