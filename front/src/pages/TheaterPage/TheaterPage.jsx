import React, { useEffect } from "react";
import TheaterBox from "./components/TheaterBox";

const TheaterPage = () => {
useEffect(() => {
  sessionStorage.clear();
}, []);

  return (
    <div>
      <TheaterBox />
    </div>
  );
};

export default TheaterPage;
