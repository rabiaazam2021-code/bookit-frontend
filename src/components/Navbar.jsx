import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-purple-700 shadow-sm px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white tracking-tight">
          BookIt
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-purple-200 hover:text-white text-sm transition">
            Home
          </Link>
          <Link to="/#how-it-works" className="text-purple-200 hover:text-white text-sm transition">
            How it works
          </Link>
          <Link to="/#pricing" className="text-purple-200 hover:text-white text-sm transition">
            Pricing
          </Link>
          <Link to="/#faq" className="text-purple-200 hover:text-white text-sm transition">
            FAQ
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                to={user.role === "business" ? "/business/dashboard" : "/customer/dashboard"}
                className="text-purple-200 hover:text-white text-sm"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-purple-200 hover:text-white text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-300"
              >
                Get started free
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 px-2">
          <Link to="/" className="text-purple-200 text-sm" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/#how-it-works" className="text-purple-200 text-sm" onClick={() => setMenuOpen(false)}>How it works</Link>
          <Link to="/#pricing" className="text-purple-200 text-sm" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link to="/#faq" className="text-purple-200 text-sm" onClick={() => setMenuOpen(false)}>FAQ</Link>
          {user ? (
            <button onClick={handleLogout} className="bg-white text-purple-700 px-4 py-2 rounded-lg text-sm font-medium">Logout</button>
          ) : (
            <>
              <Link to="/login" className="text-purple-200 text-sm" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium text-center" onClick={() => setMenuOpen(false)}>Get started free</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}