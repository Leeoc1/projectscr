import { useState } from "react";
import { noticesData, faqData } from "../../Data/mockData";
import "../../componentcss/homepagecomponentcss/Notice.css";

export default function Notice() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="nt-notice-faq-section">
      <div className="nt-notice-faq-container">
        <div className="nt-notice-faq-grid">
          {/* Announcements Section */}
          <div className="nt-section-column">
            <h2 className="nt-section-title">공지사항</h2>
            <div className="nt-section-content">
              {noticesData.map((notice, index) => (
                <div
                  key={index}
                  className={`nt-notice-item ${index === 0 ? "nt-featured" : ""}`}
                >
                  <h3 className="nt-notice-title">{notice.title}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="nt-section-column">
            <h2 className="nt-section-title">자주 묻는 질문</h2>
            <div className="nt-section-content">
              {faqData.map((faq, index) => (
                <div key={index} className="nt-faq-item">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`nt-faq-button ${openFAQ === index ? "nt-open" : ""}`}
                  >
                    <span className="nt-faq-question">{faq.question}</span>
                    <span className="nt-faq-icon">
                      {openFAQ === index ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={`nt-faq-content ${openFAQ === index ? "nt-open" : ""}`}
                  >
                    {openFAQ === index && (
                      <p className="nt-faq-answer">{faq.answer}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}