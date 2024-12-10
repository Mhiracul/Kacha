import { useState, useEffect } from "react";
import axios from "axios";
import DefaultLayout from "../../adminlayout/DefaultLayout";
import { apiBaseUrl } from "../../config";
import toast, { Toaster } from "react-hot-toast";

const PendingFundRequests = () => {
  const [fundRequests, setFundRequests] = useState([]);

  useEffect(() => {
    const fetchFundRequests = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/pending-funds`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        console.log("API Response:", response.data); // Log the response data
        setFundRequests(response.data);
      } catch (error) {
        console.error("Error fetching fund requests:", error);
        toast.error("Failed to fetch fund requests.");
      }
    };

    fetchFundRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await axios.post(
        `${apiBaseUrl}/update-fund-request`,
        { id, action },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      toast.success(`Fund request ${action}d successfully.`);
      setFundRequests(fundRequests.filter((request) => request._id !== id));
    } catch (error) {
      console.error(`Error ${action} fund request:`, error);
      toast.error(`Failed to ${action} fund request.`);
    }
  };

  return (
    <div className="w-full font-roboto bg-[#05070D] h-screen">
      <DefaultLayout>
        <div className="grid grid-cols-12 gap-4 shadow-md shadow-[#272f4f] px-10 py-10 mt-10 rounded-md bg-[#05070D] md:mt-6 md:gap-6 2xl:mt-[1.875rem] 2xl:gap-[1.875rem]">
          <div className="col-span-12">
            <h1 className="text-[#1C5FCC] text-xl font-bold font-exo1">
              Pending Fund Requests
            </h1>
            <div className="mt-4">
              {fundRequests.length === 0 ? (
                <p className="text-white">No pending fund requests</p>
              ) : (
                fundRequests.map((request) => (
                  <div
                    key={request._id}
                    className="bg-[#05070D] shadow-md text-slate-700 rounded p-4 mb-4 flex flex-col border border-gray-300"
                  >
                    <div className="flex mb-4">
                      <div className="flex-1">
                        <p className="font-semibold text-[#1C5FCC]">
                          {request.userId?.fullName || "No Name"}
                        </p>
                      </div>
                      <div className="flex-1 text-right">
                        <p>{request.userId?.email || "No Email"}</p>
                        <p>${request.amount.toFixed(2)}</p>
                        <p>{request.paymentMethod || "No Payment Method"}</p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => handleAction(request._id, "approve")}
                        className="bg-green-500 text-white px-4 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(request._id, "reject")}
                        className="bg-red-500 text-white px-4 py-1 rounded"
                      >
                        Reject
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

export default PendingFundRequests;
