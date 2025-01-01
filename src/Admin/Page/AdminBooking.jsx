import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "../../adminlayout/DefaultLayout";
import toast, { Toaster } from "react-hot-toast";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch all bookings
    axios
      .get("http://localhost:5000/api/bookings")
      .then((response) => setBookings(response.data))
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to fetch bookings.");
      });
  }, []);

  const handleApprove = (bookingId) => {
    // Approve the booking
    axios
      .put(`http://localhost:5000/api/bookings/${bookingId}/approve`)
      .then((response) => {
        toast.success(response.data.message);
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
      })
      .catch((error) => {
        console.error("Error approving booking:", error);
        toast.error("Failed to approve booking.");
      });
  };

  return (
    <div className="w-full font-roboto bg-[#01071C] h-screen">
      <DefaultLayout>
        <div className="grid grid-cols-12 gap-4 shadow-md shadow-[#272f4f] px-10 py-10 mt-10 rounded-md  md:mt-6 md:gap-6 2xl:mt-[1.875rem] 2xl:gap-[1.875rem]">
          <div className="col-span-12">
            <h1 className="text-[#ffb400] text-xl font-bold font-exo1">
              Car Rental Bookings
            </h1>
            <div className="mt-4">
              {bookings.length === 0 ? (
                <p className="text-white">No bookings available</p>
              ) : (
                bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="bg-[#01071C] shadow-md text-slate-700 rounded p-4 mb-4 flex flex-col border border-gray-300"
                  >
                    <div className="flex mb-4">
                      <div className="flex-1">
                        <p className="font-semibold text-[#ffb400]">
                          {booking.name || "No Name"}
                        </p>
                      </div>
                      <div className="flex-1 text-right">
                        <p>{booking.destination || "No Destination"}</p>
                        <p>Status: {booking.status || "Pending"}</p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => handleApprove(booking._id)}
                        className="bg-green-500 text-white px-4 py-1 rounded"
                      >
                        Approve Booking
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </DefaultLayout>
      <Toaster />
    </div>
  );
};

export default AdminBookings;
