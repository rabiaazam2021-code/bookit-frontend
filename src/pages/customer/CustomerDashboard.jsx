import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import Footer from "../../components/Footer";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get("/appointments/my-bookings");
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const total = appointments.length;
  const upcoming = appointments.filter((a) => a.status === "Pending" || a.status === "Confirmed").length;
  const completed = appointments.filter((a) => a.status === "Completed").length;

  const statusStyle = {
    Pending: "bg-amber-50 text-amber-700",
    Confirmed: "bg-green-50 text-green-700",
    Completed: "bg-gray-100 text-gray-600",
    Cancelled: "bg-red-50 text-red-700",
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome, {user?.name}
          </h1>
          <Link
            to="/customer/book"
            className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800"
          >
            New booking
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Total bookings</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{total}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Upcoming</p>
            <p className="text-2xl font-semibold text-blue-600 mt-1">{upcoming}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-semibold text-green-600 mt-1">{completed}</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Your appointments
          </h3>
          {loading ? (
            <p className="text-gray-500 text-sm text-center py-8">Loading...</p>
          ) : appointments.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">
              No bookings yet.{" "}
              <Link to="/customer/book" className="text-blue-600 hover:underline">
                Book your first appointment!
              </Link>
            </p>
          ) : (
            <div className="space-y-3">
              {appointments.map((a) => (
                <div
                  key={a._id}
                  className="flex justify-between items-center border border-gray-100 rounded-lg p-4"
                >
                  <div>
                    <p className="font-medium text-gray-900">{a.business?.name}</p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {a.service?.name} — {a.date} at {a.time}
                    </p>
                    <p className="text-sm text-gray-400 mt-0.5">
                      Rs. {a.service?.price}
                    </p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${statusStyle[a.status]}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}