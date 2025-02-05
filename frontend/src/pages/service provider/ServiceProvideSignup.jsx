import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import useSignup from "../../hooks/useSignup";

const ServiceProviderSignup = () => {
  const navigate = useNavigate();
  const { signup } = useSignup();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await signup(inputs);
    if (success) navigate("/admin-dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-8 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Service Provider Sign Up
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              placeholder="Business Name"
              className="p-3 pl-10 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              placeholder="Email"
              className="p-3 pl-10 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              placeholder="Password"
              className="p-3 pl-10 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

\          <button
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-500 font-semibold cursor-pointer"
            onClick={() => navigate("/service-provider-login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ServiceProviderSignup;
