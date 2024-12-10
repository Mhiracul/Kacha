import React, { useState, useEffect } from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { BsTelephoneInbound } from "react-icons/bs";
import DefaultLayout from "../../adminlayout/DefaultLayout";

const getToken = () => localStorage.getItem("adminToken");

const AddCars = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("Available");
  const [imgSrc, setImgSrc] = useState(""); // Base64 image data
  const [message, setMessage] = useState("");
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await fetch(
        "https://kachabackend.onrender.com/api/cars"
      );
      const data = await response.json();
      setCars(data);
    };

    fetchCars();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgSrc(reader.result.split(",")[1]); // Base64 data (without the prefix)
      };
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();

    const token = getToken();
    const response = await fetch("https://kachabackend.onrender.com/api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ name, type, price, details, status, imgSrc }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Car added successfully!");
      setCars((prevCars) => [...prevCars, data]);
    } else {
      setMessage(data.msg || "Something went wrong");
    }
  };

  return (
    <div className="w-full font-roboto bg-black h-screen">
      <DefaultLayout>
        <div className="grid grid-cols-12 gap-4 shadow-md shadow-[#272f4f] px-10 py-10 mt-10 rounded-md bg-black md:mt-6 md:gap-6 2xl:mt-[1.875rem] 2xl:gap-[1.875rem]">
          <div className="col-span-12 xl:col-span-4">
            <h1 className="text-[#1C5FCC] text-xl font-bold font-exo1">
              Add New Car
            </h1>
            <h1 className="text-white text-sm outline-none font-normal font-exo1">
              Add the car details below
            </h1>
          </div>

          <div className="xl:col-span-8 border px-10 rounded-md border-[#101c47] col-span-12">
            <h1 className="font-semibold text-xl font-exo1 mt-4 text-slate-300">
              Car Details
            </h1>
            <hr className="border-t-1 border-[#302f2f]" />
            <div className="py-10">
              <form onSubmit={handleAddCar}>
                <label
                  htmlFor="name"
                  className="text-slate-300 font-medium font-exo1"
                >
                  Car Name
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
                    id="name"
                    name="name"
                    className="form-control p-3 pl-14 outline-none text-white mt-3 bg-[#0f172a] transition-border-shadow duration-150 ease-in-out border border-gray-300 shadow-md hover:border-blue-500 hover:shadow-lg font-light text-sm w-full block pointer form-sm"
                    placeholder="Car Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <label
                  htmlFor="type"
                  className="text-slate-300 font-medium font-exo1 mt-4"
                >
                  Car Type
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="type"
                    name="type"
                    className="form-control p-3 pl-14 outline-none text-white mt-3 bg-[#0f172a] transition-border-shadow duration-150 ease-in-out border border-gray-300 shadow-md hover:border-blue-500 hover:shadow-lg font-light text-sm w-full block pointer form-sm"
                    placeholder="Car Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  />
                </div>

                <label
                  htmlFor="price"
                  className="text-slate-300 font-medium font-exo1 mt-4"
                >
                  Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="form-control p-3 pl-14 outline-none text-white mt-3 bg-[#0f172a] transition-border-shadow duration-150 ease-in-out border border-gray-300 shadow-md hover:border-blue-500 hover:shadow-lg font-light text-sm w-full block pointer form-sm"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <label
                  htmlFor="details"
                  className="text-slate-300 font-medium font-exo1 mt-4"
                >
                  Car Details
                </label>
                <div className="relative">
                  <textarea
                    id="details"
                    name="details"
                    className="form-control p-3 pl-14 outline-none text-white mt-3 bg-[#0f172a] transition-border-shadow duration-150 ease-in-out border border-gray-300 shadow-md hover:border-blue-500 hover:shadow-lg font-light text-sm w-full block pointer form-sm"
                    placeholder="Car Details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                  />
                </div>

                <label
                  htmlFor="status"
                  className="text-slate-300 font-medium font-exo1 mt-4"
                >
                  Status
                </label>
                <div className="relative">
                  <select
                    id="status"
                    name="status"
                    className="form-control p-3 pl-14 outline-none text-white mt-3 bg-[#0f172a] transition-border-shadow duration-150 ease-in-out border border-gray-300 shadow-md hover:border-blue-500 hover:shadow-lg font-light text-sm w-full block pointer form-sm"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Available">Available</option>
                    <option value="Sold Out">Sold Out</option>
                  </select>
                </div>

                <label
                  htmlFor="imgSrc"
                  className="text-slate-300 font-medium font-exo1 mt-4"
                >
                  Car Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="imgSrc"
                    name="imgSrc"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="form-control p-3 pl-14 outline-none text-white mt-3 bg-[#0f172a] transition-border-shadow duration-150 ease-in-out border border-gray-300 shadow-md hover:border-blue-500 hover:shadow-lg font-light text-sm w-full block pointer form-sm"
                    required
                  />
                </div>

                {imgSrc && (
                  <img
                    src={`data:image/png;base64,${imgSrc}`}
                    alt="Preview"
                    className="mt-4"
                    width="100"
                  />
                )}

                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-[#1C5FCC] text-white font-bold py-2 px-4 rounded-lg w-full"
                  >
                    Add Car
                  </button>
                </div>
              </form>
              {message && <p className="text-green-500 mt-4">{message}</p>}
            </div>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default AddCars;
