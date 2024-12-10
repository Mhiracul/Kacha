import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../node_modules/swiper/swiper.min.css"; // Import Swiper styles
import { Autoplay } from "swiper/modules";

const CarCategories = () => {
  const categories = [
    {
      title: "Executive Luxury Cars",
      imgSrc:
        "https://webredox.net/demo/wp/renax/demo12/wp-content/uploads/sites/12/2024/04/01.jpg",
      url: "https://webredox.net/demo/wp/renax/demo12/product-category/convertible/",
    },
    {
      title: "Luxury Cars",
      imgSrc:
        "https://webredox.net/demo/wp/renax/demo12/wp-content/uploads/sites/12/2024/04/03.jpg",
      url: "https://webredox.net/demo/wp/renax/demo12/product-category/luxury-cars/",
    },
    {
      title: "Sedan",
      imgSrc:
        "https://webredox.net/demo/wp/renax/demo12/wp-content/uploads/sites/12/2024/04/05.jpg",
      url: "https://webredox.net/demo/wp/renax/demo12/product-category/sedan/",
    },
    {
      title: "Small Cars",
      imgSrc:
        "https://webredox.net/demo/wp/renax/demo12/wp-content/uploads/sites/12/2024/04/06.jpg",
      url: "https://webredox.net/demo/wp/renax/demo12/product-category/small-cars/",
    },
    {
      title: "Sport Cars",
      imgSrc:
        "https://webredox.net/demo/wp/renax/demo12/wp-content/uploads/sites/12/2024/04/04.jpg",
      url: "https://webredox.net/demo/wp/renax/demo12/product-category/sport-cars/",
    },
  ];

  return (
    <div className="bg-[#1b1b1b] font-outfit w-full h-full">
      <div className="c px-8 py-20">
        {/* Section Title */}
        <div className="flex items-center flex-col gap-20 mb-12">
          <div className="bg-[#f5b754] w-[1px] h-16"></div>

          <div className="text-center mb-8">
            <div className="text-[#f5b754] font-light tracking-widest uppercase text-[10px] mb-2">
              Categories
            </div>
            <div className="text-4xl font-bold text-white">
              Rental <span className="text-[#f5b754]">Car Types</span>
            </div>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="flex h-full w-full flex-wrap">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 3,
                height: "800px",
              },
            }}
            className="w-full h-full"
          >
            {categories.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative h-full w-full overflow-hidden"
                  style={{
                    borderRadius: "20px 20px 20px 0px",
                  }}
                >
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                    <h4 className="text-xl absolute top-0 left-0 px-4 py-4 font-semibold mb-4">
                      {item.title}
                    </h4>
                    <div className="absolute bottom-2 left-3">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <div className="absolute inset-0 w-full h-full"></div>
                        <div
                          className="relative bg-[#1b1b1b] p-7 z-10 text-2xl font-bold"
                          style={{
                            borderRadius: "0 40px 0 0",
                          }}
                        >
                          <a
                            href={item.url}
                            className="hover:bg-[#f5b754] border border-[#f5b754] py-5 px-5 rounded-full inline-flex items-center"
                          >
                            <MdOutlineArrowOutward color="#fff" size={10} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Vertical Line */}

        {/* Footer Section */}
        <div className="text-center text-gray-500">
          {/* Add footer content here if needed */}
        </div>
      </div>
    </div>
  );
};

export default CarCategories;
