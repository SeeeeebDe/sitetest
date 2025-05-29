import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../images/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50 shadow-[0_4px_8px_0_rgba(139,125,107,0.15)]">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Logo Mon Instant Zen"
            className="h-8 w-8 object-contain"
          />
          <span
            className="text-xl font-bold"
            style={{ color: "#8B7D6B" }} // beige foncé
          >
            Mon Instant Zen
          </span>
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <ul
          className={`md:flex md:items-center md:static absolute bg-white w-full left-0 md:w-auto md:opacity-100 transition-all duration-300 ease-in ${
            open ? "top-16 opacity-100" : "top-[-490px] opacity-0"
          }`}
        >
          <li>
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/massages"
              className="block px-4 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              Massages
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block px-4 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/mentions-legales"
              className="block px-4 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              Mentions légales
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}