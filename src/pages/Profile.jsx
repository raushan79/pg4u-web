import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {/* Profile Details */}
      <div className="mb-6">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
        <p><strong>Mobile:</strong> 9876543210</p>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
