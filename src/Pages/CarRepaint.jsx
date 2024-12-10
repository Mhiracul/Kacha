import React from "react";
import Banner from "../Components/CarRepaint/Banner";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import Repaint from "../Components/CarRepaint/Repaint";

const CarRepaint = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Repaint />
      <Footer />
    </div>
  );
};

export default CarRepaint;
