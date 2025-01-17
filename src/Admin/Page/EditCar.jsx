import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DefaultLayout from "../../adminlayout/DefaultLayout";
import { FaTrashAlt } from "react-icons/fa"; // Import Trash Icon

const EditCar = () => {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCar, setEditingCar] = useState(null); // Track the car being edited
  const [editedData, setEditedData] = useState({
    name: "",
    details: "",
    price: "",
  });
  const carsPerPage = 4;

  // useRef to track the editable element
  const editableRef = useRef(null);

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
      await axios.put(`https://kachabackend.onrender.com/api/cars/${id}`, {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://kachabackend.onrender.com/api/cars/${id}`);
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car.id);
    setEditedData({ name: car.name, details: car.details, price: car.price });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(
        `https://kachabackend.onrender.com/api/cars/${id}`,
        editedData
      );
      setCars((prevCars) =>
        prevCars.map((car) => (car.id === id ? { ...car, ...editedData } : car))
      );
      setEditingCar(null); // Reset editing state
    } catch (error) {
      console.error("Error saving car data:", error);
    }
  };

  const handleBlur = (id) => {
    // If clicking outside the editable area, stop editing
    setEditingCar(null);
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
                className="border border-[#101c47] p-4 rounded-md bg-[#0f172a] relative"
              >
                {/* Trash Bin Icon */}
                <button
                  className="absolute top-2 right-2 text-red-500"
                  onClick={() => handleDelete(car.id)}
                >
                  <FaTrashAlt size={20} />
                </button>

                <img
                  src={`data:image/${
                    car.imgSrc.includes("png") ? "png" : "jpeg"
                  };base64,${car.imgSrc}`}
                  alt={car.name}
                  className="rounded-md h-40 w-full object-cover mb-4"
                />

                {/* Editable Fields */}
                {editingCar === car.id ? (
                  <div ref={editableRef} onBlur={() => handleBlur(car.id)}>
                    {/* Editable Name */}
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) =>
                        setEditedData({ ...editedData, name: e.target.value })
                      }
                      className="text-lg text-white font-medium mb-2 w-full bg-transparent border-b border-[#f5b754] focus:outline-none"
                    />
                    {/* Editable Details */}
                    <textarea
                      value={editedData.details}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          details: e.target.value,
                        })
                      }
                      className="text-sm text-gray-300 mb-2 w-full bg-transparent border-b border-[#f5b754] focus:outline-none"
                    />
                    {/* Editable Price */}
                    <input
                      type="number"
                      value={editedData.price}
                      onChange={(e) =>
                        setEditedData({ ...editedData, price: e.target.value })
                      }
                      className="text-[#f5b754] font-bold mb-4 w-full bg-transparent border-b border-[#f5b754] focus:outline-none"
                    />
                    <button
                      onClick={() => handleSave(car.id)}
                      className="text-white bg-[#1C5FCC] px-4 py-2 rounded"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Display Name */}
                    <h2
                      className="text-lg text-white font-medium cursor-pointer"
                      onClick={() => handleEdit(car)}
                    >
                      {car.name}
                    </h2>
                    {/* Display Details */}
                    <p
                      className="text-gray-300 text-sm mb-4 cursor-pointer"
                      onClick={() => handleEdit(car)}
                    >
                      {car.details}
                    </p>
                    {/* Display Price */}
                    <p
                      className="text-[#f5b754] font-bold mb-4 cursor-pointer"
                      onClick={() => handleEdit(car)}
                    >
                      ₦{car.price.toLocaleString()}
                    </p>
                  </div>
                )}

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
