import { motion } from "framer-motion";

import React from "react";

const Mission = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 text-center mt-8">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
      >
        Our Mission
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg max-w-3xl mx-auto text-gray-700 leading-relaxed"
      >
        We believe that no food should go to waste when someone nearby is in
        need. Our plateform connects generous donors and greateful receivers,
        building a community of kindness through shared meals.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-10 flex justify-center gap-8 flex-wrap"
      >
        <div className="bg-white px-6 py-4 rounded-2xl shadow-md border border-pink-100">
          <h3 className="text-3xl font-bold text-pink-500">2K+</h3>
          <p className="text-gray-600">Meals Share</p>
        </div>
        <div className="bg-white px-6 py-4 rounded-2xl shadow-md border border-pink-100">
          <h3 className="text-3xl font-bold text-pink-500">500+</h3>
          <p className="text-gray-600">Active Donors</p>
        </div>
        <div className="bg-white px-6 py-4 rounded-2xl shadow-md border border-pink-100">
          <h3 className="text-3xl font-bold text-pink-500">100+</h3>
          <p className="text-gray-600">Communities Helped</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Mission;
