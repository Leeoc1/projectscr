import React, { useState } from "react";
import "./QuickReservation.css";

const QuickReservation = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "관람 지역을 입력해 주세요.",
      isBot: true,
    },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      // 지역 검색 API 호출
      const response = await fetch(
        `/chatbot/ask?question=${encodeURIComponent(input)}`,
        {
          method: "GET",
          headers: { Accept: "application/json" },
        }
      );
      const data = await response.json();

      let botMessage;
      if (data.type === "cinema") {
        const { cinemaname, cinemaaddress, cinemastatus, cinematel, cinemacd } =
          data.data;
        botMessage = {
          text: `${cinemaname}\n주소: ${cinemaaddress}\n상태: ${cinemastatus}\n전화번호: ${cinematel}\n\n이 극장을 선택하시겠습니까?`,
          isBot: true,
          cinemacd: cinemacd,
          cinemaname: cinemaname,
        };
      } else if (data.type === "suggestion" && data.data.cinemas?.length > 0) {
        // 지역에 여러 극장이 있는 경우
        const cinemaList = data.data.cinemas
          .map((cinema, index) => `${index + 1}. ${cinema.name}`)
          .join("\n");
        botMessage = {
          text: `${input} 지역의 극장은 다음과 같습니다:\n\n${cinemaList}\n\n어떤 상영관에서 보시겠어요?`,
          isBot: true,
          cinemas: data.data.cinemas,
        };
      } else {
        // 해당 지역에 극장이 없는 경우
        botMessage = {
          text: `죄송합니다. "${input}" 지역의 극장은 없습니다.\n다른 지역명을 입력해 주세요.`,
          isBot: true,
        };
      }

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("API 호출 오류:", error);
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

  return (
    <div className="quickreservation-container open">
      <div className="quickreservation-header">빠른 예매 챗봇</div>
      <div className="quickreservation-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.isBot ? "bot-message" : "user-message"}`}
          >
            {msg.text.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
            {msg.cinemacd && (
              <button
                onClick={async () => {
                  // 극장 정보를 세션 스토리지에 저장
                  sessionStorage.setItem("cinemacd", msg.cinemacd);
                  sessionStorage.setItem("cinemanm", msg.cinemaname);
                  console.log("극장 선택:", msg.cinemaname, msg.cinemacd);

                  // 해당 극장의 상영 영화 목록 가져오기
                  try {
                    console.log("영화 검색 요청 - 극장명:", msg.cinemaname);
                    const movieResponse = await fetch(
                      `/chatbot/ask?question=${encodeURIComponent(
                        msg.cinemaname
                      )}`,
                      {
                        method: "GET",
                        headers: { Accept: "application/json" },
                      }
                    );
                    const movieData = await movieResponse.json();
                    console.log("영화 검색 API 응답:", movieData);
                    console.log("응답 타입:", movieData.type);
                    console.log("영화 데이터:", movieData.data);

                    if (
                      movieData.type === "cinemamovies" &&
                      movieData.data.cinemamovies?.length > 0
                    ) {
                      console.log(
                        "영화 목록 발견:",
                        movieData.data.cinemamovies
                      );
                      const movieList = movieData.data.cinemamovies
                        .map((movie, index) => `${index + 1}. ${movie}`)
                        .join("\n");

                      const movieMessage = {
                        text: `${msg.cinemaname}에서 상영 중인 영화:\n\n${movieList}\n\n어떤 영화를 보시겠어요?`,
                        isBot: true,
                        movies: movieData.data.cinemamovies,
                      };

                      setMessages((prev) => [...prev, movieMessage]);
                    } else {
                      console.log(
                        "영화를 찾지 못함 - 타입:",
                        movieData.type,
                        "데이터:",
                        movieData.data
                      );
                      const noMovieMessage = {
                        text: `${msg.cinemaname}에서 현재 상영 중인 영화가 없습니다.`,
                        isBot: true,
                      };

                      setMessages((prev) => [...prev, noMovieMessage]);
                    }
                  } catch (error) {
                    console.error("영화 목록 조회 오류:", error);
                    const errorMessage = {
                      text: "영화 목록을 가져오는 중 오류가 발생했습니다.",
                      isBot: true,
                    };

                    setMessages((prev) => [...prev, errorMessage]);
                  }
                }}
                style={{
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  marginTop: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                이 극장 선택하기
              </button>
            )}
            {msg.cinemas && (
              <div style={{ marginTop: "8px" }}>
                {msg.cinemas.map((cinema, index) => (
                  <button
                    key={index}
                    onClick={async () => {
                      // 극장 정보를 세션 스토리지에 저장
                      sessionStorage.setItem("cinemacd", cinema.cinemacd);
                      sessionStorage.setItem("cinemanm", cinema.name);
                      console.log("극장 선택:", cinema.name, cinema.cinemacd);

                      // 해당 극장의 상영 영화 목록 가져오기
                      try {
                        console.log("영화 검색 요청 - 극장명:", cinema.name);
                        const movieResponse = await fetch(
                          `/chatbot/ask?question=${encodeURIComponent(
                            cinema.name
                          )}`,
                          {
                            method: "GET",
                            headers: { Accept: "application/json" },
                          }
                        );
                        const movieData = await movieResponse.json();
                        console.log("영화 검색 API 응답:", movieData);

                        if (
                          movieData.type === "cinemamovies" &&
                          movieData.data.cinemamovies?.length > 0
                        ) {
                          const movieList = movieData.data.cinemamovies
                            .map((movie, idx) => `${idx + 1}. ${movie}`)
                            .join("\n");

                          const movieMessage = {
                            text: `${cinema.name}에서 상영 중인 영화:\n\n${movieList}\n\n어떤 영화를 보시겠어요?`,
                            isBot: true,
                            movies: movieData.data.cinemamovies,
                          };

                          setMessages((prev) => [...prev, movieMessage]);
                        } else {
                          const noMovieMessage = {
                            text: `${cinema.name}에서 현재 상영 중인 영화가 없습니다.`,
                            isBot: true,
                          };

                          setMessages((prev) => [...prev, noMovieMessage]);
                        }
                      } catch (error) {
                        console.error("영화 목록 조회 오류:", error);
                        const errorMessage = {
                          text: "영화 목록을 가져오는 중 오류가 발생했습니다.",
                          isBot: true,
                        };

                        setMessages((prev) => [...prev, errorMessage]);
                      }
                    }}
                    style={{
                      background: "#28a745",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "15px",
                      margin: "2px",
                      cursor: "pointer",
                      fontSize: "12px",
                      display: "inline-block",
                    }}
                  >
                    {cinema.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="quickreservation-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요..."
          className="quickreservation-input-field"
        />
        <button onClick={sendMessage} className="quickreservation-send-button">
          전송
        </button>
      </div>
    </div>
  );
};

export default QuickReservation;
