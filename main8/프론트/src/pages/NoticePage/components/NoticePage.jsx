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
  
  // 상수
  const ITEMS_PER_PAGE = 10;
  const TAB_CONFIG = {
    notice: { sortKey: 'noticenum', url: '/notice/notice' },
    faq: { sortKey: 'faqnum', url: '/notice/faq' }
  };

  useEffect(() => {
    fetchAllNotices().then(setNotices);
    fetchAllFaqs().then(setFaqs);
  }, []);

  // URL 경로에서 탭 정보 읽기
  useEffect(() => {
    const path = location.pathname;
    if (path === '/notice/faq') {
      setActiveTab('faq');
    } else if (path === '/notice/notice') {
      setActiveTab('notice');
    } else if (path === '/notice') {
      setActiveTab('notice'); // 기본값
    }
    setCurrentPage(1); // 탭 변경 시 1페이지로 리셋
  }, [location.pathname]);

  // 데이터 처리 함수들
  const sortData = (data, sortKey) => {
    if (!data || !Array.isArray(data)) return [];
    return data.sort((a, b) => b[sortKey] - a[sortKey]);
  };

  const getCurrentData = () => {
    const data = activeTab === 'notice' ? notices : faqs;
    const sortKey = TAB_CONFIG[activeTab].sortKey;
    return sortData(data, sortKey);
  };

  const getCurrentPageData = () => {
    const allData = getCurrentData();
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allData.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    const allData = getCurrentData();
    return Math.ceil(allData.length / ITEMS_PER_PAGE);
  };

  // 이벤트 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    navigate(TAB_CONFIG[tab].url);
  };

  // 렌더링할 데이터
  const currentData = getCurrentPageData();
  const totalPages = getTotalPages();

  return (
    <div className="notice-page">
      <Header />
      <div className="notice-container">
        <h1 className="notice-page-title">고객센터</h1>
        
        {/* 탭 네비게이션 */}
        <TabNavigation 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* 탭 콘텐츠 */}
        <div className="tab-content">
          <div className="notice-list">
            {currentData.map((item, index) => {
              const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
              const key = activeTab === 'notice' ? item.noticenum : item.faqnum;
              return (
                <NoticeItem
                  key={key}
                  item={item}
                  index={globalIndex}
                  type={activeTab}
                />
              );
            })}
          </div>
          
          {/* 페이지네이션 */}
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default NoticePage; 