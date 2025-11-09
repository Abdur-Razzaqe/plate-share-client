import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import Banner from "../components/Banner";

const MainLayout = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <Banner />
        <div className="mt-4">
          <Outlet />
        </div>
        <Footer />
      </div>
      <Toaster />
    </div>
  );
};

export default MainLayout;
