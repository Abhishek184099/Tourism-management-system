import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AllDestinations = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("/api/destinations");
        if (!res.ok) throw new Error("Failed to fetch destinations");

        const data = await res.json();
        setDestinations(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter((destination) =>
    destination.placeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    destination.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Explore All Destinations
        </h2>

        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search destinations..."
            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredDestinations.length === 0 ? (
          <p className="text-gray-600 text-center">No destinations found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) => (
              <div
                key={destination._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => navigate(`/destination/${destination._id}`)}
              >
                <img
                  src={destination.photos?.[0] || "/default-placeholder.jpg"}
                  alt={destination.placeName}
                  className="w-full h-56 object-cover rounded-t-lg"
                />

                <div className="p-5 text-center">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {destination.placeName}
                  </h3>
                  <p className="text-gray-600 mt-1">{destination.location}</p>

                  <button
                    className="mt-4 px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all shadow-md hover:shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/destination/${destination._id}`);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AllDestinations;
