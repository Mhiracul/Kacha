import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API requests

const CarGrids = () => {
  const [cars, setCars] = useState([]); // State to store car data
  const [selectedType, setSelectedType] = useState("All");
  const [visibleCarsCount, setVisibleCarsCount] = useState(4);

  // Fetch car data from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cars"); // Adjust the API endpoint accordingly
        setCars(response.data); // Set the fetched car data to state
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCars(); // Call the function to fetch car data
  }, []);

  // Filter cars based on selected type
  const filteredCars =
    selectedType === "All"
      ? cars
      : cars.filter((car) => car.type === selectedType);

  // Car types for filtering
  const carTypes = ["All", "Benz", "Lexus", "Honda"];

  // Handle "See More" functionality
  const handleSeeMore = () => {
    setVisibleCarsCount(visibleCarsCount + 4); // Show 4 more cars on each click
  };

  return (
    <div className="bg-[#1b1b1b] w-full font-outfit text-white py-20">
      <div className="md:px-20 px-10">
        {/* Section Title */}
        <div className="flex items-center flex-col gap-20 mb-12">
          <div className="bg-[#f5b754] w-[1px] h-16"></div>
        </div>

        {/* Car Type Filter Buttons */}
        <div className="flex gap-2 justify-center mb-12">
          {carTypes.map((type) => (
            <button
              key={type}
              className={`text-white text-xs px-4 py-2 rounded-full ${
                selectedType === type ? "bg-[#f5b754]" : "bg-gray-600"
              }`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Car Grid */}
        <div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 xl:gap-20 gap-20 md:px-20 px-0">
          {filteredCars.slice(0, visibleCarsCount).map((car) => (
            <div key={car.id} className="relative">
              <img
                src={`data:image/${
                  car.imgSrc.includes("png") ? "png" : "jpeg"
                };base64,${car.imgSrc}`}
                alt={car.name}
                className="rounded-3xl h-60 w-full object-cover"
              />
              <div className="absolute mx-auto -bottom-16 max-w-lg rounded-2xl left-0 right-0 bg-[#222] px-4 py-2">
                <div className="flex md:flex-row flex-col justify-between items-start md:items-center">
                  <div>
                    <div className="text-white md:text-lg text-sm md:font-semibold font-medium mb-2">
                      <a href="#" className="hover:underline">
                        {car.name}
                      </a>
                    </div>
                    <div className="text-gray-300 md:text-sm text-xs mb-2">
                      {car.details}
                    </div>
                    {/* Display car status */}
                    <div
                      className={`text-sm font-semibold ${
                        car.status === "Available"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {car.status} {/* Show Available or Sold Out */}
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col-reverse gap-4 items-start md:items-center">
                    <a
                      href="#"
                      className="block text-sm w-full text-center bg-yellow-500 text-black rounded-full py-2 px-4 hover:bg-yellow-600"
                    >
                      Details
                    </a>
                    <div className="items-center">
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

        {/* See More Button */}
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
