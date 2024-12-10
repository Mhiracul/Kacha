import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from "axios";
import { useSelector } from "react-redux";

const WithdrawalForm = () => {
  const [method, setMethod] = useState("");
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user); // Get user slice from Redux store

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${apiBaseUrl}/submit-withdrawal`,
        {
          method,
          wallet,
          amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      setMessage("");
    }
  };

  return (
    <div className="w-full font-roboto bg-[#05070D] h-screen">
      <DefaultLayout>
        <div className="grid grid-cols-12 gap-4 shadow-md shadow-[#272f4f] px-10 py-10 mt-10 rounded-md bg-[#05070D] md:mt-6 md:gap-6 2xl:mt-[1.875rem] 2xl:gap-[1.875rem]">
          <div className="col-span-12 xl:col-span-4">
            <h1 className="text-[#1C5FCC] text-xl font-bold font-exo1">
              Withdrawal Form
            </h1>
            <h1 className="text-white text-sm outline-none font-normal font-exo1">
              Request a withdrawal from your account
            </h1>
          </div>

          <div className="xl:col-span-8 border px-10 rounded-md border-[#101c47] col-span-12">
            <h1 className="font-semibold text-xl font-exo1 mt-4 text-slate-300">
              Withdrawal Details
            </h1>
            <hr className="border-t-1 border-[#302f2f]" />
            <div className="py-10">
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="method"
                  className="text-slate-300 font-medium font-exo1"
                >
                  Choose Withdrawal Method
                </label>
                <select
                  id="method"
                  className="form-control outline-none p-3 text-white mt-3 bg-[#0f172a] transition-border-shadow duration-150 ease-in-out border border-gray-300 shadow-md hover:border-blue-500 hover:shadow-lg font-light text-base w-full block pointer form-sm"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  required
                >
                  <option value="">Select Method</option>
                  <option value="btc">BTC</option>
                  <option value="eth">ETH</option>
                  <option value="ltc">LTC</option>
                  <option value="usdt-er20">USDT-ERC20</option>
                  <option value="usdt-tr20">USDT-TRC20</option>
                  <option value="dogecoin">Dogecoin</option>
                  <option value="litecoin">Litecoin</option>
                </select>

                <label
                  htmlFor="wallet"
                  className="text-slate-300 font-medium font-exo1 mt-4"
                >
                  Select Wallet
                </label>
                <select
                  id="wallet"
                  className="form-control p-3 outline-none  text-white mt-3 bg-[#0f172a] transition-border-shadow duration-150 ease-in-out border border-gray-300 shadow-md hover:border-blue-500 hover:shadow-lg font-light text-base w-full block pointer form-sm"
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  required
                >
                  <option value="">Select Wallet</option>
                  <option value="main">Main Balance</option>
                  <option value="roi">ROI Wallet</option>
                </select>

                <label
                  htmlFor="amount"
                  className="text-slate-300 font-medium font-exo1 mt-4"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  className="form-control p-3 outline-none  text-white mt-3 bg-[#0f172a] transition-border-shadow duration-150 ease-in-out border border-gray-300 shadow-md hover:border-blue-500 hover:shadow-lg font-light text-base w-full block pointer form-sm"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  className="bg-[#1C5FCC] text-white p-2 mt-6 rounded-md w-full"
                >
                  Submit
                </button>
              </form>

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
            </div>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default WithdrawalForm;
