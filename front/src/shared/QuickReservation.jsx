import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSchedules } from "../api/cinemaApi";
import "./QuickReservation.css";

const QuickReservation = () => {
  const navigate = useNavigate();
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
      console.log("API 응답 전체 데이터:", data);
      console.log("응답 타입:", data.type);
      console.log("응답 데이터:", data.data);

      let botMessage;
      if (data.type === "cinema") {
        const { cinemaname, cinemaaddress, cinemastatus, cinematel, cinemacd, movies } = data.data;
        console.log("추출된 영화 목록:", movies);
        console.log("영화 목록 타입:", typeof movies);
        console.log("영화 목록 길이:", movies ? movies.length : "undefined");
        
        let text = `${cinemaname}\n주소: ${cinemaaddress}\n상태: ${cinemastatus}\n전화번호: ${cinematel}`;
        
        if (movies && movies.length > 0) {
          console.log("영화 목록이 있음:", movies);
          text += `\n\n상영 중인 영화:\n${movies.map((movie, index) => `${index + 1}. ${movie}`).join('\n')}\n\n어떤 영화를 보시겠어요?`;
        } else {
          console.log("영화 목록이 없음 - movies:", movies);
          text += `\n\n현재 상영 중인 영화가 없습니다.`;
        }
        
        botMessage = {
          text: text,
          isBot: true,
          cinemacd: cinemacd,
          cinemaname: cinemaname,
          movies: movies || [], // 영화 목록 추가
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

                  // 이미 영화 목록이 있으면 바로 사용, 없으면 API 호출
                  if (msg.movies && msg.movies.length > 0) {
                    console.log("기존 영화 목록 사용:", msg.movies);
                    const movieList = msg.movies
                      .map((movie, index) => `${index + 1}. ${movie}`)
                      .join("\n");

                    const movieMessage = {
                      text: `${msg.cinemaname}에서 상영 중인 영화:\n\n${movieList}\n\n어떤 영화를 보시겠어요?`,
                      isBot: true,
                      movies: msg.movies,
                    };

                    setMessages((prev) => [...prev, movieMessage]);
                  } else {
                    // 영화 목록이 없으면 API 호출
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

                      // cinema 타입으로 영화 목록이 포함된 경우
                      if (movieData.type === "cinema" && movieData.data.movies?.length > 0) {
                        console.log("cinema 타입에서 영화 목록 발견:", movieData.data.movies);
                        const movieList = movieData.data.movies
                          .map((movie, index) => `${index + 1}. ${movie}`)
                          .join("\n");

                        const movieMessage = {
                          text: `${msg.cinemaname}에서 상영 중인 영화:\n\n${movieList}\n\n어떤 영화를 보시겠어요?`,
                          isBot: true,
                          movies: movieData.data.movies,
                        };

                        setMessages((prev) => [...prev, movieMessage]);
                      } else if (
                        movieData.type === "cinemamovies" &&
                        movieData.data.cinemamovies?.length > 0
                      ) {
                        console.log(
                          "cinemamovies 타입에서 영화 목록 발견:",
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
            {msg.movies && (
              <div style={{ marginTop: "8px" }}>
                {msg.movies.map((movie, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      // 선택한 극장명을 세션 스토리지에서 가져오기
                      const selectedCinema = sessionStorage.getItem("cinemanm") || "해당 극장";
                      
                      // 확인 메시지 추가
                      const confirmMessage = {
                        text: `${selectedCinema}의 ${movie} 영화 맞습니까?`,
                        isBot: true,
                        selectedMovie: movie,
                        selectedCinema: selectedCinema,
                      };

                      setMessages((prev) => [...prev, confirmMessage]);
                    }}
                    style={{
                      background: "#ff6b6b",
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
                    {movie}
                  </button>
                ))}
              </div>
            )}
            {msg.selectedMovie && msg.selectedCinema && (
              <div style={{ marginTop: "8px" }}>
                <button
                  onClick={() => {
                    // 영화 정보를 세션 스토리지에 저장
                    sessionStorage.setItem("movienm", msg.selectedMovie);
                    console.log("영화 선택 확정:", msg.selectedMovie, "극장:", msg.selectedCinema);
                    
                    // 예매 확정 메시지
                    const confirmationMessage = {
                      text: `${msg.selectedCinema}에서 ${msg.selectedMovie} 영화 예매를 진행하겠습니다!\n예매 페이지로 이동할 수 있습니다.`,
                      isBot: true,
                      finalConfirmation: true,
                    };

                    setMessages((prev) => [...prev, confirmationMessage]);
                  }}
                  style={{
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    margin: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  예
                </button>
                <button
                  onClick={() => {
                    // 다시 선택 메시지
                    const retryMessage = {
                      text: "다른 영화를 선택해 주세요. 위의 영화 목록에서 원하는 영화를 클릭해 주세요.",
                      isBot: true,
                    };

                    setMessages((prev) => [...prev, retryMessage]);
                  }}
                  style={{
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    margin: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  아니오
                </button>
              </div>
            )}
            {msg.finalConfirmation && (
              <div style={{ marginTop: "8px" }}>
                <button
                  onClick={async () => {
                    try {
                      const cinemacd = sessionStorage.getItem("cinemacd");
                      const movienm = sessionStorage.getItem("movienm");
                      const cinemanm = sessionStorage.getItem("cinemanm");
                      
                      if (!cinemacd || !movienm || !cinemanm) {
                        alert("예매 정보가 부족합니다. 다시 선택해 주세요.");
                        return;
                      }

                      console.log("예매 정보 준비 중:", { cinemacd, movienm, cinemanm });

                      // 오늘 날짜 구하기
                      const today = new Date();
                      const dateStr = today.toISOString().split('T')[0];

                      // 해당 극장의 오늘 스케줄 가져오기
                      console.log("스케줄 조회:", { cinemacd, date: dateStr });
                      const schedules = await getSchedules(cinemacd, dateStr);
                      console.log("전체 스케줄:", schedules);

                      if (!schedules || schedules.length === 0) {
                        alert("오늘 상영 스케줄이 없습니다. 다른 날짜를 선택해 주세요.");
                        return;
                      }

                      // 선택한 영화의 스케줄만 필터링
                      const movieSchedules = schedules.filter(schedule => 
                        schedule.movienm === movienm
                      );
                      console.log("영화별 스케줄:", movieSchedules);

                      if (movieSchedules.length === 0) {
                        alert(`${movienm} 영화의 오늘 상영 스케줄이 없습니다.`);
                        return;
                      }

                      // 현재 시간 이후의 스케줄만 필터링
                      const now = new Date();
                      const availableSchedules = movieSchedules.filter(schedule => {
                        const scheduleDateTime = new Date(schedule.starttime);
                        return scheduleDateTime > now;
                      });

                      if (availableSchedules.length === 0) {
                        alert("오늘 예매 가능한 시간이 없습니다. 다른 날짜를 선택해 주세요.");
                        return;
                      }

                      // 가장 빠른 스케줄 선택
                      const earliestSchedule = availableSchedules.sort((a, b) => 
                        new Date(a.starttime) - new Date(b.starttime)
                      )[0];

                      console.log("선택된 스케줄:", earliestSchedule);

                      // ReservationSeatPage에서 필요한 형식으로 데이터 준비
                      const selectedMovieTime = {
                        starttime: earliestSchedule.starttime,
                        reservationseat: earliestSchedule.reservationseat || 0,
                        allseat: earliestSchedule.allseat || 100,
                        movienm: movienm,
                        screenname: earliestSchedule.screenname || "1관",
                        schedulecd: earliestSchedule.schedulecd,
                        runningtime: earliestSchedule.runningtime || 120,
                        cinemanm: cinemanm,
                      };

                      // 선택된 날짜 정보도 저장 (ReservationProtectedRoute에서 필요)
                      const selectedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD 형식
                      const selectedFullDate = selectedDate; // 전체 날짜 정보

                      // 세션스토리지에 저장 (기존 시스템과 동일한 방식)
                      sessionStorage.setItem("selectedMovieTime", JSON.stringify(selectedMovieTime));
                      sessionStorage.setItem("selectedFullDate", selectedFullDate);
                      sessionStorage.setItem("selectedDate", selectedDate);
                      sessionStorage.setItem("selectedMovieName", movienm);
                      
                      console.log("세션스토리지에 저장된 데이터:");
                      console.log("- selectedMovieTime:", selectedMovieTime);
                      console.log("- selectedFullDate:", selectedFullDate);
                      console.log("- selectedDate:", selectedDate);
                      console.log("- selectedMovieName:", movienm);

                      // 세션 스토리지 변경 이벤트 발생 (기존 시스템과 호환)
                      window.dispatchEvent(
                        new CustomEvent("sessionStorageChange", {
                          detail: {
                            selectedFullDate: selectedFullDate,
                            selectedMovieName: movienm,
                            selectedMovieTime: JSON.stringify(selectedMovieTime),
                          },
                        })
                      );

                      // ReservationSeat 페이지로 이동
                      navigate("/reservation/seat");
                      
                    } catch (error) {
                      console.error("예매 준비 중 오류:", error);
                      alert("예매 준비 중 오류가 발생했습니다. 다시 시도해 주세요.");
                    }
                  }}
                  style={{
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "25px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  예매하러 가기
                </button>
              </div>
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

                        // cinema 타입으로 영화 목록이 포함된 경우
                        if (movieData.type === "cinema" && movieData.data.movies?.length > 0) {
                          const movieList = movieData.data.movies
                            .map((movie, idx) => `${idx + 1}. ${movie}`)
                            .join("\n");

                          const movieMessage = {
                            text: `${cinema.name}에서 상영 중인 영화:\n\n${movieList}\n\n어떤 영화를 보시겠어요?`,
                            isBot: true,
                            movies: movieData.data.movies,
                          };

                          setMessages((prev) => [...prev, movieMessage]);
                        } else if (
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
