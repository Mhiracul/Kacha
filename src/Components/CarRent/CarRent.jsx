import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiUser } from "react-icons/hi";

const CarRent = () => {
  const [visibleCarsCount, setVisibleCarsCount] = useState(4);
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState(null);
  const [endDate, setEndDate] = useState("");
  const [cars, setCars] = useState([]);
  const [selectedType, setSelectedType] = useState("Driver");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dropoffLocation: "",
    pickupLocation: "",
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    startDate: new Date().toISOString().split("T")[0], // Default to today's date
    endDate: new Date().toISOString().split("T")[0],
    phone: "",
    carType: "",
    mopol: "Without Mopol",
    hours: "12",
  });
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDateChange = (field, newDate) => {
    setFormData((prev) => ({
      ...prev,
      [field]: newDate,
    }));
  };

  const handleTimeChange = (newTime) => {
    if (typeof newTime === "string") {
      setFormData({ ...formData, time: newTime });
    } else if (newTime instanceof Date) {
      const hours = newTime.getHours().toString().padStart(2, "0");
      const minutes = newTime.getMinutes().toString().padStart(2, "0");
      setFormData({ ...formData, time: `${hours}:${minutes}` });
    }
  };

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
  const handleCarClick = (car) => {
    setSelectedCar(car);
    setFormData({ ...formData, carType: car.name });
  };

  const calculateTotalPrice = async () => {
    try {
      const response = await axios.post(
        "https://kachabackend.onrender.com/api/rentals/price",
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
          // Pass other details as needed
        },
      });
    }
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
  const carTypes = ["Driver", "Self Drive"];
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModall = () => {
    setModalVisible(false);
    setSelectedImage(null);
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

          <p className="text-[#7a7a7a] max-w-2xl mt-4 font-extralight text-sm font-outfit">
            Note: Customers should ensure all bookings are done 30-45 mins
            before pickup time Extra time on daily rental attracts extra
            charges. (i.e., exceeding 8pm drop-off time) Impromptu stops on
            airport fares attracts extra charges. Number of riders should not
            exceed the designated number of seats available in the car as this
            could lead to automatic trip cancellation.
          </p>
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
        {/* Car Grid */}

        <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 xl:gap-20 gap-20">
          {cars
            .filter((car) => car.driveType === selectedType) // Filter cars by selected type
            .slice(0, visibleCarsCount) // Limit to visible cars
            .map((car, index) => (
              <div key={car.id} className="relative cursor-pointer group">
                <div className="flex ">
                  {/* Log the image source to check its value */}
                  {console.log(car.imgSrc)}

                  {/* Large Image */}

                  {car.imgSrc && car.imgSrc.length > 0 && (
                    <>
                      <div className="flex-shrink-0 w-3/4 mr-4">
                        <img
                          src={`data:image/jpeg;base64,${car.imgSrc[0]}`}
                          alt={car.name}
                          className=" h-96 w-full object-cover group-hover:opacity-80 group-hover:scale-105 transition duration-300 ease-in-out"
                          onClick={() => handleCarClick(car)}
                        />
                      </div>

                      {/* Smaller Images */}

                      <div className=" gap-6 flex-shrink-0  w-1/4">
                        <div className="relative group">
                          {car.imgSrc.slice(1).map((imageSrc, index) => (
                            <img
                              src={`data:image/jpeg;base64,${imageSrc}`}
                              alt={`Car image ${index + 1}`}
                              className=" h-32 w-full object-cover  group-hover:opacity-80 group-hover:scale-105 transition duration-300 ease-in-out"
                              onClick={() =>
                                handleImageClick(
                                  `data:image/jpeg;base64,${imageSrc}`
                                )
                              }
                            />
                          ))}
                        </div>
                        <span className="absolute top-2 -right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to view <br /> the full image
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <div
                  className=" mx-auto -bottom-12 rounded-2xl left-0 right-0 bg-[#222]  px-4 py-2"
                  onClick={() => handleCarClick(car)}
                >
                  <div className="">
                    <div className="text-white md:text-lg text-sm md:font-semibold font-medium mb-1">
                      <p
                        className="hover:underline"
                        onClick={() => handleCarClick(car)}
                      >
                        {car.name}
                      </p>
                      <div className="flex md:flex-row mt-1 flex-row justify-between items-center">
                        <p className="text-[#f5b754] text-sm font-medium flex-grow">
                          <span className="text-white"></span> ₦
                          {car.price.toLocaleString()}
                        </p>
                        <p className="text-xs  font-extralight">12hrs</p>{" "}
                        {/* This will now be aligned to the right */}
                      </div>
                      <div className="flex md:flex-row mt-1 flex-row justify-between items-center">
                        <p className="text-[#f5b754] text-sm font-medium flex-grow">
                          <span className="text-white"> </span> ₦
                          {car.twentyFourHoursPrice.toLocaleString()}
                        </p>
                        <p className="text-xs  font-extralight">24hrs</p>{" "}
                        {/* This will now be aligned to the right */}
                      </div>

                      <div className="flex md:flex-row mt-1 flex-row justify-between items-center">
                        <HiUser className="text-[#f5b754]" />
                        <p className="text-xs  font-extralight">
                          {car.people} persons
                        </p>{" "}
                        {/* This will now be aligned to the right */}
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
                        placeholder="Enter Full Name"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="text-sm">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg mt-2 bg-[#2c2c2c] border outline-none border-gray-600"
                        placeholder="Enter Email"
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
                    <div className="mb-2">
                      <label className="text-white text-sm">
                        Drop-Off Location
                      </label>
                      <input
                        type="text"
                        name="dropoffLocation"
                        className="w-full p-3 rounded-lg mt-2 bg-[#2c2c2c] border outline-none border-gray-600"
                        value={formData.dropoffLocation}
                        onChange={handleChange}
                        placeholder="Enter drop-off Location"
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="hours" className="text-sm mt-2">
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

                    <div className="gap-4">
                      {/* Start Date */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-white">Start Date</label>
                        <input
                          type="date" // Native date picker
                          value={formData.startDate || ""}
                          onChange={(e) =>
                            handleDateChange("startDate", e.target.value)
                          }
                          className="w-full p-3 rounded-lg mt-2 bg-[#2c2c2c] border outline-none border-gray-600 text-white"
                        />
                      </div>

                      {/* End Date */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm text-white">End Date</label>
                        <input
                          type="date" // Native date picker
                          value={formData.endDate || ""}
                          onChange={(e) =>
                            handleDateChange("endDate", e.target.value)
                          }
                          className="w-full p-3 rounded-lg mt-2 bg-[#2c2c2c] border outline-none border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    {/* Time Picker */}
                    <div className="flex flex-wrap gap-4">
                      {/* Time Picker */}
                      <div className="flex flex-col gap-2 w-full relative">
                        <label htmlFor="time" className="text-sm text-white">
                          Time of Booking
                        </label>
                        <input
                          type="time" // Native time picker
                          id="time"
                          value={formData.time || ""}
                          onChange={(e) => handleTimeChange(e.target.value)} // Handle time change
                          className="w-full p-3 rounded-lg mt-2 bg-[#2c2c2c] border outline-none border-gray-600 cursor-pointer text-white"
                        />
                      </div>
                    </div>

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
                        placeholder="Enter Phone Number"
                        required
                      />
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
            <p>Start Date: {carDetails.startDate}</p>
            <p>Total Price: {calculatedPrice}</p>
          </div>
        )}

        {modalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg p-4 max-w-4xl">
              <button
                className="absolute top-2 right-2 text-black text-xl font-bold"
                onClick={closeModall}
              >
                ×
              </button>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-auto rounded-lg"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarRent;
