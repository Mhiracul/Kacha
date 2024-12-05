import React from "react";
import Header from "../Components/Header/Header";
import ClientCarousel from "../Components/ClientCarousel/ClientCarousel";
import Footer from "../Components/Footer/Footer";
import Banner from "../Components/Car-Grid/Banner";
import CarGrids from "../Components/Car-Grid/CarGrids";

const CarGrid = () => {
  return (
    <div>
      <Header />
      <Banner />
      <CarGrids />
      <ClientCarousel />
      <Footer />
    </div>
  );
};

export default CarGrid;
