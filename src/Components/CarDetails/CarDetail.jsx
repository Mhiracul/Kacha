import React from "react";
import { useParams } from "react-router-dom";
import Banner from "./Banner"; // Assuming Banner is in the same folder
import { cars } from "../Cars/CarCarousel";
import { FaWhatsapp } from "react-icons/fa";
import Car1 from "../../assets/car-carousel1.png";
import Car2 from "../../assets/car-carousel2.png";
const CarDetail = () => {
  const { carName } = useParams();

  // Find the car by its name (converting the URL carName to match the format in cars array)
  const car = cars.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === carName
  );

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="bg-[#1b1b1b] font-outfit w-full h-full">
      {/* Banner with dynamic title */}
      <Banner carName={car.name} carImage={car.imgSrc} />
      <div className="mx-auto md:px-20 px-10 py-10">
        {/* Car Details Section */}
        <div className="flex xl:flex-row flex-col container  justify-between ">
          <div>
            <h1 className="text-white text-lg font-medium">
              General Information
            </h1>
            <p className="text-[#7a7a7a] max-w-2xl mt-4 font-extralight text-sm font-outfit">
              Lorem pretium fermentum quam, sit amet cursus ante sollicitudin
              velen morbi consesua the miss sustion consation porttitor orci sit
              amet iaculis nisan. Lorem pretium fermentum quam sit amet cursus
              ante sollicitudin velen fermen morbinetion consesua the risus
              consequation the porttiton.
            </p>
          </div>

          <div className=" text-white py-6">
            <div className="bg-[#f5b754] text-center rounded-t-2xl md:px-28 px-10 py-4">
              {" "}
              <div className="text-xl font-bold text-[#000]">
                ₦{car.price.toLocaleString()}
              </div>
            </div>{" "}
            <div className="bg-[#222]  text-[#999] rounded-b-2xl px-5 py-4">
              <div className="flex flex-col gap-2 items-start">
                <h1 className="text-base">{car.name}</h1>
                <div className="text-lg">{car.details}</div>
              </div>
              <div className="flex flex-col gap-1 mt-4">
                <label htmlFor="" className="text-sm">
                  Your Location
                </label>
                <input
                  type="text"
                  className="rounded-full bg-transparent border-[#C19D60] outline-none border-opacity-5 border p-4"
                />
              </div>

              <a
                className="inline-flex mt-10 items-center gap-3 font-light md:px-6 md:py-4 px-4 py-2 text-base bg-[#f5b754] text-black rounded-full  transition duration-300"
                href="https://api.whatsapp.com/send?phone=+2348124985138"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp color="#000" />
                Buy Now
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-2xl">
          <h1 className="text-white text-lg font-medium">Image Gallery</h1>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-6">
            {/* Image 1 with bottom fade */}
            <div className="relative">
              <img src={Car1} alt="" className="w-full h-full rounded-lg" />
              <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-[#1b1b1b] via-transparent to-transparent opacity-75" />
            </div>

            {/* Image 2 with bottom fade */}
            <div className="relative">
              <img src={Car2} alt="" className="w-full h-full rounded-lg" />
              <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-[#1b1b1b] via-transparent to-transparent opacity-75" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
