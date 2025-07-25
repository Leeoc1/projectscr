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
        botMessage = {
          text: `영화: ${name}\n장르: ${genre}\n줄거리: ${movieinfo}\n개봉일: ${releasedate}\n러닝타임: ${runningtime}분`,
          isBot: true,
          moviecd,
        };
      } else if (data.type === "top10") {
        const movieList = data.data.movies
          .map(
            (movie, index) =>
              `${index + 1}. ${movie.name} (순위: ${movie.rank})`
          )
          .join("\n");
        botMessage = {
          text: `현재 인기 영화 탑10:\n${movieList}`,
          isBot: true,
          movies: data.data.movies,
        };
      } else if (data.type === "cinema") {
        const { cinemaname, cinemaaddress, cinemastatus, cinematel } =
          data.data;
        botMessage = {
          text: `극장: ${cinemaname}\n주소: ${cinemaaddress}\n상태: ${cinemastatus}\n전화번호: ${cinematel}`,
          isBot: true,
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
