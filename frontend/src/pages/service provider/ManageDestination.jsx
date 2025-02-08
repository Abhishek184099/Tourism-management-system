import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";
import AdminHeader from "../../components/Admin/Header";
import toast from "react-hot-toast";

const ManageDestinations = () => {
    const navigate = useNavigate();
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const res = await fetch("/api/destinations/admin", { credentials: "include" });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error);
                setDestinations(data);
            } catch (error) {
                toast.error(error.message);
            }
        };
        fetchDestinations();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this destination?")) return;

        try {
            const res = await fetch(`/api/destinations/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!res.ok) throw new Error("Failed to delete destination");

            setDestinations(destinations.filter((destination) => destination._id !== id));
            toast.success("Destination deleted successfully!");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <AdminHeader />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-700">Manage Destinations</h1>
                        <button
                            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all"
                            onClick={() => navigate("/admin/add-destination")}
                        >
                            + Add Destination
                        </button>
                    </div>

                    <div className="bg-white p-4 shadow-lg rounded-lg overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-3 text-left">Place Name</th>
                                    <th className="p-3 text-left">Location</th>
                                    <th className="p-3 text-left">Category</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {destinations.length > 0 ? (
                                    destinations.map((destination) => (
                                        <tr key={destination._id} className="border-b hover:bg-gray-100">
                                            <td className="p-3">{destination.placeName}</td>
                                            <td className="p-3">{destination.location}</td>
                                            <td className="p-3 capitalize">{destination.category}</td>
                                            <td className="p-3 flex gap-4">
                                                <button
                                                    onClick={() => navigate(`/admin/edit-destination/${destination._id}`)}
                                                    className="px-3 py-1 text-blue-600 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(destination._id)}
                                                    className="px-3 py-1 text-red-600 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center p-3 text-gray-500">
                                            No destinations added yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ManageDestinations;
