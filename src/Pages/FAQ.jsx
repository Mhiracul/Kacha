import React from "react";
import Header from "../Components/Header/Header";
import Banner from "../Components/FAQ/Banner";
import CarRentSection from "../Components/CarRentsection/CarRentSection";
import ClientCarousel from "../Components/ClientCarousel/ClientCarousel";
import Footer from "../Components/Footer/Footer";
import TheFaq from "../Components/FAQ/TheFaq";

const FAQ = () => {
  return (
    <div>
      <Header />
      <Banner />
      <TheFaq />
      <CarRentSection />

      <ClientCarousel />
      <Footer />
    </div>
  );
};

export default FAQ;
