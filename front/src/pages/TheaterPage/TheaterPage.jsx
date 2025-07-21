import React, { useEffect } from "react";
import Footer from "../../shared/Footer";
import TheaterBox from "./components/TheaterBox";

const TheaterPage = () => {
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <div>
      <TheaterBox />
      <Footer />
    </div>
  );
};

export default TheaterPage;
