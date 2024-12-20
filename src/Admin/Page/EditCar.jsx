import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultLayout from "../../adminlayout/DefaultLayout";

const EditCar = () => {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 4;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCars();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/cars/${id}`, {
        status: newStatus,
      });
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.id === id ? { ...car, status: newStatus } : car
        )
      );
    } catch (error) {
      console.error("Error updating car status:", error);
    }
  };

  const totalPages = Math.ceil(cars.length / carsPerPage);
  const currentCars = cars.slice(
    (currentPage - 1) * carsPerPage,
    currentPage * carsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <DefaultLayout>
      <div className="w-full font-outfit text-white py-10">
        <div className="md:px-20 px-10">
          <h1 className="text-xl font-bold text-[#1C5FCC] mb-4">Edit Cars</h1>

          {/* Car Grid */}
          <div className="grid grid-cols-2 gap-10 py-10">
            {currentCars.map((car) => (
              <div
                key={car.id}
                className="border border-[#101c47] p-4 rounded-md bg-[#0f172a]"
              >
                <img
                  src={`data:image/${
                    car.imgSrc.includes("png") ? "png" : "jpeg"
                  };base64,${car.imgSrc}`}
                  alt={car.name}
                  className="rounded-md h-40 w-full object-cover mb-4"
                />
                <h2 className="text-lg text-white font-medium">{car.name}</h2>
                <p className="text-gray-300 text-sm mb-4">{car.details}</p>
                <p className="text-[#f5b754] font-bold mb-4">
                  ₦{car.price.toLocaleString()}
                </p>

                <div className="flex gap-4">
                  <button
                    className={`px-4 py-2 rounded ${
                      car.status === "Available"
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : "bg-gray-500 text-gray-300 hover:bg-green-600"
                    }`}
                    disabled={car.status === "Available"}
                    onClick={() => handleStatusChange(car.id, "Available")}
                  >
                    Available
                  </button>
                  <button
                    className={`px-4 py-2 rounded ${
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
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === index + 1
                    ? "bg-[#1C5FCC] text-white"
                    : "bg-gray-500 text-gray-300 hover:bg-[#1C5FCC]"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditCar;
