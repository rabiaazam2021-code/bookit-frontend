import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import Footer from "../../components/Footer";

export default function BusinessDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get("/appointments/business-bookings");
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/appointments/${id}/status`, { status });
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status } : a))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const total = appointments.length;
  const pending = appointments.filter((a) => a.status === "Pending").length;
  const confirmed = appointments.filter((a) => a.status === "Confirmed").length;
  const completed = appointments.filter((a) => a.status === "Completed").length;

  const statusStyle = {
    Pending: "bg-amber-50 text-amber-700",
    Confirmed: "bg-green-50 text-green-700",
    Completed: "bg-gray-100 text-gray-600",
    Cancelled: "bg-red-50 text-red-700",
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Welcome back, {user?.name}</p>
          </div>
          <Link
            to="/business/services"
            className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800"
          >
            Manage services
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Total bookings</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{total}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-semibold text-amber-600 mt-1">{pending}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Confirmed</p>
            <p className="text-2xl font-semibold text-green-600 mt-1">{confirmed}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{completed}</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            All Appointments
          </h3>
          {loading ? (
            <p className="text-gray-500 text-sm text-center py-8">Loading...</p>
          ) : appointments.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">
              No appointments yet. Share your profile to get bookings!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-gray-500">
                    <th className="pb-3 font-normal">Customer</th>
                    <th className="pb-3 font-normal">Service</th>
                    <th className="pb-3 font-normal">Date & Time</th>
                    <th className="pb-3 font-normal">Status</th>
                    <th className="pb-3 font-normal">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((a) => (
                    <tr key={a._id} className="border-b border-gray-100 last:border-0">
                      <td className="py-3 text-gray-900 font-medium">
                        {a.customer?.name}
                      </td>
                      <td className="py-3 text-gray-500">{a.service?.name}</td>
                      <td className="py-3 text-gray-500">
                        {a.date} — {a.time}
                      </td>
                      <td className="py-3">
                        <span className={`text-xs px-3 py-1 rounded-full ${statusStyle[a.status]}`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="py-3">
                        {a.status === "Pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleStatusUpdate(a._id, "Confirmed")}
                              className="text-xs text-green-600 hover:underline"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(a._id, "Cancelled")}
                              className="text-xs text-red-500 hover:underline"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                        {a.status === "Confirmed" && (
                          <button
                            onClick={() => handleStatusUpdate(a._id, "Completed")}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Mark Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}