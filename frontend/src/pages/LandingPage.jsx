import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center items-center w-1/2 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-10">
        <h1 className="text-5xl font-bold tracking-wide shadow-md drop-shadow-lg">
          explore<span className="text-yellow-300">Nepal</span>
        </h1>
        <p className="mt-4 text-lg font-light opacity-90 text-center">
          Discover the breathtaking landscapes, rich culture, and hidden gems of Nepal. Whether you're looking for adventure, relaxation, or cultural immersion, ExploreNepal helps you plan the perfect trip with ease.
        </p>
      </div>

      <div className="flex flex-col justify-center items-center w-1/2 bg-white shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Continue as:
        </h2>
        <div className="flex flex-col gap-4">
          <button
            className="p-3 w-60 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition font-semibold"
            onClick={() => navigate("/user-login")}
          >
            Traveler
          </button>
          <button
            className="p-3 w-60 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
            onClick={() => navigate("/service-provider-login")}
          >
            Service Provider
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
