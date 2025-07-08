import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../shared/Header";
import "../styles/NoticeContentPage.css";

const NoticeContents = () => {
    const { noticenum } = useParams();
    const navigate = useNavigate();
    const [notice, setNotice] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/notice/${noticenum}`)
        .then((res) => res.json())
        .then((data) => {
            setNotice(data);
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }, [noticenum]);

    if (loading) return <div className="notice-contents-loading">로딩 중...</div>;
    if (!notice) return <div className="notice-contents-error">공지사항을 찾을 수 없습니다.</div>;

    return (
        <div className="rts-page notice-contents-bg">
            <Header />
            <div className="rts-content notice-detail-content">
                <div className="rts-main notice-detail-main">
                    <div className="rts-container notice-contents-container">
                        <button className="notice-back-btn" onClick={() => navigate(-1)}>
                            목록으로
                        </button>
                        {notice.map((notice) => (
                            <section key={notice.noticenum} className="notice-detail-section">
                                <div className="notice-contents-title">{notice.noticesub}</div>
                                <div className="notice-contents-date">{notice.noticedate}</div>
                                <div className="notice-contents-content">{notice.noticecontents}</div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticeContents;