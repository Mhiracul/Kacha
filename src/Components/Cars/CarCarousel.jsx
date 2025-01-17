import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "../../../node_modules/swiper/swiper.min.css"; // Import Swiper styles
import { HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";

const CarCarousel = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch car data from the backend
    const fetchCars = async () => {
      try {
        const response = await fetch(
          "https://kachabackend.onrender.com/api/cars"
        );
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Failed to fetch car data:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="relative font-outfit bg-gray-900 py-16">
      <div className="px-2 lg:px-0">
        <div className="text-center mb-12">
          <div className="text-[#f5b754] tracking-[0.2rem] text-[10px] uppercase">
            Select Your Car
          </div>
          <div className="text-white text-3xl font-bold">
            Luxury <span className="text-[#f5b754]">Car Fleet</span>
          </div>
        </div>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Pagination, Autoplay]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
          className="mySwiper"
        >
          {cars.map((car) => (
            <SwiperSlide key={car.id}>
              <div className="relative overflow-hidden rounded-3xl shadow-lg">
                <img
                  src={`data:image/${
                    car.imgSrc.includes("png") ? "png" : "jpeg"
                  };base64,${car.imgSrc}`}
                  alt={car.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-70 p-4">
                  <div className="flex md:flex-row flex-col justify-between items-center">
                    <div>
                      <div className="text-white md:text-lg text-sm md:font-semibold font-medium mb-2">
                        <Link
                          to={`/car-details/${car.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="hover:underline"
                        >
                          {car.name}
                        </Link>
                      </div>
                      <div className="text-gray-300 md:text-sm text-xs mb-2">
                        <span className="inline-flex gap-1 items-center">
                          {car.seat} <HiUser className="text-[#f5b754]" />
                        </span>
                        , Auto, {car.Bags} Bags
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Link
                        to={`/car-details/${car.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="block text-sm w-full text-center bg-yellow-500 text-black rounded-full py-2 px-6 hover:bg-yellow-600"
                      >
                        Details
                      </Link>
                      <div className="flex justify-between items-center">
                        <span className="text-[#f5b754] text-lg font-semibold">
                          ₦{car.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
    </div>
  );
};

export default CarCarousel;
