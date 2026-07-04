import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold text-white mb-3">BookIt</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Pakistan's #1 appointment booking platform for businesses and customers.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-400 text-sm hover:text-white">Home</Link></li>
            <li><Link to="/#pricing" className="text-gray-400 text-sm hover:text-white">Pricing</Link></li>
            <li><Link to="/#faq" className="text-gray-400 text-sm hover:text-white">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">For Business</h4>
          <ul className="space-y-2">
            <li><Link to="/register" className="text-gray-400 text-sm hover:text-white">Get started free</Link></li>
            <li><Link to="/login" className="text-gray-400 text-sm hover:text-white">Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Contact</h4>
          <ul className="space-y-2">
            <li className="text-gray-400 text-sm">bookit@gmail.com</li>
            <li className="text-gray-400 text-sm">Pakistan</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center">
        <p className="text-gray-500 text-sm">© 2025 BookIt — All rights reserved</p>
      </div>
    </footer>
  );
}