import { Link } from "react-router";
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
    <footer className="bg-gray-900 text-gray-300 mt-1">
      <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-xl font-bold mb-4">
            <img
              src={logo}
              alt="PlateShare logo"
              className="w-9 h-9 rounded-full"
            />
            <span className="text-red-400">Plate</span>
            <span className="text-green-500">Share</span>
          </div>
          <p className="text-sm max-w-sm leading-relaxed">
            PlateShare is a community-driven platform where people can share
            surplus food and help reduce food waste together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-green-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/available-foods"
                className="hover:text-green-400 transition"
              >
                Available Foods
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-400 transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-400 transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact & Social
          </h3>
          <p className="text-sm mb-4">
            Email: support@plateshare.com <br />
            Phone: +880 1952558684
          </p>

          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full hover:bg-green-600 hover:text-white transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full hover:bg-green-600 hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full hover:bg-green-600 hover:text-white transition"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 rounded-full hover:bg-green-600 hover:text-white transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
        © {year} PlateShare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
