import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col  dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </header>

      {/* Banner only on Home */}
      {isHome && (
        <section className="w-full bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <Banner />
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full  dark:bg-gray-800">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
