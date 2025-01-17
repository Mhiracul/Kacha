import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CarGrids = () => {
  const [cars, setCars] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [visibleCarsCount, setVisibleCarsCount] = useState(4);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          "https://kachabackend.onrender.com/api/cars"
        );
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCars();
  }, []);

  const filteredCars =
    selectedType === "All"
      ? cars
      : cars.filter((car) => car.type === selectedType);

  const carTypes = ["All", "benz", "lexus", "honda", "toyota"];

  const handleSeeMore = () => {
    setVisibleCarsCount(visibleCarsCount + 4);
  };

  return (
    <div className="bg-[#1b1b1b] w-full font-outfit text-white py-20">
      <div className="md:px-20 px-10">
        <div className="flex items-center flex-col gap-20 mb-12">
          <div className="bg-[#f5b754] w-[1px] h-16"></div>
        </div>

        <div className="flex gap-2 justify-center mb-12">
          {carTypes.map((type) => (
            <button
              key={type}
              className={`text-white capitalize text-xs px-4 py-2 rounded-full ${
                selectedType === type ? "bg-[#f5b754]" : "bg-gray-600"
              }`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Display message when no cars are found for the selected type */}
        {filteredCars.length === 0 ? (
          <div className="text-center text-white text-lg">
            No cars available for this search.
          </div>
        ) : (
          <div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 xl:gap-28 gap-24 md:px-20 py-20 px-0">
            {filteredCars.slice(0, visibleCarsCount).map((car) => (
              <div key={car.id} className="relative">
                {/* Car Status Badge */}
                <div
                  className={`absolute top-2 right-2 text-xs font-semibold px-3 py-1 rounded-full ${
                    car.status === "Available"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {car.status}
                </div>
                {/* Car Image */}
                <img
                  src={`data:image/${
                    car.imgSrc.includes("png") ? "png" : "jpeg"
                  };base64,${car.imgSrc}`}
                  alt={car.name}
                  className="rounded-3xl h-80 w-full object-cover"
                />
                <div className="absolute mx-auto md:-bottom-16 -bottom-20 max-w-lg rounded-2xl left-0 right-0 bg-[#222] px-4 py-2">
                  <div className="flex md:flex-row flex-col justify-between items-start md:items-center">
                    <div>
                      <div className="text-white md:text-lg capitalize cursor-pointer text-sm md:font-semibold font-medium mb-2">
                        <a href="#" className="hover:underline">
                          {car.name}
                        </a>
                      </div>
                      <div className="text-gray-300 cursor-pointer capitalize md:text-sm text-xs mb-2">
                        {car.type}
                      </div>
                    </div>
                    <div className="flex md:flex-row flex-row-reverse gap-4 items-center md:items-center">
                      <Link
                        to={`/car-details/${car.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="block text-sm w-full text-center bg-yellow-500 text-black rounded-full py-2 px-4 hover:bg-yellow-600"
                      >
                        Details
                      </Link>
                      <div className="items-center cursor-pointer">
                        <span className="text-[#f5b754] md:text-lg text-sm font-semibold">
                          ₦{car.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredCars.length > visibleCarsCount && (
          <div className="flex justify-center mt-20">
            <button
              onClick={handleSeeMore}
              className="px-8 py-3 bg-[#f5b754] text-xs text-black rounded-full hover:bg-yellow-600 transition duration-300"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarGrids;
