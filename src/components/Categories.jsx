import { motion } from "framer-motion";
import { FaPizzaSlice, FaAppleAlt, FaFish, FaBreadSlice } from "react-icons/fa";

const categories = [
  { icon: FaPizzaSlice, name: "Fast Food" },
  { icon: FaAppleAlt, name: "Fruits" },
  { icon: FaFish, name: "Seafood" },
  { icon: FaBreadSlice, name: "Bakery" },
];

const Categories = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12"
      >
        Food Categories
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 border border-pink-100 dark:border-gray-700 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="bg-pink-100 dark:bg-pink-900 p-4 rounded-full mb-4">
                <Icon className="text-pink-500 dark:text-pink-400" size={28} />
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-semibold">
                {cat.name}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
