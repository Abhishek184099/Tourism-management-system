import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCog } from "react-icons/fa"; 
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuthContext();
  const [showMenu, setShowMenu] = useState(false);
  
  useEffect(() => {
    console.log("Auth User:", authUser);
  }, [authUser]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });

      // ✅ Clear storage and reset context
      localStorage.clear();
      sessionStorage.clear();
      setAuthUser(null);

      toast.success("Logged Out Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-teal-600 text-white shadow-lg">
      <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        exploreNepal
      </div>

      <nav className="hidden md:flex space-x-6">
        <button onClick={() => navigate("/")} className="hover:text-gray-300">Home</button>
        <button onClick={() => navigate("/my-bookings")} className="hover:text-gray-300">My Bookings</button>
        <button onClick={() => navigate("/packages")} className="hover:text-gray-300">Packages</button>
      </nav>

      <div className="flex items-center space-x-6">
        {authUser ? (
          <div className="relative">
            <FaUserCog
              className="text-2xl cursor-pointer hover:text-gray-300"
              onClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-4 z-50">
                <button
                  className="block w-full text-left p-2 hover:bg-gray-200 rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                {authUser?.role === "admin" && (
                  <button
                    className="block w-full text-left p-2 bg-red-500 text-white hover:bg-red-600 rounded-md mt-2"
                    onClick={() => navigate("/admin-dashboard")}
                  >
                    Admin Panel
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/mode")}
            className="px-4 py-2 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
