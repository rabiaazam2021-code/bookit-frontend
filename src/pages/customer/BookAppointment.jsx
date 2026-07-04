import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Footer from "../../components/Footer";

export default function BookAppointment() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ service: "", date: "", time: "" });
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const times = [
    "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services/all");
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, []);

  const selectedService = services.find((s) => s._id === form.service);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/appointments", {
        business: selectedService?.business._id,
        service: form.service,
        date: form.date,
        time: form.time,
      });
      setBooked(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (booked) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-10">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-6">
            {selectedService?.name} — {form.date} at {form.time}
          </p>
          <button
            onClick={() => navigate("/customer/dashboard")}
            className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Book an Appointment</h1>
        <div className="border border-gray-200 rounded-xl p-8">
          {error && (
            <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select a service
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                required
              >
                <option value="">-- Choose a service --</option>
                {services.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.business?.name} — {s.name} (Rs. {s.price})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select a date
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select a time
              </label>
              <div className="grid grid-cols-4 gap-2">
                {times.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm({ ...form, time: t })}
                    className={`py-2 rounded-lg text-sm border transition ${
                      form.time === t
                        ? "bg-gray-900 text-white border-gray-900"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !form.time}
              className="w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}