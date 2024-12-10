import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { toast } from "react-hot-toast"; // Import react-hot-toast

// Helper function to manage JWT token
const getToken = () => localStorage.getItem("adminToken");

const AdminLogin = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Use the useNavigate hook for redirection
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://kachabackend.onrender.com/api/admin/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("adminToken", data.token);
      setToken(data.token); // Set token in App state
      toast.success("Logged in successfully!"); // Show success toast
      navigate("/admin"); // Use useNavigate to redirect to /admin without refreshing the page
    } else {
      setError(data.msg); // Set error if login fails
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-[#1f2937] p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-white text-2xl font-exo1 font-bold mb-6 text-center">
          Admin Login
        </h1>
        <form onSubmit={handleLogin}>
          <label
            htmlFor="username"
            className="text-slate-300 font-medium font-exo1"
          >
            Username
          </label>
          <div className="relative">
            <span className="absolute left-4 top-4 text-slate-400">
              <MdOutlineDriveFileRenameOutline size={20} />
            </span>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control p-3 pl-14 outline-none text-white mt-3 bg-[#0f172a] transition-border-shadow duration-150 ease-in-out border border-gray-300 shadow-md hover:border-blue-500 hover:shadow-lg font-light text-sm w-full block pointer form-sm"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>

          <label
            htmlFor="password"
            className="text-slate-300 font-medium font-exo1 mt-4"
          >
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              className="form-control p-3 pl-14 outline-none text-white mt-3 bg-[#0f172a] transition-border-shadow duration-150 ease-in-out border border-gray-300 shadow-md hover:border-blue-500 hover:shadow-lg font-light text-sm w-full block pointer form-sm"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-[#1C5FCC] text-white font-bold py-2 px-4 rounded-lg w-full"
            >
              Login
            </button>
          </div>
        </form>
        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      </div>
    </div>
  );
};

export default AdminLogin;
