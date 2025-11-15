import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-green-500 mb-3">
            <span>PlateShare</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Share food, spread smiles. Together we can build a community where
            no food goes to waste.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-green-500 transition">
                Home
              </a>
            </li>
            <li>
              <a
                href="/available-foods"
                className="hover:text-green-500 transition"
              >
                Available Foods
              </a>
            </li>

            <li>
              <a href="/contact" className="hover:text-green-500 transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition"
            >
              {" "}
              <FaFacebook />{" "}
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition"
            >
              {" "}
              <FaInstagram />{" "}
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition"
            >
              {" "}
              <FaXTwitter />{" "}
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition"
            >
              {" "}
              <FaLinkedin />{" "}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        ©{year} PlateShare - All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
