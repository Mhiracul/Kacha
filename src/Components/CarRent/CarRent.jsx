import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Select from "react-select";
import { jsPDF } from "jspdf";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CarRent = () => {
  const [visibleCarsCount, setVisibleCarsCount] = useState(4);
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState(null);
  const [endDate, setEndDate] = useState("");
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    time: "",
    day: "",
    phone: "",
    carType: "",
    mopol: "Without Mopol",
    hours: "12",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(null); // New state to store the calculated price
  const [carDetails, setCarDetails] = useState(null);

  const mopolOptions = [
    { value: "With Mopol", label: "With Mopol" },
    { value: "Without Mopol", label: "Without Mopol" },
  ];

  const hoursOptions = [
    { value: "12", label: "12 Hours" },
    { value: "24", label: "24 Hours" },
    { value: "48", label: "48 Hours" },
    { value: "72", label: "72 Hours" },
  ];

  useEffect(() => {
    axios
      .get("https://kachabackend.onrender.com/api/rentals")
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "hours" && value > 24) {
      setEndDate(""); // Clear end date when hours change
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData({ ...formData, location: suggestion.address.label });
    setSuggestions([]);
  };

  const handleCarClick = (car) => {
    setSelectedCar(car);
    setFormData({ ...formData, carType: car.name });
  };

  const calculateTotalPrice = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/rentals/price",
        {
          carId: selectedCar._id,
          hours: parseInt(formData.hours),
          mopol: formData.mopol,
        }
      );

      setCarDetails(response.data.carDetails); // Set car details received from the backend
      setCalculatedPrice(response.data.totalPrice); // Set the price returned from the backend
    } catch (error) {
      console.error("Error calculating price:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Wait for the price calculation
    await calculateTotalPrice();

    // Navigate after calculatedPrice is updated
    if (calculatedPrice) {
      navigate("/confirmation", {
        state: {
          car: selectedCar,
          totalPrice: calculatedPrice,
          formData,
          carDetails,
          day: formData.day,
          pickupLocation: formData.pickupLocation,
          destination: formData.destination, // Pass other details as needed
        },
      });
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Appointment Details", 20, 20);

    doc.setFontSize(14);
    doc.text(`Name: ${formData.name}`, 20, 30);
    doc.text(`Location: ${formData.location}`, 20, 40);
    doc.text(`Time: ${formData.time}`, 20, 50);
    doc.text(`Day: ${formData.day}`, 20, 60);
    doc.text(`Phone: ${formData.phone}`, 20, 70);
    doc.text(`Car Type: ${formData.carType}`, 20, 80);

    const pdfOutput = doc.output("bloburl");
    const whatsappLink = `https://api.whatsapp.com/send?phone=+2348124985138&text=Appointment%20Details%0A%0AName:%20${formData.name}%0ALocation:%20${formData.location}%0ATime:%20${formData.time}%0ADay:%20${formData.day}%0APhone:%20${formData.phone}%0ACar%20Type:%20${formData.carType}%0A%0APDF%20Link:%20${pdfOutput}`;
    window.open(whatsappLink, "_blank");
  };

  const handleSeeMore = () => {
    setVisibleCarsCount(visibleCarsCount + 4);
  };

  const closeModal = () => {
    setSelectedCar(null);
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#2c2c2c",
      border: "1px solid #4b5563",
      borderRadius: "9px",
      padding: "4px",
      boxShadow: "none",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#2c2c2c",
      borderRadius: "1px",
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: "#2c2c2c",
      color: "#fff",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
  };

  return (
    <div className="bg-[#1b1b1b] w-full font-outfit   text-white py-20">
      <div className="container mx-auto md:px-20 px-10">
        {/* Section Title */}
        <div className="flex items-center flex-col gap-20 mb-12">
          <div className="bg-[#f5b754] w-[1px] h-16"></div>
        </div>

        <div className="mb-10">
          <h1 className="text-white text-lg font-medium">How to Rent</h1>
          <p className="text-[#7a7a7a] max-w-2xl mt-4 font-extralight text-sm font-outfit">
            To rent a car, simply choose a car from our collection, fill in the
            details such as your name, pickup and drop-off location, preferred
            rental duration, and any additional requests (like security
            personnel or Mopol). After filling out the form, submit it and we'll
            provide you with the details on WhatsApp, where you can finalize the
            payment and booking.
          </p>
        </div>
        {/* Car Grid */}
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 xl:gap-20 gap-20">
          {cars.slice(0, visibleCarsCount).map((car) => (
            <div
              key={car.id}
              className="relative cursor-pointer group"
              onClick={() => handleCarClick(car)}
            >
              <img
                src={`data:image/${
                  car.imgSrc.includes("png") ? "png" : "jpeg"
                };base64,${car.imgSrc}`}
                alt={car.name}
                className="rounded-3xl xl:h-60 lg:h-60 h-60 w-full object-fit object-center group-hover:opacity-80 group-hover:scale-105 transition duration-300 ease-in-out"
              />
              <div className="absolute mx-auto -bottom-10 max-w-lg rounded-2xl left-0 right-0 bg-[#222] p-4">
                <div className="flex md:flex-row flex-col justify-between items-start md:items-center">
                  <div>
                    <div className="text-white md:text-lg text-sm md:font-semibold font-medium mb-2">
                      <a href="#" className="hover:underline">
                        {car.name}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        {cars.length > visibleCarsCount && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleSeeMore}
              className="px-8 py-3 bg-[#f5b754] text-xs text-black rounded-full hover:bg-yellow-600 transition duration-300"
            >
              See More
            </button>
          </div>
        )}

        {/* Modal */}
        {selectedCar && (
          <div className="fixed inset-0 z-50 px-4 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#222] rounded-2xl overflow-hidden w-full max-w-2xl h-[80vh] ">
              <div className="bg-[#f5b754] text-center rounded-t-2xl py-4 relative">
                <div className="xl:text-xl text-lg font-bold text-[#000]">
                  Rent {selectedCar.name}
                </div>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white font-bold"
                >
                  X
                </button>
              </div>
              <div className="h-full overflow-y-auto py-16 px-4">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg mt-2 bg-[#2c2c2c] border outline-none border-gray-600"
                        required
                      />
                    </div>

                    {/* Pick Up Location */}
                    <div className="mb-4">
                      <label className="text-white text-sm">
                        Pick Up Location
                      </label>
                      <input
                        type="text"
                        name="pickupLocation"
                        className="w-full p-3 rounded-lg mt-2 bg-[#2c2c2c] border outline-none border-gray-600"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        placeholder="Enter pick up location"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="text-white text-sm">Destination</label>
                      <input
                        type="text"
                        name="destination"
                        className="w-full p-3 rounded-lg mt-2 bg-[#2c2c2c] border outline-none border-gray-600"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="Enter destination"
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="hours" className="text-sm mt-4">
                        Hours
                      </label>
                      <Select
                        name="hours"
                        options={hoursOptions}
                        styles={customStyles}
                        value={{
                          label: formData.hours + " Hours",
                          value: formData.hours,
                        }}
                        onChange={(e) =>
                          handleChange({
                            target: { name: "hours", value: e.value },
                          })
                        }
                      />
                    </div>
                    {/* Duration (Hours) */}

                    {/* Mopol Option */}
                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="mopol" className="text-sm mt-4">
                        Security Personnel
                      </label>
                      <Select
                        name="mopol"
                        options={mopolOptions}
                        value={{ label: formData.mopol, value: formData.mopol }}
                        onChange={(e) =>
                          handleChange({
                            target: { name: "mopol", value: e.value },
                          })
                        }
                        styles={customStyles}
                        className="rounded-full text-black"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-sm">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg mt-2 bg-[#2c2c2c] border outline-none border-gray-600"
                        required
                      />
                    </div>

                    {/* Date and Time */}
                    <div className="flex flex-wrap gap-4">
                      <div className="flex flex-col gap-2 w-full ">
                        <label htmlFor="day" className="text-sm">
                          Start Date
                        </label>
                        <input
                          type="date"
                          id="day"
                          name="day"
                          value={formData.day}
                          onChange={handleChange}
                          className="w-full p-3 rounded-lg mt-2 bg-[#2c2c2c] border outline-none border-gray-600"
                          required
                        />
                      </div>

                      {formData.hours > 24 && (
                        <div className="flex flex-col gap-2 w-full mt-4">
                          <label htmlFor="endDate" className="text-sm">
                            End Date
                          </label>
                          <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-3 rounded-lg mt-2 bg-[#2c2c2c] border outline-none border-gray-600"
                            required
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-2 w-full ">
                        <label htmlFor="time" className="text-sm">
                          Time of Booking
                        </label>
                        <input
                          type="time"
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full p-3 rounded-lg mt-2 bg-[#2c2c2c] border outline-none border-gray-600"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="inline-flex  items-center gap-3 font-light md:px-6 md:py-4 px-4 py-2 text-base bg-[#f5b754] text-black rounded-full transition duration-300"
                    >
                      <FaWhatsapp color="#000" />
                      Rent {selectedCar.name}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {calculatedPrice && carDetails && (
          <div className="calculated-price">
            <p>Car Name: {carDetails.name}</p>
            <p>People: {carDetails.people}</p>
            <img
              src={`data:image/jpeg;base64,${carDetails.imgSrc}`}
              alt={carDetails.name}
            />
            <p>Drive Type: {carDetails.driveType}</p>
            <p>Start Date: {carDetails.day}</p>
            <p>Total Price: {calculatedPrice}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarRent;
