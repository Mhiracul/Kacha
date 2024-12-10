import { useState, useEffect } from "react";
import axios from "axios";
import { BsTelephoneInbound } from "react-icons/bs";
import {
  MdOutlineDriveFileRenameOutline,
  MdOutlinePassword,
} from "react-icons/md";
import DefaultLayout from "../../layout/DefaultLayout";
import { apiBaseUrl } from "../../config";

const Settings = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/profile`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        const { data } = response;
        setFormData({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          password: "", // You might not want to pre-fill password
        });
      } catch (error) {
        console.error("Error retrieving profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/profile", formData, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      // You might want to add a success message or redirect here
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="w-full font-roboto bg-[#05070D] h-screen">
      <DefaultLayout>
        <div className="grid grid-cols-12 gap-4 shadow-md shadow-[#272f4f] px-10 py-10 mt-10 rounded-md bg-[#05070D] md:mt-6 md:gap-6 2xl:mt-[1.875rem] 2xl:gap-[1.875rem]">
          <div className="col-span-12 xl:col-span-4">
            <h1 className="text-[#1C5FCC] text-xl font-bold font-exo1">
              Settings
            </h1>
            <h1 className="text-white text-sm outline-none font-normal font-exo1">
              Update your profile information
            </h1>
          </div>

          <div className="xl:col-span-8 border px-10 rounded-md border-[#101c47] col-span-12">
            <h1 className="font-semibold text-xl font-exo1 mt-4 text-slate-300">
              Profile Details
            </h1>
            <hr className="border-t-1 border-[#302f2f]" />
            <div className="py-10">
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="fullName"
                  className="text-slate-300  font-medium font-exo1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-4">
                    <MdOutlineDriveFileRenameOutline
                      size={20}
                      color="#ffb400"
                    />
                  </span>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="form-control p-3 pl-14 outline-none text-white mt-3 bg-[#0f172a] transition-border-shadow duration-150 ease-in-out border border-gray-300 shadow-md hover:border-blue-500 hover:shadow-lg font-light text-sm w-full block pointer form-sm"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="py-3">
                  <label
                    htmlFor="email"
                    className="text-slate-300 font-medium font-exo1 mt-4"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-4">
                      <svg
                        className="fill-[#ffb400]"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                            fill=""
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control p-3 px-14 outline-none text-white mt-3 bg-[#0f172a] transition-border-shadow duration-150 ease-in-out border border-gray-300 shadow-md hover:border-blue-500 hover:shadow-lg font-light text-sm w-full block pointer form-sm"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="py-3">
                  <label
                    htmlFor="phone"
                    className="text-slate-300 font-medium font-exo1 mt-4"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-4">
                      <BsTelephoneInbound color="#ffb400" />
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control p-3 px-14 outline-none text-white mt-3 bg-[#0f172a] transition-border-shadow duration-150 ease-in-out border border-gray-300 shadow-md hover:border-blue-500 hover:shadow-lg font-light text-sm w-full block pointer form-sm"
                      placeholder="+915********"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="py-3">
                  <label
                    htmlFor="password"
                    className="text-slate-300 font-medium font-exo1 mt-4"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-4">
                      <MdOutlinePassword size={20} color="#ffb400" />
                    </span>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control p-3 px-14 outline-none text-white mt-3 bg-[#0f172a] transition-border-shadow duration-150 ease-in-out border border-gray-300 shadow-md hover:border-blue-500 hover:shadow-lg font-light text-sm w-full block pointer form-sm"
                      placeholder="****************"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    className="bg-[#1C5FCC] text-white p-2 rounded-md w-full"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#1C5FCC] text-white p-2 rounded-md w-full"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default Settings;
