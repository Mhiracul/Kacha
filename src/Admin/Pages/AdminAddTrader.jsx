import React, { useState } from "react";
import axios from "axios";

const AddCars = () => {
  const [carData, setCarData] = useState({
    name: "",
    type: "",
    price: "",
    details: "",
    status: "Available",
    imgSrc: "", // base64 string
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Convert the file to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setCarData({
        ...carData,
        imgSrc: reader.result.split(",")[1], // Extract the base64 string part
      });
    };
    if (file) {
      reader.readAsDataURL(file); // Converts the image to base64
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/cars", carData)
      .then((response) => {
        console.log("Car added:", response.data);
        alert("Car added successfully!");
      })
      .catch((error) => {
        console.error("Error adding car:", error);
        alert("Error adding car.");
      });
  };

  return (
    <div className="admin-form">
      <h1>Add New Car</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={carData.name}
          onChange={handleChange}
        />

        <label>Type</label>
        <select name="type" value={carData.type} onChange={handleChange}>
          <option value="Benz">Benz</option>
          <option value="Lexus">Lexus</option>
          <option value="Honda">Honda</option>
        </select>

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={carData.price}
          onChange={handleChange}
        />

        <label>Details</label>
        <textarea
          name="details"
          value={carData.details}
          onChange={handleChange}
        />

        <label>Status</label>
        <select name="status" value={carData.status} onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="Sold Out">Sold Out</option>
        </select>

        <label>Image</label>
        <input type="file" onChange={handleFileChange} />

        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCars;
