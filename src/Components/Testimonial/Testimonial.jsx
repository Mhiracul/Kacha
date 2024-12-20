import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../node_modules/swiper/swiper.min.css"; // Import Swiper styles
import { Autoplay } from "swiper/modules";

const testimonials = [
  {
    name: "Adeola Johnson",
    role: "Customer",
    quote:
      "The service was excellent! The team was professional, and they made sure my car was in top shape. Highly recommend them!",
    imgSrc:
      "https://webredox.net/demo/wp/renax/wp-content/uploads/2024/04/2-1.jpg",
  },
  {
    name: "Chidi Okafor",
    role: "Customer",
    quote:
      "I was impressed by the swift response and quality of work. Chidi ensured everything was perfect before handing my car back.",
    imgSrc:
      "https://webredox.net/demo/wp/renax/wp-content/uploads/2024/04/2-1.jpg",
  },
  {
    name: "Fatima Ibrahim",
    role: "Customer",
    quote:
      "The customer service was exceptional. They kept me updated throughout the process, and my car feels brand new again!",
    imgSrc:
      "https://webredox.net/demo/wp/renax/wp-content/uploads/2024/04/4.jpg",
  },
];

const Testimonial = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col font-outfit items-center py-12 px-10 bg-[#1b1b1b]">
        {/* Section Title */}
        <div className="text-center mb-8">
          <div className="text-[rgb(245,183,84)] text-center text-sm uppercase tracking-widest mb-2">
            Testimonials
          </div>
          <h2 className="text-3xl font-bold text-white">What Clients Say</h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="w-full max-w-6xl">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="p-4 bg-[#222] shadow-lg overflow-hidden rounded-3xl relative">
                  <div className="flex items-center mb-4">
                    <FaQuoteLeft className="text-[#f5b754] text-4xl" />
                    <div className="absolute top-0 right-0">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <div className="absolute inset-0 w-full h-full"></div>
                        <div
                          className="relative bg-[#1b1b1b] p-2 z-10 text-2xl font-bold"
                          style={{
                            borderRadius: "40px 0 0 40px",
                          }}
                        >
                          <div className="text-yellow-500 inline-flex mr-2">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} size={10} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#999] text-sm font-light mb-4">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-10 mt-6">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <div className="absolute inset-0 w-full h-full"></div>
                      <div
                        className="relative bg-[#1b1b1b] p-3 z-10 text-2xl font-bold"
                        style={{
                          borderRadius: "0 40px 0 0",
                        }}
                      >
                        <div className="relative w-16 h-16 ">
                          <img
                            src={testimonial.imgSrc}
                            alt={testimonial.name}
                            className="object-cover rounded-full w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h6 className="text-lg text-white font-semibold">
                        {testimonial.name}
                      </h6>
                      <p className="text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
