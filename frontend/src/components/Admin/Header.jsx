import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {

    fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      localStorage.clear();
      navigate("/");
    });
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white shadow-lg">
      <button
        onClick={() => navigate("/")}
        className="text-2xl font-bold hover:text-gray-300"
      >
        ExploreNepal
      </button>



      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;
