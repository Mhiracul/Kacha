import React from "react";
import { CiPlay1 } from "react-icons/ci";
import { MdPlayArrow } from "react-icons/md";

const CarPromoVideo = () => {
  return (
    <div
      className=" text-white bg-cover bg-no-repeat w-full h-full font-outfit bg-black"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://webredox.net/demo/wp/renax/demo12/wp-content/uploads/sites/12/2024/04/1.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4 py-40">
        {/* Section Title */}
        <div className="text-center mb-20">
          <div className="text-[#f5b754] text-[10px] uppercase tracking-widest mb-2">
            Explore
          </div>
          <div className="text-4xl font-bold">
            Car <span className="text-[#f5b754]">Promo</span> Video
          </div>
        </div>

        {/* Video Section */}
        <div className="relative text-center">
          <a
            href="https://youtu.be/1LxcTt1adfY"
            className=" relative inline-block"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-6 bg-transparent rounded-full border border-[#f5b754] shadow-lg">
                  <CiPlay1 className="text-white font-bold text-5xl" />
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarPromoVideo;
