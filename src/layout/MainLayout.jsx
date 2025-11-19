import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
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

      <div className="max-w-7xl mx-auto w-full px-4 ms:px-6 lg:px-8">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
