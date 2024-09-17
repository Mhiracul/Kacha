import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../node_modules/swiper/swiper.min.css"; // Import Swiper styles
import { Autoplay, Navigation } from "swiper/modules";

// Install Swiper modules

const ClientCarousel = () => {
  const clients = [
    "5.png",
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "6.png",
    "7.png",
  ];

  return (
    <div className="bg-[#1b1b1b]">
      <section className="relative container mx-auto px-10 py-10 overflow-hidden ">
        <Swiper
          spaceBetween={30}
          slidesPerView={4}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Navigation, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          className="mySwiper"
        >
          {clients.map((src, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center"
            >
              <a href="#" target="_self" rel="noopener noreferrer">
                <img
                  decoding="async"
                  src={`https://webredox.net/demo/wp/renax/wp-content/uploads/2024/04/${src}`}
                  alt={`Client Logo ${index + 1}`}
                  className="object-contain w-64 mx-auto"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default ClientCarousel;
