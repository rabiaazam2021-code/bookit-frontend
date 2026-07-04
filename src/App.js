import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import BookAppointment from "./pages/customer/BookAppointment";
import BusinessDashboard from "./pages/business/BusinessDashboard";
import ManageServices from "./pages/business/ManageServices";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer/dashboard" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/customer/book" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
        <Route path="/business/dashboard" element={<ProtectedRoute><BusinessDashboard /></ProtectedRoute>} />
        <Route path="/business/services" element={<ProtectedRoute><ManageServices /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;