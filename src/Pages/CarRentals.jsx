import React from "react";
import Banner from "../Components/CarRent/Banner";
import Footer from "../Components/Footer/Footer";
import CarRent from "../Components/CarRent/CarRent";
import Header from "../Components/Header/Header";

const CarRentals = () => {
  return (
    <div>
      <Header />
      <Banner />
      <CarRent />
      <Footer />
    </div>
  );
};

export default CarRentals;
