import React, { useState } from "react";
import Select from "react-select";
import DefaultLayout from "../../adminlayout/DefaultLayout";

const getToken = () => localStorage.getItem("adminToken");

const AddCarRent = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [people, setPeople] = useState("");
  const [driveType, setDriveType] = useState({
    value: "Self Drive",
    label: "Self Drive",
  });
  const [imgSrc, setImgSrc] = useState("");
  const [message, setMessage] = useState("");

  const driveOptions = [
    { value: "Driver", label: "Driver" },
    { value: "Self Drive", label: "Self Drive" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#0f172a",
      color: "white",
      border: "1px solid #302f2f",
      borderRadius: "4px",
      padding: "0.5rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#0f172a",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#1C5FCC" : "#0f172a",
      color: "white",
    }),
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgSrc(reader.result.split(",")[1]);
      };
    }
  };

  const handleAddCarRent = async (e) => {
    e.preventDefault();
    const token = getToken();
    try {
      const response = await fetch(
        "https://kachabackend.onrender.com/api/rentals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({
            name,
            price,
            people,
            driveType: driveType.value,
            imgSrc,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Car for rent added successfully!");
        setName("");
        setPrice("");
        setPeople("");
        setDriveType({ value: "Self Drive", label: "Self Drive" });
        setImgSrc("");
      } else {
        setMessage(data.msg || "Error adding car for rent");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full font-roboto bg-black h-screen">
      <DefaultLayout>
        <div className="grid grid-cols-12 gap-4 shadow-md px-10 py-10 mt-10 rounded-md bg-black">
          <div className="col-span-12 xl:col-span-4">
            <h1 className="text-[#1C5FCC] text-xl font-bold">
              Add Car for Rent
            </h1>
            <p className="text-white text-sm">
              Provide rental car details below
            </p>
          </div>
          <div className="xl:col-span-8 border px-10 rounded-md border-[#101c47] col-span-12">
            <form onSubmit={handleAddCarRent} className="py-10">
              <label className="text-slate-300 font-medium">Car Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control p-3 mt-3 bg-[#0f172a] text-white w-full border border-gray-300 rounded"
                placeholder="Car Name"
                required
              />

              <label className="text-slate-300 font-medium">
                {" "}
                Number of People
              </label>
              <input
                type="number"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className="form-control p-3 mt-3 bg-[#0f172a] text-white w-full border border-gray-300 rounded"
                placeholder="Enter number of people"
                required
              />

              <label className="text-slate-300 font-medium mt-4">
                Price Per 12 Hours
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control p-3 mt-3 bg-[#0f172a] text-white w-full border border-gray-300 rounded"
                placeholder="Enter price"
                required
              />

              <label className="text-slate-300 font-medium mt-4">Status</label>
              <Select
                options={driveOptions}
                value={driveType}
                onChange={(selectedOption) => setDriveType(selectedOption)}
                styles={customStyles}
                placeholder="Select drive type"
                required
                className="mt-3"
              />

              <label className="text-slate-300 font-medium mt-4">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control p-3 mt-3 bg-[#0f172a] text-white w-full border border-gray-300 rounded"
                required
              />

              {imgSrc && (
                <img
                  src={`data:image/png;base64,${imgSrc}`}
                  alt="Car Preview"
                  className="mt-4"
                  width="100"
                />
              )}

              <button
                type="submit"
                className="bg-[#1C5FCC] text-white font-bold py-2 px-4 rounded-lg w-full mt-6"
              >
                Add Car for Rent
              </button>
            </form>
            {message && <p className="text-green-500 mt-4">{message}</p>}
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default AddCarRent;
