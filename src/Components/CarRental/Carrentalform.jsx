import React, { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineArrowOutward } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import Car from "../../assets/2.jpg";

const CarRentalForm = () => {
  const [carType, setCarType] = useState("Choose Car Type");
  const [pickupLocation, setPickupLocation] = useState("Pick Up Location");
  const [dropoffLocation, setDropoffLocation] = useState("Drop Off Location");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  return (
    <div
      className="relative w-full font-outfit h-full inset-0"
      style={{
        backgroundImage: `url(${Car})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-[#000] opacity-50"
        aria-hidden="true"
      ></div>
      <div className="flex flex-col relative items-center font-outfit py-20 px-6">
        {/* Section Title */}
        <div className="text-center mb-8">
          <div className="text-[#f5b754] font-light text-xs uppercase">
            Rent Now
          </div>
          <div className="text-white text-3xl mt-4 font-bold">
            Book Auto Rental
          </div>
        </div>

        {/* Booking Form */}
        <div className="w-full max-w-[1000px] text-xs font-light bg-[#222] rounded-[60px] shadow-lg">
          <form className="flex flex-col md:flex-row items-center p-4 gap-4 md:gap-6">
            {/* Car Type Dropdown */}
            <div className="relative group w-full lg:w-auto ">
              <div
                className="border-r border-[#2b2b2b] justify-between flex  items-center text-[#999] rounded-lg p-2 cursor-pointer"
                onClick={() => setCarType(carType)}
              >
                {carType} <RiArrowDropDownLine color="#f5b754" />
              </div>
              <div className="absolute hidden group-hover:block bg-[#222] z-[99999] text-white shadow-md rounded-md w-full mt-1">
                <span
                  className="block px-4 py-2 hover:text-[#222] hover:bg-gray-200"
                  onClick={() => setCarType("Convertible")}
                >
                  Salon
                </span>
                <span
                  className="block px-4 py-2 hover:text-[#222] hover:bg-gray-200"
                  onClick={() => setCarType("Luxury Cars")}
                >
                  Luxury Cars
                </span>
                <span
                  className="block px-4 py-2 hover:text-[#222] hover:bg-gray-200"
                  onClick={() => setCarType("Sedan")}
                >
                  Antique
                </span>
                <span
                  className="block px-4 py-2 hover:text-[#222] hover:bg-gray-200"
                  onClick={() => setCarType("Small Cars")}
                >
                  Executive Luxury
                </span>
              </div>
            </div>

            <div className="relative group w-full  justify-between flex items-center lg:w-auto">
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="text-[#999] rounded-lg p-2  bg-transparent cursor-pointer focus:outline-none no-date-icon"
                placeholder="PickUp Date"
              />
              <CiCalendarDate color="#f5b754" />
            </div>

            {/* Pickup Location Dropdown */}

            {/* Pickup Location Dropdown */}
            <div className="relative group w-full lg:w-auto">
              <div
                className="text-[#999] border-r border-[#2b2b2b] justify-between flex items-center rounded-lg p-2 cursor-pointer"
                onClick={() => setPickupLocation(pickupLocation)}
              >
                {pickupLocation} <RiArrowDropDownLine color="#f5b754" />
              </div>
              <div className="absolute hidden group-hover:block bg-[#222] text-white shadow-md rounded-md w-full mt-1">
                <span
                  className="block px-4 py-2 hover:text-[#222] hover:bg-gray-200"
                  onClick={() => setPickupLocation("Ajah")}
                >
                  Ajah
                </span>
                <span
                  className="block px-4 py-2 hover:text-[#222] hover:bg-gray-200"
                  onClick={() => setPickupLocation("Surulere")}
                >
                  Surulere
                </span>
                <span
                  className="block px-4 py-2 hover:text-[#222] hover:bg-gray-200"
                  onClick={() => setPickupLocation("Ikoyi")}
                >
                  Ikoyi
                </span>
              </div>
            </div>

            <div className="relative group w-full justify-between flex items-center lg:w-auto">
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="text-[#999] rounded-lg  p-2 bg-transparent cursor-pointer focus:outline-none no-date-icon"
                placeholder="Return Date"
              />
              <CiCalendarDate color="#f5b754" />
            </div>

            {/* Drop Off Location Dropdown */}
            <div className="relative group w-full lg:w-auto">
              <div
                className="text-[#999] border-r border-[#2b2b2b] justify-between flex items-center rounded-lg p-2 cursor-pointer"
                onClick={() => setDropoffLocation(dropoffLocation)}
              >
                {dropoffLocation} <RiArrowDropDownLine color="#f5b754" />
              </div>
              <div className="absolute hidden group-hover:block bg-[#222] text-white shadow-md rounded-md w-full mt-1">
                <span
                  className="block px-4 py-2 hover:text-[#222] hover:bg-gray-200"
                  onClick={() => setPickupLocation("Ajah")}
                >
                  Ajah
                </span>
                <span
                  className="block px-4 py-2 hover:text-[#222] hover:bg-gray-200"
                  onClick={() => setPickupLocation("Surulere")}
                >
                  Surulere
                </span>
                <span
                  className="block px-4 py-2 hover:text-[#222] hover:bg-gray-200"
                  onClick={() => setPickupLocation("Ikoyi")}
                >
                  Ikoyi
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex text-[#999] items-end w-full lg:w-auto">
              <button
                type="submit"
                className="bg-[#f5b754] inline-flex gap-1 items-center text-black font-normal text-xs font-outfit px-10 py-5 rounded-full transition-all hover:bg-yellow-600 w-full md:w-auto"
              >
                Rent Now <MdOutlineArrowOutward />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarRentalForm;
