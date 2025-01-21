import React, { useState, useEffect } from "react";
import Select from "react-select";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import Swal from "sweetalert2";
import DefaultLayout from "../../adminlayout/DefaultLayout";

const getToken = () => localStorage.getItem("adminToken");

const AddCars = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [seats, setSeats] = useState("");
  const [bags, setBags] = useState("");
  const [additionalImages, setAdditionalImages] = useState([]);
  const [status, setStatus] = useState({
    value: "Available",
    label: "Available",
  });
  const [imgSrc, setImgSrc] = useState("");
  const [cars, setCars] = useState([]);

  const carTypes = [
    { value: "benz", label: "Benz" },
    { value: "lexus", label: "Lexus" },
    { value: "honda", label: "Honda" },
    { value: "toyota", label: "Toyota" },
    { value: "audi", label: "Audi" },
    { value: "bmw", label: "BMW" },
    { value: "ford", label: "Ford" },
    { value: "chevrolet", label: "Chevrolet" },
    { value: "nissan", label: "Nissan" },
  ];

  const statusOptions = [
    { value: "Available", label: "Available" },
    { value: "Sold Out", label: "Sold Out" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#0f172a",
      color: "white",
      border: "1px solid #302f2f",
      borderRadius: "4px",
      boxShadow: "none",
      padding: "0.5rem",
      ":hover": {
        borderColor: "#1C5FCC",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#0f172a",
      borderRadius: "4px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#1C5FCC" : "#0f172a",
      color: "white",
      ":hover": {
        backgroundColor: "#1C5FCC",
        color: "white",
      },
    }),
  };

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
        setImgSrc(reader.result.split(",")[1]);
      };
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
      });
    });

    Promise.all(readers).then((images) => {
      setAdditionalImages((prev) => [...prev, ...images]);
    });
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
      body: JSON.stringify({
        name,
        type: type.value,
        price,
        details,
        seat: seats,
        Bags: bags,
        status: status.value,
        imgSrc,
        additionalImages,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Car added successfully!",
        text: `The car "${name}" has been added to the inventory.`,
        timer: 3000,
        showConfirmButton: false,
      });

      setCars((prevCars) => [...prevCars, data]);
      // Reset form fields
      setName("");
      setType("");
      setPrice("");
      setDetails("");
      setSeats("");
      setBags("");
      setAdditionalImages([]);
      setImgSrc("");
      setStatus({ value: "Available", label: "Available" });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.msg || "Something went wrong",
      });
    }
  };

  return (
    <div className="w-full font-roboto bg-black h-screen">
      <DefaultLayout>
        <div className="grid grid-cols-12 gap-4 shadow-md shadow-[#272f4f] px-10 py-10 mt-10 rounded-md bg-black md:mt-6 md:gap-6">
          <div className="col-span-12 xl:col-span-4">
            <h1 className="text-[#1C5FCC] text-xl font-bold">Add New Car</h1>
            <p className="text-white text-sm">Add the car details below</p>
          </div>

          <div className="xl:col-span-8 border px-10 rounded-md border-[#101c47] col-span-12">
            <h1 className="font-semibold text-xl text-slate-300 mt-4">
              Car Details
            </h1>
            <hr className="border-t-1 border-[#302f2f]" />
            <form onSubmit={handleAddCar} className="py-10 text-xs">
              <label className="text-slate-300 font-medium">Car Name</label>
              <div className="relative">
                <span className="absolute left-4 top-4">
                  <MdOutlineDriveFileRenameOutline size={20} color="#ffb400" />
                </span>
                <input
                  type="text"
                  placeholder="Car Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control p-3 pl-14 outline-none text-white mt-3 bg-[#0f172a] border border-gray-300 shadow-md w-full"
                  required
                />
              </div>

              <label className="text-slate-300 font-medium mt-4">
                Car Type
              </label>
              <Select
                options={carTypes}
                value={type}
                styles={customStyles}
                onChange={(selectedOption) => setType(selectedOption)}
                className="mt-3"
                placeholder="Select Car Type"
                required
              />

              <label className="text-slate-300 font-medium mt-4">Price</label>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control p-3 pl-14 outline-none text-white mt-3 bg-[#0f172a] border border-gray-300 shadow-md w-full"
                required
              />

              <label className="text-slate-300 font-medium mt-4">
                Car Details
              </label>
              <textarea
                placeholder="Car Details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="form-control p-3 outline-none text-white mt-3 bg-[#0f172a] border border-gray-300 shadow-md w-full"
                required
              />

              <label className="text-slate-300 font-medium mt-4">Seats</label>
              <input
                type="number"
                placeholder="Number of Seats"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="form-control p-3 pl-14 outline-none text-white mt-3 bg-[#0f172a] border border-gray-300 shadow-md w-full"
                required
              />

              <label className="text-slate-300 font-medium mt-4">Bags</label>
              <input
                type="number"
                placeholder="Number of Bags"
                value={bags}
                onChange={(e) => setBags(e.target.value)}
                className="form-control p-3 pl-14 outline-none text-white mt-3 bg-[#0f172a] border border-gray-300 shadow-md w-full"
                required
              />

              <label className="text-slate-300 font-medium mt-4">Status</label>
              <Select
                options={statusOptions}
                value={status}
                styles={customStyles}
                onChange={(selectedOption) => setStatus(selectedOption)}
                className="mt-3"
              />

              <label className="text-slate-300 font-medium mt-4">
                Car Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control p-3 outline-none text-white mt-3 bg-[#0f172a] border border-gray-300 text-xs shadow-md w-full"
                required
              />

              {imgSrc && (
                <img
                  src={`data:image/png;base64,${imgSrc}`}
                  alt="Preview"
                  className="mt-4"
                  width="100"
                />
              )}

              <label className="text-slate-300 font-medium mt-4">
                Additional Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesChange}
                className="form-control p-3 outline-none text-white mt-3 bg-[#0f172a] border border-gray-300 text-xs shadow-md w-full"
              />
              <div className="flex gap-4 mt-4">
                {additionalImages.map((img, index) => (
                  <img
                    key={index}
                    src={`data:image/png;base64,${img}`}
                    alt={`Additional Preview ${index + 1}`}
                    className="w-24 h-24"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="bg-[#1C5FCC] text-white font-bold py-2 px-4 rounded-lg w-full mt-6"
              >
                Add Car
              </button>
            </form>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default AddCars;
