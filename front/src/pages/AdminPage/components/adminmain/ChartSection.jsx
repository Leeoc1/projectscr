import React, { useEffect, useState } from "react";
import {
  getTotalVolume,
  getCinemaVolume,
  getAllUsers,
  getReservation,
} from "../../../../api/api";
import BarChart from "./chart/BarChart";
import LineChart from "./chart/LineChart";
import PieChartComponent from "./chart/PieChart";
import PieMovieChartComponent from "./chart/PieMovieChart";

const ChartSection = () => {
  const [totalVolume, setTotalVolume] = useState([]);
  const [cinemaVolume, setCinemaVolume] = useState([]);
  const [userData, setUserData] = useState([]);
  const [currentChartIndex, setCurrentChartIndex] = useState(0);
  const [currentRightChartIndex, setCurrentRightChartIndex] = useState(0);
  const [dailyUserCount, setDailyUserCount] = useState([]);
  const [movieVolume, setMovieVolume] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          totalVolumeData,
          cinemaVolumeData,
          allUsersData,
          reservationData,
        ] = await Promise.all([
          getTotalVolume(),
          getCinemaVolume(),
          getAllUsers(),
          getReservation(),
        ]);

        console.log("그래프용 totalVolumeData:", totalVolumeData);
        console.log("cinemaVolumeData:", cinemaVolumeData);
        console.log("전체 유저 데이터:", allUsersData);
        console.log("예약 데이터:", reservationData);

        setTotalVolume(totalVolumeData);
        setCinemaVolume(cinemaVolumeData);

        // 날짜별 전체 유저 수 계산 (오늘부터 7일 전까지)
        const today = new Date();
        const dailyCounts = [];

        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD 형식

          // 해당 날짜까지의 전체 유저 수 계산 (누적)
          const totalUsersOnDate = allUsersData.filter((user) => {
            if (user.reg_date) {
              const userDate = new Date(user.reg_date);
              const userDateStr = userDate.toISOString().split("T")[0];
              return userDateStr <= dateStr; // 해당 날짜까지 가입한 모든 유저
            }
            return false;
          });

          dailyCounts.push({
            date: dateStr,
            count: totalUsersOnDate.length,
          });
        }

        console.log("날짜별 전체 유저 수:", dailyCounts);
        setDailyUserCount(dailyCounts);

        // 영화별 매출 계산
        const movieSales = {};
        reservationData.forEach((reservation) => {
          if (reservation.movienm && reservation.amount) {
            if (movieSales[reservation.movienm]) {
              movieSales[reservation.movienm] += reservation.amount;
            } else {
              movieSales[reservation.movienm] = reservation.amount;
            }
          }
        });

        const movieVolumeData = Object.entries(movieSales)
          .map(([movieName, totalAmount]) => ({
            movieName,
            totalAmount,
          }))
          .sort((a, b) => b.totalAmount - a.totalAmount)
          .slice(0, 10);

        console.log("영화별 매출 데이터:", movieVolumeData);
        setMovieVolume(movieVolumeData);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, []);

  const handlePrevious = () => {
    setCurrentChartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentChartIndex((prev) => Math.min(1, prev + 1));
  };

  const handleRightPrevious = () => {
    setCurrentRightChartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleRightNext = () => {
    setCurrentRightChartIndex((prev) => Math.min(1, prev + 1));
  };

  const renderChart = () => {
    switch (currentChartIndex) {
      case 0:
        return (
          <BarChart
            data={totalVolume}
            userData={userData}
            onPrevious={handlePrevious}
            onNext={handleNext}
            currentChartIndex={currentChartIndex}
          />
        );
      case 1:
        return (
          <LineChart
            data={dailyUserCount}
            onPrevious={handlePrevious}
            onNext={handleNext}
            currentChartIndex={currentChartIndex}
          />
        );
      default:
        return (
          <BarChart
            data={totalVolume}
            userData={userData}
            onPrevious={handlePrevious}
            onNext={handleNext}
            currentChartIndex={currentChartIndex}
          />
        );
    }
  };

  const renderRightChart = () => {
    switch (currentRightChartIndex) {
      case 0:
        return (
          <PieChartComponent
            data={cinemaVolume}
            onPrevious={handleRightPrevious}
            onNext={handleRightNext}
            currentChartIndex={currentRightChartIndex}
          />
        );
      case 1:
        return (
          <PieMovieChartComponent
            data={movieVolume}
            onPrevious={handleRightPrevious}
            onNext={handleRightNext}
            currentChartIndex={currentRightChartIndex}
          />
        );
      default:
        return (
          <PieChartComponent
            data={cinemaVolume}
            onPrevious={handleRightPrevious}
            onNext={handleRightNext}
            currentChartIndex={currentRightChartIndex}
          />
        );
    }
  };

  // 파이차트 데이터 (상위 6개)
  const pieColors = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#a21caf",
    "#6366f1",
  ];
  const sortedCinema = [...cinemaVolume]
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 6);
  const totalPie = sortedCinema.reduce((sum, cur) => sum + cur.totalAmount, 0);
  let prevPercent = 0;
  const pieSlices = sortedCinema.map((item, idx) => {
    const percent = totalPie > 0 ? (item.totalAmount / totalPie) * 100 : 0;
    const start = prevPercent;
    const end = prevPercent + percent;
    prevPercent = end;
    return {
      color: pieColors[idx % pieColors.length],
      start,
      end,
      label: item.cinemaName,
      amount: item.totalAmount,
      percent: percent,
    };
  });
  const pieGradient = pieSlices
    .map((slice) => `${slice.color} ${slice.start}% ${slice.end}%`)
    .join(", ");

  return (
    <div className="slo-charts-section">
      {renderChart()}
      {renderRightChart()}
    </div>
  );
};

export default ChartSection;
