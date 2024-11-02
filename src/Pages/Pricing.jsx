import React from "react";
import Banner from "../Components/Pricing/Banner";
import ClientCarousel from "../Components/ClientCarousel/ClientCarousel";
import Footer from "../Components/Footer/Footer";
import CarRentSection from "../Components/CarRentsection/CarRentSection";
import Price from "../Components/Pricing/Price";
import Header from "../Components/Header/Header";

const Pricing = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Price />
      <CarRentSection />

      <ClientCarousel />
      <Footer />
    </div>
  );
};

export default Pricing;
