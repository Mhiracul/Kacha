import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";

const CarRentSection = () => {
  return (
    <div
      className="  bg-cover bg-no-repeat w-full h-full font-outfit bg-black"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://webredox.net/demo/wp/renax/demo12/wp-content/uploads/sites/12/2024/04/3.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative flex flex-col items-center justify-center p-4">
        {/* SVG Section */}

        {/* Main Content */}
        <div className="text-center  p-6 rounded-lg shadow-lg">
          <div className="text-[rgb(245,183,84)] text-center text-sm uppercase tracking-widest mb-2">
            Rent Your Car
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Interested in Renting?
          </h2>
          <p className="text-white font-light text-xs mb-6">
            Don't hesitate and send us a message.
          </p>

          <div className="flex gap-4 justify-center">
            <a
              className="inline-flex items-center gap-3 font-light md:px-6 md:py-4 px-4 py-2 text-base bg-[#f5b754] text-black rounded-full  transition duration-300"
              href="https://api.whatsapp.com/send?phone=+2348124985138"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp color="#000" />
              WhatsApp
            </a>

            <a
              href="/car-rentals"
              className="bg-transparent border border-[#fff] inline-flex gap-1 font-light items-center text-[#fff] hover:bg-[#f5b754] hover:text-black text-base font-outfit px-6 py-3 rounded-full transition-all"
              target="_self"
              rel="noopener noreferrer"
            >
              Rent Now <MdOutlineArrowOutward />
            </a>
          </div>
        </div>

        {/* Client Section */}
        <div className="mt-8 w-full">
          {/* Replace with actual carousel component */}
          <div className="owl-carousel owl-theme">
            {/* Carousel items will go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarRentSection;
