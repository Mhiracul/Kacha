import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from "axios";
import { useSelector } from "react-redux";
import { apiBaseUrl } from "../../config";

// Helper function to convert file to base64
const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const KycApp = () => {
  const [govtId, setGovtId] = useState(null);
  const [passport, setPassport] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user); // Get user slice from Redux store

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert files to base64
    const govtIdBase64 = govtId ? await toBase64(govtId) : null;
    const passportBase64 = passport ? await toBase64(passport) : null;

    try {
      const response = await axios.post(
        `${apiBaseUrl}/submit-kyc`,
        {
          govtId: govtIdBase64,
          passport: passportBase64,
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
        <div className="grid grid-cols-12 gap-4 shadow-md shadow-[#272f4f] px-10 py-10 mt-10 rounded-md [bg-[#05070D] md:mt-6 md:gap-6 2xl:mt-[1.875rem] 2xl:gap-[1.875rem]">
          <div className="col-span-12 xl:col-span-4">
            <h1 className="text-[#1C5FCC] text-xl font-bold font-exo1">
              KYC Verification
            </h1>
            <h1 className="text-white text-sm outline-none font-normal font-exo1">
              KYC Compliance System Software
            </h1>
          </div>

          <div className="xl:col-span-8 border px-10 rounded-md border-[#101c47] col-span-12">
            <h1 className="font-semibold text-xl font-exo1 mt-4 text-slate-300">
              Documents Upload
            </h1>
            <hr className="border-t-1 border-[#302f2f]" />
            <div className="py-10">
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="govtId"
                  className="text-slate-300 font-medium font-exo1"
                >
                  Government Approved ID
                </label>
                <input
                  type="file"
                  className="form-control p-3 text-white mt-3 bg-[#0f172a] transition-border-shadow duration-150 ease-in-out border border-gray-300 shadow-md hover:border-blue-500 hover:shadow-lg font-light text-base w-full block pointer form-sm"
                  name="govtId"
                  id="govtId"
                  onChange={(e) => setGovtId(e.target.files[0])}
                  required
                />
                <div className="mt-5">
                  <label
                    htmlFor="passport"
                    className="text-slate-300 font-medium font-exo1"
                  >
                    User Passport Photo
                  </label>
                  <input
                    type="file"
                    className="form-control p-3 text-white mt-3 bg-[#0f172a] transition-border-shadow duration-150 ease-in-out border border-gray-300 shadow-md hover:border-blue-500 hover:shadow-lg font-light text-base w-full block pointer form-sm"
                    name="passport"
                    id="passport"
                    onChange={(e) => setPassport(e.target.files[0])}
                    required
                  />
                </div>
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

export default KycApp;
