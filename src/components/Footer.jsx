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
    <footer className="bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 text-gray-100pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:left ">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold text-white mb-3">
            <span>PlateShare</span>
          </h2>
          <p className="text-sm opacity-90 max-w-xs">
            Share food, spread smiles. Together we can build a community where
            no food goes to waste.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-yellow-300 transition">
                Home
              </a>
            </li>
            <li>
              <a
                href="/available-foods"
                className="hover:text-yellow-300  transition"
              >
                Available Foods
              </a>
            </li>

            <li>
              <a href="/contact" className="hover:text-yellow-300  transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-end items-center gap-4">
            <a
              href="#"
              className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition text-lg"
            >
              {" "}
              <FaFacebook />{" "}
            </a>
            <a
              href="#"
              className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition text-lg"
            >
              {" "}
              <FaInstagram />{" "}
            </a>
            <a
              href="#"
              className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition text-lg"
            >
              {" "}
              <FaXTwitter />{" "}
            </a>
            <a
              href="#"
              className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition text-lg"
            >
              {" "}
              <FaLinkedin />{" "}
            </a>
          </div>
        </div>
      </div>

      <div className=" border-t border-white/20  text-center text-sm opacity-80">
        ©{year} PlateShare - All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
