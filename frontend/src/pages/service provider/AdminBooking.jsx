import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminHeader from "../../components/Admin/Header";
import Sidebar from "../../components/Admin/Sidebar";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 4; 

  useEffect(() => {
    fetchBookings();
    fetchNotifications();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings/admin", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setBookings(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/bookings/admin/notifications", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setNotifications(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleConfirmBooking = async (bookingId) => {
    try {
      const res = await fetch(`/api/bookings/confirm/${bookingId}`, {
        method: "PUT",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to confirm booking");

      toast.success("Booking confirmed successfully!");
      fetchBookings();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Sort bookings by latest first
  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // ✅ Pagination Logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = sortedBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Manage Bookings</h2>

          {notifications.length > 0 && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800">New Notifications</h3>
              {notifications.map((notification) => (
                <p key={notification._id} className="text-gray-700">
                  <strong>{notification.user.name}</strong> has booked <strong>{notification.package.packageName}</strong>
                </p>
              ))}
            </div>
          )}

          {currentBookings.length === 0 ? (
            <p className="text-gray-600 text-center">No bookings found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentBookings.map((booking) => (
                <div key={booking._id} className="bg-white p-5 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">{booking.package.packageName}</h3>
                  <p className="text-gray-600">Booked by: {booking.user.name}</p>
                  <p className="text-gray-600">Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                  <p className="text-gray-600">People: {booking.numberOfPeople}</p>
                  <p className="text-gray-600">Total Price: ${booking.amountPaid}</p>

                  <p className={`mt-2 font-semibold ${booking.status === "confirmed" ? "text-green-600" : "text-orange-600"}`}>
                    Booking Status: {booking.status}
                  </p>
                  <p className={`mt-1 font-semibold ${booking.paymentStatus === "paid" ? "text-green-600" : "text-red-600"}`}>
                    Payment Status: {booking.paymentStatus}
                  </p>

                  {booking.status === "pending" && (
                    <button
                      onClick={() => handleConfirmBooking(booking._id)}
                      className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                    >
                      Confirm Booking
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {bookings.length > bookingsPerPage && (
            <div className="mt-6 flex justify-center space-x-4">
              <button
                className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-700"}`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-lg font-semibold text-gray-700">
                Page {currentPage} of {Math.ceil(bookings.length / bookingsPerPage)}
              </span>
              <button
                className={`px-4 py-2 rounded-lg ${indexOfLastBooking >= bookings.length ? "bg-gray-300 cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-700"}`}
                onClick={() => setCurrentPage((prev) => (indexOfLastBooking < bookings.length ? prev + 1 : prev))}
                disabled={indexOfLastBooking >= bookings.length}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminBookings;
