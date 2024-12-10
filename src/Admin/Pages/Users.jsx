import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import DefaultLayout from "../../adminlayout/DefaultLayout";
import { apiBaseUrl } from "../../config";
import ClipLoader from "react-spinners/ClipLoader"; // Import the ClipLoader component

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  // Handle showing and hiding of success and error messages
  useEffect(() => {
    let timer;
    if (success || error) {
      timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000); // 5 seconds timeout for auto-closing
    }
    return () => clearTimeout(timer);
  }, [success, error]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    const formElements = event.target.elements;

    if (!formElements) {
      setError("Form elements not found.");
      setLoading(false); // Stop loading
      return;
    }

    const fullName = formElements.fullName?.value;
    const email = formElements.email?.value;
    const phone = formElements.phone?.value;
    const password = formElements.password?.value;
    const accountBalance = formElements.accountBalance?.value;
    const kycApproved = formElements.kycApproved?.value === "true";
    const govtId = formElements.govtId?.value;
    const passport = formElements.passport?.value;

    if (!fullName || !email || !accountBalance || kycApproved === undefined) {
      setError("Please fill out all required fields.");
      setLoading(false); // Stop loading
      return;
    }

    const updatedUser = {
      fullName,
      email,
      phone: phone || "",
      password: password || "",
      accountBalance,
      kycApproved,
      kycDocuments: {
        govtId: govtId || "",
        passport: passport || "",
      },
    };

    try {
      await axios.put(`${apiBaseUrl}/users/${selectedUser._id}`, updatedUser, {
        headers: { "auth-token": localStorage.getItem("token") },
      });

      setUsers(
        users.map((user) =>
          user._id === selectedUser._id ? { ...user, ...updatedUser } : user
        )
      );
      setSuccess("User updated successfully!");
      setShowEditModal(false);
    } catch (error) {
      setError("Error updating user.");
      console.error("Error updating user:", error);
    } finally {
      setLoading(false); // Stop loading in both success and error cases
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/users`, {
          headers: { "auth-token": localStorage.getItem("token") },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users.");
      }
    };

    fetchUsers();
  }, []);

  const renderImage = (base64String, altText) => {
    return (
      <img
        src={base64String}
        alt={altText}
        className="w-24 h-24 object-cover"
      />
    );
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${apiBaseUrl}/users/${userToDelete._id}`, {
        headers: { "auth-token": localStorage.getItem("token") },
      });

      setUsers(users.filter((user) => user._id !== userToDelete._id));
      setSuccess("User deleted successfully!");
      setShowDeleteModal(false);
    } catch (error) {
      setError("Error deleting user.");
      console.error("Error deleting user:", error);
    }
  };

  return (
    <DefaultLayout>
      <div className="w-full font-roboto bg-[#05070D] h-screen">
        <div className="container mx-auto mt-6 px-4 py-6 shadow-md shadow-[#272f4f] text-slate-300 rounded-md">
          <div className="grid gap-6">
            {users.length === 0 ? (
              <div className="text-center text-gray-500">
                No users available
              </div>
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  className="bg-[#05070D] rounded-md shadow-md shadow-[#272f4f] p-5 flex justify-between items-center"
                >
                  <div className="text-slate-300">{user.fullName}</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-[#1C5FCC] hover:text-[#f8f8f8]"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      className="text-red-600 hover:text-red-400"
                    >
                      <MdOutlineDelete />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="relative bg-green-100 text-green-800 p-4 rounded-md mt-4">
              <button
                onClick={() => setSuccess(null)}
                className="absolute top-2 right-2 text-green-800 hover:text-green-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
              {success}
            </div>
          )}
          {error && (
            <div className="relative bg-red-100 text-red-800 p-4 rounded-md mt-4">
              <button
                onClick={() => setError(null)}
                className="absolute top-2 right-2 text-red-800 hover:text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
              {error}
            </div>
          )}

          {/* Edit Modal */}
          {showEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999]">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl text-slate-700 font-semibold">
                    Edit User
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
                {selectedUser && (
                  <form onSubmit={handleSaveChanges}>
                    <div className="mb-4">
                      <label
                        htmlFor="fullName"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        defaultValue={selectedUser.fullName}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={selectedUser.email}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        defaultValue={selectedUser.phone || ""}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedUser.password}
                        name="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="accountBalance"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Account Balance
                      </label>
                      <input
                        type="number"
                        id="accountBalance"
                        name="accountBalance"
                        defaultValue={selectedUser.accountBalance}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="kycApproved"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        KYC Approved
                      </label>
                      <select
                        id="kycApproved"
                        name="kycApproved"
                        defaultValue={
                          selectedUser.kycApproved ? "true" : "false"
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="true">Approved</option>
                        <option value="false">Not Approved</option>
                      </select>
                    </div>
                    <div className="mb-4 flex gap-4">
                      {selectedUser.kycDocuments.govtId && (
                        <div className="flex flex-col items-center">
                          <label className="block text-gray-700 font-bold mb-2">
                            Government ID
                          </label>
                          {renderImage(
                            selectedUser.kycDocuments.govtId,
                            "Government ID"
                          )}
                        </div>
                      )}
                      {selectedUser.kycDocuments.passport && (
                        <div className="flex flex-col items-center">
                          <label className="block text-gray-700 font-bold mb-2">
                            Passport
                          </label>
                          {renderImage(
                            selectedUser.kycDocuments.passport,
                            "Passport"
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={() => setShowEditModal(false)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#1C5FCC] text-white px-4 py-2 rounded-md hover:bg-[#ca9b2e] flex items-center justify-center"
                        disabled={loading} // Disable button while loading
                      >
                        {loading ? (
                          <ClipLoader color="#000" size={20} />
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Delete Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999]">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl text-gray-700 font-semibold mb-4">
                  Confirm Deletion
                </h2>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete {userToDelete?.fullName}?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Users;
