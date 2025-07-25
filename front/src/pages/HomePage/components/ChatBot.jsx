import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const ChatBot = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "안녕하세요! The Movie에 오신 것을 환영합니다! 궁금한 점이 있으시면 말씀해 주세요. (예: '데드풀', '탑10', '강남 CGV')",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await fetch(
        `/chatbot/ask?question=${encodeURIComponent(input)}`,
        {
          method: "GET",
          headers: { Accept: "application/json" },
        }
      );
      const data = await response.json();

      let botMessage;
      if (data.type === "faq" || data.type === "notice") {
        botMessage = { text: data.data.content, isBot: true };
      } else if (data.type === "movie") {
        const { name, genre, movieinfo, releasedate, runningtime, moviecd } =
          data.data;
        console.log("영화 데이터 받음:", data.data); // 디버깅 로그 추가
        console.log("moviecd:", moviecd); // moviecd 확인
        botMessage = {
          text: `영화: ${name}\n장르: ${genre}\n줄거리: ${movieinfo}\n개봉일: ${releasedate}\n러닝타임: ${runningtime}분`,
          isBot: true,
          moviecd: moviecd, // 명시적으로 설정
        };
      } else if (data.type === "top10") {
        const movieList = data.data.movies
          .map(
            (movie, index) =>
              `${index + 1}. ${movie.name} (순위: ${movie.rank})`
          )
          .join("\n");
        console.log("탑10 영화 데이터:", data.data.movies); // 디버깅 로그
        botMessage = {
          text: `현재 인기 영화 탑10:\n${movieList}`,
          isBot: true,
          movies: data.data.movies,
          // 첫 번째 영화의 moviecd를 기본으로 설정 (필요시)
          moviecd:
            data.data.movies.length > 0 ? data.data.movies[0].moviecd : null,
        };
      } else if (data.type === "cinema") {
        const { cinemaname, cinemaaddress, cinemastatus, cinematel, cinemacd } =
          data.data;
        botMessage = {
          text: `극장: ${cinemaname}\n주소: ${cinemaaddress}\n상태: ${cinemastatus}\n전화번호: ${cinematel}`,
          isBot: true,
          cinemacd: cinemacd,
        };
      } else if (data.type === "suggestion") {
        let suggestionText =
          "죄송하지만 해당 질문에 대한 답변을 찾을 수 없습니다.";
        if (data.data.faqs?.length) {
          suggestionText += "\n[FAQ 제안]\n" + data.data.faqs.join("\n");
        }
        if (data.data.notices?.length) {
          suggestionText +=
            "\n[공지사항 제안]\n" + data.data.notices.join("\n");
        }
        if (data.data.movies?.length) {
          suggestionText +=
            "\n[영화 제안]\n" + data.data.movies.map((m) => m.name).join("\n");
        }
        if (data.data.cinemas?.length) {
          suggestionText +=
            "\n[극장 제안]\n" + data.data.cinemas.map((c) => c.name).join("\n");
        }
        botMessage = {
          text: suggestionText,
          isBot: true,
          movies: data.data.movies || [],
        };
      } else {
        botMessage = {
          text: "죄송합니다, 서버와의 연결에 문제가 발생했습니다.",
          isBot: true,
        };
      }

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "죄송합니다, 서버와의 연결에 문제가 발생했습니다.",
          isBot: true,
        },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <div className="chatbot-button" onClick={toggleChatbot}>
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/chat.png"
          alt="Chat Icon"
          className="chatbot-button-icon"
        />
      </div>
      <div className={`chatbot-container ${isChatbotOpen ? "open" : ""}`}>
        <div className="chatbot-header">The Movie 챗봇</div>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.isBot ? "bot-message" : "user-message"
              }`}
            >
              {msg.text.split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
              {msg.moviecd && (
                <Link
                  to={`/reservation/place/${msg.moviecd}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2 inline-block"
                  onClick={() => {
                    // 영화 정보를 세션스토리지에 저장
                    console.log("예매하기 버튼 클릭, moviecd:", msg.moviecd);
                    sessionStorage.setItem("moviecd", msg.moviecd);

                    // 영화 이름 추출 (메시지에서)
                    const movieNameMatch = msg.text.match(/영화: (.+)/);
                    if (movieNameMatch) {
                      const movieName = movieNameMatch[1];
                      sessionStorage.setItem("movienm", movieName);
                      console.log("영화명 저장:", movieName);
                    }
                  }}
                >
                  예매하기
                </Link>
              )}
              {(msg.cinemacd || (msg.isBot && msg.text.includes("극장:"))) && (
                <Link
                  to={
                    msg.cinemacd
                      ? `/reservation/theater/${msg.cinemacd}`
                      : `/theater`
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2 inline-block ml-2"
                  onClick={() => {
                    // 극장 정보를 세션스토리지에 저장
                    if (msg.cinemacd) {
                      console.log(
                        "극장 선택 버튼 클릭, cinemacd:",
                        msg.cinemacd
                      );
                      sessionStorage.setItem("cinemacd", msg.cinemacd);

                      // 극장 이름 추출 (메시지에서)
                      const cinemaNameMatch = msg.text.match(/극장: (.+)/);
                      if (cinemaNameMatch) {
                        const cinemaName = cinemaNameMatch[1];
                        sessionStorage.setItem("cinemanm", cinemaName);
                        console.log("극장명 저장:", cinemaName);
                      }
                    }
                  }}
                >
                  극장 선택
                </Link>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="질문을 입력하세요... (예: 데드풀, 탑10, 강남 CGV)"
            className="chatbot-input-field"
          />
          <button onClick={sendMessage} className="chatbot-send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
