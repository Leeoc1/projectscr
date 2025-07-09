import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchAllNotices, fetchAllFaqs } from '../../../api/api';
import Pagination from './Pagination';
import NoticeItem from './NoticeItem';
import TabNavigation from './TabNavigation';
import '../styles/NoticePage.css';
import Header from '../../../shared/Header';

const NoticePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notices, setNotices] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [activeTab, setActiveTab] = useState('notice');
  const [currentPage, setCurrentPage] = useState(1);
  const [openedFaqIndex, setOpenedFaqIndex] = useState(null);
  
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchAllNotices().then(setNotices);
    fetchAllFaqs().then(setFaqs);
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/notice/faq') {
      setActiveTab('faq');
    } else {
      setActiveTab('notice');
    }
    setCurrentPage(1);
    setOpenedFaqIndex(null);
  }, [location.pathname]);

  const currentData = (activeTab === 'notice' ? notices : faqs)
    .sort((a, b) => b[activeTab === 'notice' ? 'noticenum' : 'faqnum'] - a[activeTab === 'notice' ? 'noticenum' : 'faqnum'])
    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const totalPages = Math.ceil((activeTab === 'notice' ? notices : faqs).length / ITEMS_PER_PAGE);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setOpenedFaqIndex(null); // 탭 변경 시 열린 FAQ 닫기
    navigate(tab === 'faq' ? '/notice/faq' : '/notice/notice');
  };

  // 글로벌 인덱스(전체 데이터 기준)로 드롭다운 상태 관리
  const handleFaqToggle = (globalIndex) => {
    if (openedFaqIndex === globalIndex) {
      setOpenedFaqIndex(null);
    } else {
      setOpenedFaqIndex(globalIndex);
    }
  };

  // 전체 데이터에서의 글로벌 인덱스 계산
  const baseIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  // 전체 건수 표시 텍스트
  const totalCount = activeTab === 'notice' ? notices.length : faqs.length;

  return (
    <div className="notice-page">
      <Header />
      <div className="notice-container">
        <h1 className="notice-page-title">고객센터</h1>
        
        <TabNavigation 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <div className="tab-content">
          {/* 전체 건수 표시 */}
          <span className="notice-total-count">
            전체 {totalCount}건
          </span>
          <div className="notice-list">
            {currentData.map((item, index) => {
              const globalIndex = baseIndex + index;
              const key = activeTab === 'notice' ? item.noticenum : item.faqnum;
              return (
                <NoticeItem
                  key={key}
                  item={item}
                  index={globalIndex}
                  type={activeTab}
                  isExpanded={openedFaqIndex === globalIndex}
                  onToggle={handleFaqToggle}
                />
              );
            })}
          </div>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default NoticePage; 