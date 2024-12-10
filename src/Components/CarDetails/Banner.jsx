import React from "react";

const Banner = ({ carName, carImage }) => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <section className="relative h-full font-outfit w-full flex flex-col items-center">
        {/* Background Image */}
        <img
          src={carImage}
          alt={carName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Slide Content */}
        <div className="relative z-10 flex flex-col justify-center items-start h-full py-44 text-left text-white container mx-auto px-10">
          <div className="text-[#f5b754] text-[10px] tracking-[0.3em] uppercase">
            LUXURY CARS
          </div>
          <h1 className="md:text-5xl text-2xl py-6 font-bold mb-4">
            <span className="text-white">{carName}</span>
          </h1>
        </div>
      </section>
    </div>
  );
};

export default Banner;
