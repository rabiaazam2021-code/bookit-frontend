import { useState, useEffect } from "react";
import api from "../../utils/api";
import Footer from "../../components/Footer";

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: "", duration: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    try {
      const res = await api.get("/services/my-services");
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/services", {
        name: form.name,
        duration: form.duration,
        price: Number(form.price),
      });
      setForm({ name: "", duration: "", price: "" });
      fetchServices();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Manage Services</h1>

        <div className="border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Add New Service</h2>
          {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Service name"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Duration (e.g. 30 min)"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Price (Rs.)"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="md:col-span-3 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Adding..." : "+ Add Service"}
            </button>
          </form>
        </div>

        <div className="border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Your Services</h2>
          {services.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">
              No services added yet. Add your first service above.
            </p>
          ) : (
            <div className="space-y-3">
              {services.map((s) => (
                <div
                  key={s._id}
                  className="flex justify-between items-center border border-gray-100 rounded-lg p-4"
                >
                  <div>
                    <p className="font-medium text-gray-900">{s.name}</p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {s.duration} — Rs. {s.price}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
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