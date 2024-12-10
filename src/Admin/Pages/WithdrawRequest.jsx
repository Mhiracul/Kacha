import { useState, useEffect } from "react";
import axios from "axios";
import DefaultLayout from "../../adminlayout/DefaultLayout";
import { apiBaseUrl } from "../../config";

const WithdrawRequest = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/pending`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        setWithdrawals(response.data);
      } catch (error) {
        console.error("Error fetching withdrawals:", error);
        setError("Failed to fetch withdrawals.");
      }
    };

    fetchWithdrawals();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.post(
        `${apiBaseUrl}/approve/${id}`,
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      setMessage("Withdrawal approved successfully.");
      setWithdrawals(withdrawals.filter((withdrawal) => withdrawal._id !== id));
    } catch (error) {
      console.error("Error approving withdrawal:", error);
      setError("Failed to approve withdrawal.");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(
        `${apiBaseUrl}/withdrawal/reject/${id}`,
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      setMessage("Withdrawal rejected successfully.");
      setWithdrawals(withdrawals.filter((withdrawal) => withdrawal._id !== id));
    } catch (error) {
      console.error("Error rejecting withdrawal:", error);
      setError("Failed to reject withdrawal.");
    }
  };

  return (
    <div className="w-full font-roboto bg-[#05070D] h-screen">
      <DefaultLayout>
        <div className="grid grid-cols-12 gap-4 shadow-md shadow-[#272f4f] px-10 py-10 mt-10 rounded-md bg-[#05070D] md:mt-6 md:gap-6 2xl:mt-[1.875rem] 2xl:gap-[1.875rem]">
          <div className="col-span-12">
            <h1 className="text-[#1C5FCC] text-xl font-bold font-exo1">
              Pending Withdrawals
            </h1>
            {message && (
              <div className="bg-green-500 text-white p-2 mt-4 rounded-md">
                {message}
              </div>
            )}
            {error && (
              <div className="bg-red-500 text-white p-2 mt-4 rounded-md">
                {error}
              </div>
            )}
            <div className="mt-4">
              {withdrawals.length === 0 ? (
                <p className="text-white">No pending withdrawals</p>
              ) : (
                withdrawals.map((withdrawal) => (
                  <div
                    key={withdrawal._id}
                    className="bg-[#05070D] shadow-md text-slate-700 rounded p-4 mb-4 flex flex-col border border-gray-300"
                  >
                    <div className="flex mb-4">
                      <div className="flex-1">
                        <p className="font-semibold text-[#1C5FCC]">
                          {withdrawal.userId?.fullName || "No Name"}
                        </p>
                      </div>
                      <div className="flex-1 text-right">
                        <p>{withdrawal.method || "No Method"}</p>
                        <p>{withdrawal.wallet || "No Wallet"}</p>
                        <p>${withdrawal.amount.toFixed(2)}</p>
                        <p>{withdrawal.address || "No Address"}</p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => handleApprove(withdrawal._id)}
                        className="bg-green-500 text-white px-4 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(withdrawal._id)}
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
    </div>
  );
};

export default WithdrawRequest;
