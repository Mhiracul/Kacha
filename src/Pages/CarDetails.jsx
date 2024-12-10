import React from "react";
import CarDetail from "../Components/CarDetails/CarDetail";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import ClientCarousel from "../Components/ClientCarousel/ClientCarousel";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";

const CarDetails = () => {
  return (
    <div>
      <Header />
      <CarDetail />

      <ClientCarousel />
      <Footer />
    </div>
  );
};

export default CarDetails;
