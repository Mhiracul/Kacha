import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DefaultLayout from "../../adminlayout/DefaultLayout";
import { apiBaseUrl } from "../../config";
import toast from "react-hot-toast";

const Traders = () => {
  const [traders, setTraders] = useState([]);
  const [selectedTrader, setSelectedTrader] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [traderToDelete, setTraderToDelete] = useState(null);

  useEffect(() => {
    const fetchTraders = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/traders`, {
          headers: { "auth-token": localStorage.getItem("token") },
        });
        setTraders(response.data);
      } catch (error) {
        console.error("Error fetching traders:", error);
        toast.error("Failed to fetch traders.");
      }
    };

    fetchTraders();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiBaseUrl}/traders/${traderToDelete}`, {
        headers: { "auth-token": localStorage.getItem("token") },
      });
      setTraders(traders.filter((trader) => trader._id !== traderToDelete));
      setShowConfirmModal(false);
      toast.success("Trader deleted successfully.");
    } catch (error) {
      console.error("Error deleting trader:", error);
      toast.error("Failed to delete trader.");
    }
  };

  const handleEdit = (trader) => {
    setSelectedTrader(trader);
    setShowEditModal(true);
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    try {
      const updatedTrader = {
        name: event.target.name.value,
        image: event.target.image.value,
        company: event.target.company.value,
        minimumAmount: event.target.minimumAmount.value,
        investorsTotal: event.target.investorsTotal.value,
        returnPercentage: event.target.returnPercentage.value,
        fees: event.target.fees.value,
      };

      console.log("Sending updated trader data:", updatedTrader);

      const response = await axios.put(
        `${apiBaseUrl}/traders/${selectedTrader._id}`,
        updatedTrader,
        {
          headers: { "auth-token": localStorage.getItem("token") },
        }
      );

      console.log("Update response:", response.data);

      setTraders(
        traders.map((trader) =>
          trader._id === selectedTrader._id ? response.data : trader
        )
      );
      setShowEditModal(false);
      toast.success("Trader updated successfully.");
    } catch (error) {
      console.error("Error updating trader:", error);
      toast.error("Failed to update trader.");
    }
  };

  return (
    <div className="w-full font-roboto bg-[#05070D] h-screen">
      <DefaultLayout>
        <div className="container mx-auto mt-6 px-4 py-6 shadow-md shadow-[#272f4f] text-slate-300 rounded-md">
          <div className="flex justify-end mb-4"></div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            {traders.map((trader) => (
              <div
                key={trader._id}
                className="bg-[#05070D] rounded-md shadow-md shadow-[#272f4f] p-5 flex flex-col gap-4"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={`data:image/png;base64,${trader.image}`}
                      alt={`${trader.name} Profile`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-medium">{trader.name}</h3>
                      <p className="text-xs">From ${trader.minimumAmount}</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(trader)}
                      className="text-[#fff] "
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        setTraderToDelete(trader._id);
                        setShowConfirmModal(true);
                      }}
                      className="text-white "
                    >
                      <MdOutlineDelete />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                  <div className="bg-[#0d1b4d] rounded-md shadow-sm px-2 py-1">
                    <div className="flex flex-col text-center items-center gap-2">
                      <h2 className="text-sm font-medium">1M Return</h2>
                      <h4 className="text-xs font-normal">
                        {trader.returnPercentage}%
                      </h4>
                    </div>
                  </div>

                  <div className="bg-[#0d1b4d] rounded-md shadow-sm px-2 py-1">
                    <div className="flex flex-col justify-center text-center items-center gap-2">
                      <h2 className="text-sm font-medium">Investors</h2>
                      <h4 className="text-xs font-normal">
                        {trader.investorsTotal}
                      </h4>
                    </div>
                  </div>

                  <div className="bg-[#0d1b4d] rounded-md shadow-sm px-2 py-1">
                    <div className="flex flex-col text-center items-center gap-2">
                      <h2 className="text-sm font-medium">Fees</h2>
                      <h4 className="text-xs font-normal">{trader.fees}%</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Modal */}
          {showEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999]">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl text-black font-semibold">
                    Edit Trader
                  </h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {selectedTrader && (
                  <form onSubmit={handleSaveChanges}>
                    <div className="mb-2">
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        defaultValue={selectedTrader.name}
                        name="name"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="company"
                        className="block text-xs font-medium text-gray-700"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        defaultValue={selectedTrader.company}
                        name="company"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="minimumAmount"
                        className="block text-xs font-medium text-gray-700"
                      >
                        Minimum Amount
                      </label>
                      <input
                        type="number"
                        id="minimumAmount"
                        defaultValue={selectedTrader.minimumAmount}
                        name="minimumAmount"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="investorsTotal"
                        className="block text-xs font-medium text-gray-700"
                      >
                        Investors Total
                      </label>
                      <input
                        type="number"
                        id="investorsTotal"
                        defaultValue={selectedTrader.investorsTotal}
                        name="investorsTotal"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="returnPercentage"
                        className="block text-xs font-medium text-gray-700"
                      >
                        Return Percentage
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        id="returnPercentage"
                        defaultValue={selectedTrader.returnPercentage}
                        name="returnPercentage"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="fees"
                        className="block text-xs font-medium text-gray-700"
                      >
                        Fees
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        id="fees"
                        defaultValue={selectedTrader.fees}
                        name="fees"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="image"
                        className="block text-xs font-medium text-gray-700"
                      >
                        Image (Base64 Data)
                      </label>
                      <input
                        type="text"
                        id="image"
                        defaultValue={selectedTrader.image}
                        name="image"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        You can paste the base64 encoded string of the image
                        here.
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="bg-[#1C5FCC] text-[#01071C] px-4 py-2 rounded-md"
                    >
                      Save Changes
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Confirm Delete Modal */}
          {showConfirmModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999]">
              <div className="bg-white text-slate-700 rounded-lg shadow-lg p-6 w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                <p className="text-sm mb-4">
                  Are you sure you want to delete this trader?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="bg-gray-300 px-4 py-2 rounded-md"
                  >
                    No
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DefaultLayout>
    </div>
  );
};

export default Traders;
