import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-pink-600">
        About PlateShare
      </h1>

      <p className="text-gray-700 text-lg text-center mb-8">
        PlateShare is a community-driven food sharing platform that helps reduce
        food waste by connecting people who have surplus food with those who
        need it.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-base-200 rounded-xl">
          <h3 className="text-xl font-semibold mb-2">🎯 Our Mission</h3>
          <p>
            Our mission is to minimize food waste and support people in need
            through a simple and secure food sharing system.
          </p>
        </div>

        <div className="p-6 bg-base-200 rounded-xl">
          <h3 className="text-xl font-semibold mb-2">🚀 Key Features</h3>
          <ul className="list-disc list-inside">
            <li>User & Admin Dashboard</li>
            <li>Food donation & request system</li>
            <li>Role-based access control</li>
            <li>Secure authentication</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
