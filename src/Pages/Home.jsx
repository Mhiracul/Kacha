import React from "react";
import Header from "../Components/Header/Header";
import Banner from "../Components/Banner/Banner";
import About from "../Components/About/About";
import CarRentalForm from "../Components/CarRental/Carrentalform";
import CarCarousel from "../Components/Cars/CarCarousel";
import CarCategories from "../Components/CarCategories/CarCategories";
import CarRentalProcess from "../Components/CarRentalProcess/CarRentalProcess";
import CarPromoVideo from "../Components/CarPromoVideo/CarPromoVideo";
import Testimonial from "../Components/Testimonial/Testimonial";
import CarRentSection from "../Components/CarRentsection/CarRentSection";
import ClientCarousel from "../Components/ClientCarousel/ClientCarousel";
import Footer from "../Components/Footer/Footer";

const Home = () => {
  return (
    <div className="h-full w-full">
      <Header />
      <Banner />
      <About />
      <CarRentalForm />
      <CarCarousel />
      <CarCategories />
      <CarRentalProcess />
      <CarPromoVideo />
      <Testimonial />
      <CarRentSection />
      <ClientCarousel />
      <Footer />
    </div>
  );
};

export default Home;
