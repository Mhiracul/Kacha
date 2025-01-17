import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Banner from "./Banner"; // Assuming Banner is in the same folder
import { FaWhatsapp } from "react-icons/fa";
import Car1 from "../../assets/car-carousel1.png";
import { HiUser } from "react-icons/hi";
import Loader from "../../Loader";

const CarDetail = () => {
  const { carName } = useParams(); // Get car name from URL parameter
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Fetch car details based on the carName parameter
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(
          `https://kachabackend.onrender.com/api/cars`
        );
        const data = await response.json();
        // Find the car matching the carName
        const selectedCar = data.find(
          (c) => c.name.toLowerCase().replace(/\s+/g, "-") === carName
        );
        setCar(selectedCar);
      } catch (error) {
        console.error("Failed to fetch car details:", error);
      } finally {
        setLoading(false); // Set loading to false when fetch is complete
      }
    };

    fetchCarDetails();
  }, [carName]);

  if (loading) {
    return <Loader />;
  }

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="bg-[#1b1b1b] font-outfit w-full h-full">
      {/* Banner with dynamic title */}
      <Banner
        carName={car.name}
        carImage={`data:image/${
          car.imgSrc.includes("png") ? "png" : "jpeg"
        };base64,${car.imgSrc}`}
      />
      <div className="mx-auto md:px-20 px-10 py-10">
        {/* Car Details Section */}
        <div className="flex xl:flex-row flex-col container justify-between">
          <div>
            <h1 className="text-white text-lg font-medium">
              General Information
            </h1>
            <p className="text-[#7a7a7a] max-w-2xl mt-4 font-extralight text-sm font-outfit">
              {car.details}
            </p>
          </div>

          <div className="text-white py-6">
            <div className="bg-[#f5b754] text-center rounded-t-2xl md:px-28 px-10 py-4">
              <div className="text-xl font-bold text-[#000]">
                ₦{car.price.toLocaleString()}
              </div>
            </div>
            <div className="bg-[#222] text-[#999] rounded-b-2xl px-5 py-4">
              <div className="flex flex-col gap-2 items-start">
                <h1 className="text-base">{car.name}</h1>
                <div className="text-gray-300 md:text-sm text-xs mb-2">
                  <span className="inline-flex gap-1 items-center">
                    {car.seat} <HiUser className="text-[#f5b754]" />
                  </span>
                  , Auto, {car.Bags} Bags
                </div>
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
                className="inline-flex mt-10 items-center gap-3 font-light md:px-6 md:py-4 px-4 py-2 text-base bg-[#f5b754] text-black rounded-full transition duration-300"
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

          <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-6">
            {/* Dynamically rendering additional images */}
            {car.additionalImages && car.additionalImages.length > 0 ? (
              car.additionalImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={`data:image/${
                      image.includes("png") ? "png" : "jpeg"
                    };base64,${image}`}
                    alt={`Car Image ${index + 1}`}
                    className="w-full h-full rounded-lg"
                  />
                  <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-[#1b1b1b] via-transparent to-transparent opacity-75" />
                </div>
              ))
            ) : (
              <div className="text-gray-400">
                No additional images available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
