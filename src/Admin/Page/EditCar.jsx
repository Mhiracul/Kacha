import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2"; // Import SweetAlert2
import DefaultLayout from "../../adminlayout/DefaultLayout";

const EditCar = () => {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 4;

  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedCar, setSelectedCar] = useState(null); // Selected car for editing
  const [editedDetails, setEditedDetails] = useState({
    name: "",
    price: "",
    details: "",
  });

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

  const handleEditClick = (car) => {
    setSelectedCar(car);
    setEditedDetails({
      name: car.name,
      price: car.price,
      details: car.details,
    });
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    if (selectedCar) {
      try {
        const response = await axios.put(
          `https://kachabackend.onrender.com/api/cars/${selectedCar._id}`,
          editedDetails
        );
        // Update the car list after successful edit
        setCars((prevCars) =>
          prevCars.map((car) =>
            car._id === selectedCar._id ? { ...car, ...editedDetails } : car
          )
        );
        setShowModal(false);
        setSelectedCar(null);

        // SweetAlert2 Success Notification
        Swal.fire({
          icon: "success",
          title: "Car details updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error saving car edits:", error);

        // SweetAlert2 Error Notification
        Swal.fire({
          icon: "error",
          title: "Failed to update car details",
          text: "Something went wrong. Please try again.",
        });
      }
    }
  };

  const handleDeleteClick = async (carId) => {
    try {
      await axios.delete(`https://kachabackend.onrender.com/api/cars/${carId}`);
      setCars((prevCars) => prevCars.filter((car) => car._id !== carId));

      // SweetAlert2 Success Notification
      Swal.fire({
        icon: "success",
        title: "Car deleted successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error deleting car:", error);

      // SweetAlert2 Error Notification
      Swal.fire({
        icon: "error",
        title: "Failed to delete car",
        text: "Please try again later.",
      });
    }
  };

  const handleStatusChange = async (carId, newStatus) => {
    try {
      const response = await axios.patch(
        `https://kachabackend.onrender.com/api/cars/${carId}`,
        { status: newStatus }
      );
      setCars((prevCars) =>
        prevCars.map((car) =>
          car._id === carId ? { ...car, status: newStatus } : car
        )
      );

      // SweetAlert2 Success Notification
      Swal.fire({
        icon: "success",
        title: `Car status changed to ${newStatus}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error changing car status:", error);

      // SweetAlert2 Error Notification
      Swal.fire({
        icon: "error",
        title: "Failed to change car status",
        text: "Please try again later.",
      });
    }
  };

  const totalPages = Math.ceil(cars.length / carsPerPage);
  const currentCars = cars.slice(
    (currentPage - 1) * carsPerPage,
    currentPage * carsPerPage
  );

  return (
    <DefaultLayout>
      <div className="w-full font-outfit text-white py-10">
        <div className="md:px-20 px-10">
          <h1 className="text-xl font-bold text-[#1C5FCC] mb-4">Edit Cars</h1>

          {/* Car Grid */}
          <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-10 py-10">
            {currentCars.map((car) => (
              <div
                key={car._id}
                className="relative border border-[#101c47] p-4 rounded-md bg-[#0f172a]"
              >
                <div className="relative group">
                  <div className="bg-white absolute top-2 right-2 rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                    <AiOutlineDelete
                      onClick={() => handleDeleteClick(car._id)}
                      className="text-red-500 cursor-pointer text-lg"
                    />
                  </div>
                  {/* Tooltip */}
                  <span className="absolute top-2 right-10 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Delete
                  </span>
                </div>

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

                <button
                  onClick={() => handleEditClick(car)}
                  className="px-4 py-2 bg-blue-500 rounded text-white mt-4"
                >
                  Edit
                </button>

                <div className="flex items-center justify-between mt-4">
                  {/* Toggle Status Buttons */}
                  <div className="flex gap-2">
                    <button
                      className={`px-3 py-1 rounded ${
                        car.status === "Available"
                          ? "bg-gray-400 text-gray-300 cursor-not-allowed"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                      disabled={car.status === "Available"}
                      onClick={() => handleStatusChange(car._id, "Available")}
                    >
                      Available
                    </button>

                    <button
                      className={`px-3 py-1 rounded ${
                        car.status === "Sold Out"
                          ? "bg-gray-400 text-gray-300 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                      disabled={car.status === "Sold Out"}
                      onClick={() => handleStatusChange(car._id, "Sold Out")}
                    >
                      Sold Out
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0f172a] p-6 rounded-md text-white w-96">
            <h2 className="text-lg font-bold mb-4">Edit Car</h2>
            <input
              type="text"
              value={editedDetails.name}
              onChange={(e) =>
                setEditedDetails((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Car Name"
              className="w-full mb-4 px-3 py-2 bg-gray-800 rounded"
            />
            <input
              type="number"
              value={editedDetails.price}
              onChange={(e) =>
                setEditedDetails((prev) => ({ ...prev, price: e.target.value }))
              }
              placeholder="Price"
              className="w-full mb-4 px-3 py-2 bg-gray-800 rounded"
            />
            <textarea
              value={editedDetails.details}
              onChange={(e) =>
                setEditedDetails((prev) => ({
                  ...prev,
                  details: e.target.value,
                }))
              }
              placeholder="Details"
              className="w-full mb-4 px-3 py-2 bg-gray-800 rounded"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-green-500 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red-500 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default EditCar;
