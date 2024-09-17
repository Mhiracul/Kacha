import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "../../../node_modules/swiper/swiper.min.css"; // Import Swiper styles
import { HiUser } from "react-icons/hi";
import Car1 from "../../assets/car-carousel1.png";
import Car2 from "../../assets/car-carousel2.png";
import Car3 from "../../assets/car-carousel3.png";
import Car4 from "../../assets/car-carousel4.png";

const cars = [
  {
    id: 1,
    imgSrc: Car1,
    altText: "Lamborghini Urus",
    name: "Lamborghini Urus",
    price: 750,
    details: (
      <>
        <span className="inline-flex gap-1 items-center">
          5 <HiUser className=" text-[#f5b754]" />{" "}
        </span>
        , Auto, 2 Bags
      </>
    ),
    link: "",
  },
  {
    id: 2,
    imgSrc: Car2,
    altText: "Aston Martin DBX",
    name: "Aston Martin DBX",
    price: 500,
    details: (
      <>
        <span className="inline-flex gap-1 items-center">
          5 <HiUser className=" text-[#f5b754]" />{" "}
        </span>
        , Auto, 2 Bags
      </>
    ),
    link: "",
  },
  {
    id: 3,
    imgSrc: Car3,
    altText: "Bugatti Mistral W16",
    name: "Bugatti Mistral W16",
    price: 800,
    details: (
      <>
        <span className="inline-flex gap-1 items-center">
          5 <HiUser className=" text-[#f5b754]" />{" "}
        </span>
        , Auto, 2 Bags
      </>
    ),
    link: "",
  },
  {
    id: 4,
    imgSrc: Car4,
    altText: "Bentley Bentayga",
    name: "Bentley Bentayga",
    price: 600,
    details: (
      <>
        <span className="inline-flex gap-1 items-center">
          5 <HiUser className=" text-[#f5b754]" />{" "}
        </span>
        , Auto, 2 Bags
      </>
    ),
    link: "",
  },
  {
    id: 5,
    imgSrc:
      "https://webredox.net/demo/wp/renax/demo12/wp-content/uploads/sites/12/2024/04/12.jpg",
    altText: "Rolls Royce Cullinan",
    name: "Rolls Royce Cullinan",
    price: 900,
    details: (
      <>
        <span className="inline-flex gap-1 items-center">
          5 <HiUser className=" text-[#f5b754]" />{" "}
        </span>
        , Auto, 2 Bags
      </>
    ),
    link: "",
  },
  {
    id: 6,
    imgSrc:
      "https://webredox.net/demo/wp/renax/demo12/wp-content/uploads/sites/12/2024/04/14.jpg",
    altText: "Bentley Continental",
    name: "Bentley Continental",
    price: 500,
    details: (
      <>
        <span className="inline-flex gap-1 items-center">
          5 <HiUser className=" text-[#f5b754]" />{" "}
        </span>
        , Auto, 2 Bags
      </>
    ),
    link: "",
  },
];

const CarCarousel = () => {
  return (
    <div className="relative font-outfit bg-gray-900 py-16">
      <div className="px-10 lg:px-0">
        <div className="text-center mb-12">
          <div className="text-[#f5b754] tracking-[0.2rem] text-[10px] text-light  uppercase">
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
            delay: 5000, // Adjust the delay to your preference
            disableOnInteraction: false,
          }}
          modules={[Navigation, Pagination, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 1, // 1 slide per view on screens >= 640px
            },
            768: {
              slidesPerView: 2, // 2 slides per view on screens >= 768px
            },
            1024: {
              slidesPerView: 2, // 3 slides per view on screens >= 1024px
            },
          }}
          className="mySwiper"
        >
          {cars.map((car) => (
            <SwiperSlide key={car.id}>
              <div className="relative overflow-hidden rounded-3xl shadow-lg">
                <img
                  src={car.imgSrc}
                  alt={car.altText}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-0  left-0 right-0 bg-gray-800 bg-opacity-70 p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white text-lg font-semibold mb-2">
                        <a href={car.link} className="hover:underline">
                          {car.name}
                        </a>
                      </div>
                      <div className="text-gray-300 text-sm mb-2">
                        {car.details}
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <a
                        href={car.link}
                        className="block text-sm w-full text-center bg-yellow-500 text-black rounded-full py-2 px-6  hover:bg-yellow-600"
                      >
                        Details
                      </a>
                      <div className="flex justify-between items-center">
                        <span className="text-[#f5b754] text-lg font-semibold">
                          ${car.price}
                        </span>
                        <span className="text-gray-300 text-sm">/day</span>
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
