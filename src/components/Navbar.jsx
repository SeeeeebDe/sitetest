import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../images/LOGO.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-zen-cream shadow-zen px-6 py-4 font-sans sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-zen-forest font-sans">Mon Instant Zen</span>
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
                `font-sans text-base font-medium px-3 py-2 rounded transition-colors duration-200 ${isActive ? "text-zen-forest" : "text-zen-gray-dark hover:text-zen-sage"}`
              }
          >
            Accueil
          </NavLink>
          <NavLink
            to="/massages"
            className={({ isActive }) =>
                `font-sans text-base font-medium px-3 py-2 rounded transition-colors duration-200 ${isActive ? "text-zen-forest" : "text-zen-gray-dark hover:text-zen-sage"}`
              }
          >
            Massages
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
                `font-sans text-base font-medium px-3 py-2 rounded transition-colors duration-200 ${isActive ? "text-zen-forest" : "text-zen-gray-dark hover:text-zen-sage"}`
              }
          >
            Contact
          </NavLink>
          <NavLink
            to="/mentions-legales"
            className={({ isActive }) =>
                `font-sans text-base font-medium px-3 py-2 rounded transition-colors duration-200 ${isActive ? "text-zen-forest" : "text-zen-gray-dark hover:text-zen-sage"}`
              }
          >
            Mentions légales
          </NavLink>
        </div>
        <button
          className="md:hidden flex items-center justify-center p-2 rounded text-zen-forest hover:bg-zen-sage/20 focus:outline-none"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Ouvrir le menu"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"}
            />
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden mt-2 bg-zen-cream rounded-lg shadow-zen py-4 px-6 flex flex-col gap-4 font-sans border border-zen-gray-light/30"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-sans text-base font-medium px-3 py-2 rounded transition-colors duration-200 ${isActive ? "text-zen-forest" : "text-zen-gray-dark hover:text-zen-sage"}`
              }
              onClick={() => setMenuOpen(false)}
            >
              Accueil
            </NavLink>
            <NavLink
              to="/massages"
              className={({ isActive }) =>
                `font-sans text-base font-medium px-3 py-2 rounded transition-colors duration-200 ${isActive ? "text-zen-forest" : "text-zen-gray-dark hover:text-zen-sage"}`
              }
              onClick={() => setMenuOpen(false)}
            >
              Massages
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `font-sans text-base font-medium px-3 py-2 rounded transition-colors duration-200 ${isActive ? "text-zen-forest" : "text-zen-gray-dark hover:text-zen-sage"}`
              }
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </NavLink>
            <NavLink
              to="/mentions-legales"
              className={({ isActive }) =>
                `font-sans text-base font-medium px-3 py-2 rounded transition-colors duration-200 ${isActive ? "text-zen-forest" : "text-zen-gray-dark hover:text-zen-sage"}`
              }
              onClick={() => setMenuOpen(false)}
            >
              Mentions légales
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}