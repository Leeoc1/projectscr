import { useState } from "react";
import { noticesData, faqData } from "../../Data/mockData";
import "../../componentcss/homepagecomponentcss/Notice.css";

export default function Notice() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="notice-faq-section">
      <div className="notice-faq-container">
        <div className="notice-faq-grid">
          {/* Announcements Section */}
          <div className="section-column">
            <h2 className="section-title">공지사항</h2>
            <div className="section-content">
              {noticesData.map((notice, index) => (
                <div
                  key={index}
                  className={`notice-item ${index === 0 ? "featured" : ""}`}
                >
                  <h3 className="notice-title">{notice.title}</h3>
                  <p className="notice-date">{notice.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="section-column">
            <h2 className="section-title">자주 묻는 질문</h2>
            <div className="section-content">
              {faqData.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="faq-button"
                  >
                    <span className="faq-question">{faq.question}</span>
                    <span className="faq-icon">
                      {openFAQ === index ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={`faq-content ${openFAQ === index ? "open" : ""}`}
                  >
                    {openFAQ === index && (
                      <p className="faq-answer">{faq.answer}</p>
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
