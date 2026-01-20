import { motion } from "framer-motion";

const stats = [
  { value: "2K+", label: "Meals Shared" },
  { value: "500+", label: "Active Donors" },
  { value: "100+", label: "Communities Helped" },
];

const Mission = () => {
  return (
    <section className=" dark:bg-gray-900 py-16 mt-5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4"
        >
          Our Mission
        </motion.h2>

        {/* Section Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed mb-12"
        >
          We believe that no food should go to waste when someone nearby is in
          need. PlateShare connects generous donors and grateful receivers,
          building a community of kindness through shared meals.
        </motion.p>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 border border-pink-100 dark:border-gray-700 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center"
            >
              <h3 className="text-3xl font-bold text-pink-500 dark:text-pink-400 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
