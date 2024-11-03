import React from "react";
import Header from "../Components/Header/Header";
import Contacting from "../Components/Contact/Contacting";
import Banner from "../Components/Contact/BAnner";
import CarRentSection from "../Components/CarRentsection/CarRentSection";
import ClientCarousel from "../Components/ClientCarousel/ClientCarousel";
import Footer from "../Components/Footer/Footer";

const Contact = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Contacting />
      <CarRentSection />

      <ClientCarousel />
      <Footer />
    </div>
  );
};

export default Contact;
