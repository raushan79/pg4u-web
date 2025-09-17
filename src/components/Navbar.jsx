import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 tracking-wide">
          PG4U
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-500 transition duration-200">
            Home
          </Link>
          <Link
            to="/pg-listing"
            className="hover:text-blue-500 transition duration-200"
          >
            List Your PG
          </Link>
          <Link
            to="/blogs"
            className="hover:text-blue-500 transition duration-200"
          >
            Blogs
          </Link>
          <Link
            to="/contact-us"
            className="hover:text-blue-500 transition duration-200"
          >
            Contact
          </Link>

          {isLoggedIn ? (
            <Link
              to="/profile"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Profile
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-md text-blue-600 border border-blue-600 hover:bg-blue-50 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow border-t">
          <div className="flex flex-col items-center space-y-4 py-4 text-gray-700 font-medium">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-500 transition"
            >
              Home
            </Link>
            <Link
              to="/pg-listing"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-500 transition"
            >
              List Your PG
            </Link>
            <Link
              to="/blogs"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-500 transition"
            >
              Blogs
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-500 transition"
            >
              Contact
            </Link>

            {isLoggedIn ? (
              <Link
                to="/profile"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-blue-600 border border-blue-600 hover:bg-blue-50 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
