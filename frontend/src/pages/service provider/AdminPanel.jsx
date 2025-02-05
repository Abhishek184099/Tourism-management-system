import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/Admin/Header";
import Sidebar from "../../components/Admin/Sidebar";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const [stats, setStats] = useState({
    totalNumberOfPeople: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    if (!authUser || authUser.role !== "admin") {
      navigate("/", { replace: true }); 
    }
  }, [authUser, navigate]);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await fetch("/api/admin/dashboard", { credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setStats(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchDashboardStats();
  }, []);

  const dashboardStats = useMemo(
    () => [
      { title: "People Who Booked a Package", value: stats.totalNumberOfPeople, color: "text-teal-600" },
      { title: "Total Packages Booked", value: stats.totalBookings, color: "text-blue-600" },
      { title: "Total Revenue", value: `$${stats.totalRevenue}`, color: "text-green-600" },
    ],
    [stats]
  );

  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar /> 
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <h1 className="text-3xl font-semibold text-gray-700 mb-6">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dashboardStats.map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105"
              >
                <h2 className="text-lg font-semibold text-gray-600">{stat.title}</h2>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
