import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { FaUsers } from "react-icons/fa";
import { BsFillLuggageFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import access from "../assets/access.svg";
import { toast, Toaster } from "react-hot-toast"; // Importing toast

const ConfirmationPage = () => {
  const { state } = useLocation();
  const { carDetails, totalPrice, formData } = state;
  const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  // State for quantity input
  const [quantity, setQuantity] = useState(1); // Initial quantity value
  const [updatedTotalPrice, setUpdatedTotalPrice] = useState(totalPrice); // State for updated total price
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [bookingData, setBookingData] = useState(null); // Store booking data temporarily

  // Calculate updated total price when quantity changes
  useEffect(() => {
    setUpdatedTotalPrice(totalPrice * quantity);
  }, [quantity, totalPrice]);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value)); // Ensure the value is a number
  };
  const formattedDay = new Date(formData.day).toLocaleDateString("en-US", {
    weekday: "long", // Wednesday
    year: "numeric", // 2025
    month: "short", // Jan
    day: "numeric", // 1
  });
  const handlePaymentProofChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPaymentProof(reader.result.split(",")[1]); // Extract Base64 string from the full Data URL
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle the continue button to open the modal
  const handleContinueClick = () => {
    setBookingData({
      name: formData.name,
      phone: formData.phone,
      carDetails: carDetails,
      quantity,
      totalPrice: updatedTotalPrice,
      pickupLocation: formData.pickupLocation,
      destination: formData.destination,
      rentalDate: formData.day,
      rentalDuration: formData.hours,
      status: "pending",
      paymentProof: null, // Will be updated after payment proof is uploaded
    });
    setShowPaymentModal(true);
  };

  // Submit booking after payment proof is uploaded
  const handleSubmitPayment = async () => {
    if (!paymentProof) {
      setPaymentStatus("Please upload your payment proof.");
      return;
    }

    try {
      // Update booking data with payment proof
      const updatedBookingData = { ...bookingData, paymentProof };

      // Now submit the booking data to the server
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        updatedBookingData
      );

      if (response.status === 201) {
        setPaymentStatus(
          "Booking confirmed! Payment proof uploaded successfully."
        );
        setShowPaymentModal(false); // Close the modal after successful submission
        toast.success(
          "Booking Confirmed! Payment Proof Uploaded Successfully! Redirecting to Home..."
        ); // Show success toast

        // Redirect to home page after successful booking
        setTimeout(() => {
          navigate("/"); // Redirect to home page after 2 seconds
        }, 2000);
      }
    } catch (error) {
      console.error("Error uploading payment proof:", error);
      setPaymentStatus("Error uploading payment proof.");
    }
  };

  return (
    <div className="confirmation-page">
      <Header />
      <div className="bg-[#131313] font-outfit w-full h-full">
        <div className="container mx-auto md:px-10 px-4 py-20">
          <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-[1.875rem]">
            <div className="bg-[#191919] xl:col-span-8 col-span-12 shadow-md rounded-2xl">
              <div className="px-6 py-3">
                <div className="flex lg:flex-row md:flex-col flex-col items-center gap-10">
                  <div className="flex flex-col items-center gap-3">
                    <h2 className="font-medium text-2xl text-[#fff]">
                      {carDetails.name}
                    </h2>
                    <img
                      src={`data:image/jpeg;base64,${carDetails.imgSrc}`}
                      alt={carDetails.name}
                      className="lg:w-40 md:w-full w-full lg:h-40 md:h-full h-full rounded-md"
                    />
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <div className="flex gap-0.5 flex-col items-center">
                      <FaUsers color="#fff" size={20} />
                      <p className="text-[10px] font-light text-[#999]">
                        Max no of people
                      </p>
                    </div>

                    <p className=" text-sm text-white font-normal">
                      {carDetails.people}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <div className="flex gap-0.5 flex-col items-center">
                      <BsFillLuggageFill color="#fff" size={20} />
                      <p className="text-[10px] font-light text-[#999]">
                        Excess Luggage
                      </p>
                    </div>

                    <p className=" text-sm text-white font-normal">
                      Not allowed
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <div className="flex gap-0.5 flex-col items-center">
                      <IoIosTime color="#fff" size={20} />
                      <p className="text-[10px] font-light text-[#999]">
                        Rental Duration
                      </p>
                    </div>

                    <p className=" text-sm text-white font-normal">
                      {formData.hours} Hours
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <p className=" text-xl tracking-wide text-white font-bold ">
                      ₦{formatPrice(updatedTotalPrice)}
                    </p>

                    <div>
                      <select
                        value={quantity}
                        onChange={handleQuantityChange}
                        placeholder="Quantity"
                        className="text-center w-full px-10 py-2 outline-none border rounded-md"
                      >
                        <option value="" disabled>
                          Quantity
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#191919] shadow-md rounded-2xl col-span-12 xl:col-span-4 flex flex-col justify-between">
              <div className="py-3 px-4 flex-grow">
                <h1 className="text-lg text-white font-medium">
                  Booking Summary
                </h1>
                <div className="mt-10 flex flex-col gap-4">
                  <div className="flex text-white justify-between items-center">
                    <p>Date</p>
                    <p>{formattedDay}</p>
                  </div>
                  <div className="flex text-white justify-between items-center">
                    <p>From</p>
                    <p>{formData.pickupLocation}</p>
                  </div>
                  <div className="flex text-white justify-between items-center">
                    <p>To</p>
                    <p>{formData.destination}</p>
                  </div>
                </div>
              </div>

              <button
                className="bg-red-700 text-white w-full border-none py-2"
                onClick={handleContinueClick}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      {showPaymentModal && (
        <div className="modal-overlay font-outfit fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-content z-[99999] bg-gradient bg-gradient-to-br from-[#fff] to-transparent  p-6 rounded-lg w-96 relative">
            {/* Close button */}
            <button
              onClick={() => setShowPaymentModal(false)} // Close modal when clicked
              className="absolute top-2 right-2 text-black font-bold"
            >
              <AiOutlineClose />
            </button>

            <h2 className="text-black text-2xl mb-4">Payment Confirmation</h2>
            {/* Display Account Number and Total Price */}
            <div className="flex flex-col text-center items-center">
              <div>
                {" "}
                <img src={access} alt="" className="w-28 h-28" />
              </div>

              <div className="text-black mb-4">
                <p className="text-base font-medium">KACHA AUTOS</p>{" "}
                <p className="text-base font-medium">1696516183</p>{" "}
                {/* Replace with actual account number */}
                <p className="text-lg font-bold">
                  ₦{formatPrice(updatedTotalPrice)}
                </p>
              </div>
            </div>

            <p className="text-black mb-4">
              Please upload your payment proof below.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handlePaymentProofChange}
              className="border border-gray-500 text-wblack w-full p-2 mb-4"
            />
            <button
              className="bg-[#f5b754] text-black py-2 px-4 mt-4 w-full"
              onClick={handleSubmitPayment}
            >
              Submit Payment Proof
            </button>
            {paymentStatus && (
              <p className="text-white mt-2">{paymentStatus}</p>
            )}
          </div>
        </div>
      )}
      <Toaster position="top-right" />

      <Footer />
    </div>
  );
};

export default ConfirmationPage;
