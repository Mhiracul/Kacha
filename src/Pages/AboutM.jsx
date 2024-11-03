import React from "react";
import Header from "../Components/Header/Header";
import About from "../Components/About/About";
import Testimonial from "../Components/Testimonial/Testimonial";
import CarPromoVideo from "../Components/CarPromoVideo/CarPromoVideo";
import CarRentSection from "../Components/CarRentsection/CarRentSection";
import ClientCarousel from "../Components/ClientCarousel/ClientCarousel";
import Footer from "../Components/Footer/Footer";
import Banner from "../Components/AboutUs/Banner";

const AboutM = () => {
  return (
    <div>
      <Header />
      <Banner />
      <About />
      <CarPromoVideo />
      <Testimonial />
      <CarRentSection />

      <ClientCarousel />
      <Footer />
    </div>
  );
};

export default AboutM;
