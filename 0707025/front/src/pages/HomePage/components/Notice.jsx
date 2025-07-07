import { useEffect, useState } from "react";
import "../styles/Notice.css";
import { useNavigate } from "react-router-dom";
import { fetchTop5Notices, fetchTop5Faqs } from "../../../api/api";

const Notice = () => {
  const navigate = useNavigate();
  const goNotice = () => navigate("/notice");

  const [notices, setNotices] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetchTop5Notices().then(setNotices);
    fetchTop5Faqs().then(setFaqs);
  }, []);

  return (
    <section className="nt-notice-faq-section">
      <div className="nt-notice-faq-container">
        <div className="nt-notice-faq-grid">
          {/* 공지사항 */}
          <div className="nt-section-column">
            <div className="nt-section-header">
              <h2 className="nt-section-title">공지사항</h2>
              <p className="nt-section-subtitle" onClick={goNotice}>더보기 &gt;</p>
            </div>
            <div className="nt-section-content">
              {notices.map((title, index) => (
                <div key={index} className={`nt-faq-item ${index === 0 ? "nt-featured" : ""}`}>
                  <button className="nt-button">
                    <span className="nt-question">{title}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* FAQ */}
          <div className="nt-section-column">
            <div className="nt-section-header">
              <h2 className="nt-section-title">자주 묻는 질문</h2>
              <p className="nt-section-subtitle" onClick={goNotice}>더보기 &gt;</p>
            </div>
            <div className="nt-section-content">
              {faqs.map((question, index) => (
                <div key={index} className="nt-faq-item">
                  <button className="nt-button">
                    <span className="nt-question">{question}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notice;