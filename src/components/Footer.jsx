import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import logo from "../assets/logo.jpg";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-pink-300 px-2 pt-14 rounded-2xl">
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:left ">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="flex items-center gap-1 text-xl font-bold ">
            <img src={logo} alt="" className="w-8 h-8 rounded-full" />
            <span className="text-red-400">Plate</span>
            <span className="text-green-400">Share</span>
          </h3>
          <p className="text-sm opacity-90 max-w-xs text-white">
            Share food, spread smiles. Together we can build a community where
            no food goes to waste.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/"
                className=" text-white hover:text-yellow-300 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/available-foods"
                className="text-white hover:text-yellow-300  transition"
              >
                Available Foods
              </a>
            </li>

            <li>
              <a
                href="/contact"
                className="text-white hover:text-yellow-300  transition"
              >
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

      <div className=" border-t border-white/20  text-center text-sm opacity-80 text-white">
        ©{year} PlateShare - All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
