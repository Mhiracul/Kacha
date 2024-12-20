import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultLayout from "../../adminlayout/DefaultLayout";

const EditCar = () => {
  const [cars, setCars] = useState([]);
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

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `https://kachabackend.onrender.com/api/cars/${id}`,
        { status: newStatus } // Adjust payload structure if necessary
      );
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.id === id ? { ...car, status: newStatus } : car
        )
      );
    } catch (error) {
      console.error("Error updating car status:", error);
    }
  };

  const handleSeeMore = () => {
    setVisibleCarsCount(visibleCarsCount + 4);
  };

  return (
    <DefaultLayout>
      <div className="bg-[#1b1b1b] w-full font-outfit text-white py-20">
        <div className="md:px-20 px-10">
          {/* Car Grid */}
          <div className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 xl:gap-20 gap-20 md:px-20 py-20 px-0">
            {cars.slice(0, visibleCarsCount).map((car) => (
              <div key={car.id} className="relative">
                <img
                  src={`data:image/${
                    car.imgSrc.includes("png") ? "png" : "jpeg"
                  };base64,${car.imgSrc}`}
                  alt={car.name}
                  className="rounded-3xl h-60 w-full object-cover"
                />
                <div className="absolute mx-auto md:-bottom-16 -bottom-20 max-w-lg rounded-2xl left-0 right-0 bg-[#222] px-4 py-2">
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
                      <div className="flex gap-4">
                        {/* Status Buttons */}
                        <button
                          className={`px-4 py-2 rounded-full ${
                            car.status === "Available"
                              ? "bg-green-500 text-white cursor-not-allowed"
                              : "bg-gray-500 text-gray-300 hover:bg-green-600"
                          }`}
                          disabled={car.status === "Available"}
                          onClick={() =>
                            handleStatusChange(car.id, "Available")
                          }
                        >
                          Available
                        </button>
                        <button
                          className={`px-4 py-2 rounded-full ${
                            car.status === "Sold Out"
                              ? "bg-red-500 text-white cursor-not-allowed"
                              : "bg-gray-500 text-gray-300 hover:bg-red-600"
                          }`}
                          disabled={car.status === "Sold Out"}
                          onClick={() => handleStatusChange(car.id, "Sold Out")}
                        >
                          Sold Out
                        </button>
                      </div>
                    </div>
                    <div className="flex md:flex-row flex-row-reverse gap-4 items-center md:items-center">
                      <span className="text-[#f5b754] md:text-lg text-sm font-semibold">
                        ₦{car.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* See More Button */}
          {cars.length > visibleCarsCount && (
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
    </DefaultLayout>
  );
};

export default EditCar;
