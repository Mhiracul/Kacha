import React from "react";
import { GrFormCheckmark } from "react-icons/gr";
import { CiPlay1 } from "react-icons/ci";
import Car from "../../assets/car-about.png";
import { MdOutlineArrowOutward } from "react-icons/md";

const About = () => {
  return (
    <div className="h-full w-full bg-[#1b1b1b]">
      <section className="flex lg:flex-row md:flex-col lg:gap-0 gap-10 flex-col container mx-auto md:px-10 px-10 py-20 space-x-8">
        {/* About Section */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-6 max-w-md">
            {/* Section Subtitle */}
            <div className="text-[#f5b754] text-[10px] tracking-widest uppercase">
              Kacha Autos
            </div>
            {/* Section Title */}
            <h2 className="md:text-3xl text-xl font-outfit text-white font-bold">
              We Are More Than{" "}
              <span className="text-[#f5b754]">A Car Rental Company</span>
            </h2>
          </div>

          {/* Description */}
          <div className="mb-6 max-w-md">
            <p className="text-gray-400 font-light text-sm font-outfit">
              At Kacha Autos, we're all about cars, and we're here to make your
              car journey a breeze. We believe in keeping things straightforward
              and enjoyable. Whether you're on the hunt for your dream ride or
              need top-notch car care, we've got you covered. Join us for a ride
              that's as smooth as your favorite road. Your car adventure starts
              here!
            </p>
          </div>

          {/* List of Features */}
          <ul className="list-none space-y-2 font-outfit font-light">
            <li className="flex items-center">
              <span className="text-[#f5b754] bg-[#222] p-4 rounded-full mr-2">
                <GrFormCheckmark />
              </span>
              <p className="text-[#999] text-sm">Executive Luxury Cars</p>
            </li>
            <li className="flex items-center">
              <span className="text-[#f5b754] p-4 bg-[#222] rounded-full mr-2">
                <GrFormCheckmark />
              </span>
              <p className="text-[#999] text-sm">Luxury Cars</p>
            </li>
            <li className="flex items-center">
              <span className="text-[#f5b754] p-4 bg-[#222] rounded-full mr-2">
                <GrFormCheckmark />
              </span>
              <p className="text-[#999] text-sm">Salon Cars</p>
            </li>
            <li className="flex items-center">
              <span className="text-[#f5b754] p-4 bg-[#222] rounded-full mr-2">
                <GrFormCheckmark />
              </span>
              <p className="text-[#999] text-sm">Antique Cars</p>
            </li>
          </ul>

          {/* Read More Button */}
          <div className="mt-6">
            <a
              href=""
              className="bg-[#f5b754] inline-flex gap-1  items-center text-black font-normal text-xs font-outfit md:px-10 md:py-5 px-6 py-3 rounded-full transition-all hover:bg-yellow-600"
              target="_self"
              rel="noopener noreferrer"
            >
              Read More <MdOutlineArrowOutward />
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 relative">
          <img
            src={Car}
            alt="About Rentax"
            className="w-full h-full object-cover rounded-lg"
          />
          {/* Video Play Button */}
          <div className="absolute bottom-2 left-3">
            <div className="relative  w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 w-full h-full"></div>
              <div
                className="relative bg-[#1b1b1b] p-3  z-10 text-2xl font-bold"
                style={{
                  borderRadius: "0 40px 0 0",
                }}
              >
                <a
                  href="https://www.instagram.com/reel/C-K8iq4M4ww/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                  className=" hover:bg-[#f5b754] background-transparent p-4 rounded-full text-white flex items-center justify-center border border-white hover:border-none"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CiPlay1 color="#fff" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
