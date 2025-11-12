import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import Banner from "../components/Banner";

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-white">
      <header className="sticky to-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </header>

      {isHome && (
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <Banner />
        </section>
      )}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
      <footer className="mt-auto bg-white border-t border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Footer />
        </div>
      </footer>

      <Toaster position="top-right" />
    </div>
  );
};

export default MainLayout;
