import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">PG4U</h2>
          <p className="text-gray-400 text-sm">
            PG4U is your trusted platform to find the perfect paying guest accommodation easily and securely.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/pg-listing" className="hover:text-blue-500 transition">
                List Your PG
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-blue-500 transition">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-blue-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
          <p className="text-gray-400 text-sm">Email: support@pg4u.com</p>
          <p className="text-gray-400 text-sm">Phone: +91 9122102491</p>
          <p className="text-gray-400 text-sm">Developer Contact: +91 9122102491</p>
          <p className="text-gray-400 text-sm">Address: Bangalore, India</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 text-center py-4 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} PG4U. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
