import CarPromoVideo from "../Components/CarPromoVideo/CarPromoVideo";
import CarRentalForm from "../Components/CarRental/Carrentalform";
import ClientCarousel from "../Components/ClientCarousel/ClientCarousel";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import Banner from "../Components/Services/Banner";
import Service from "../Components/Services/Service";
import WhatWeDo from "../Components/Services/WhatWeDo";

const Services = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Service />
      <CarRentalForm />
      <WhatWeDo />
      <CarPromoVideo />
      <ClientCarousel />
      <Footer />
    </div>
  );
};

export default Services;
