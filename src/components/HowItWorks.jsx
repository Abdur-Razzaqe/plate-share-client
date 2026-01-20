import { motion } from "framer-motion";
import { FaHandHoldingHeart, FaSearch, FaUtensils } from "react-icons/fa";

const steps = [
  {
    icon: FaUtensils,
    title: "Post Food",
    desc: "Share surplus food by adding details like location and expiry date.",
  },
  {
    icon: FaSearch,
    title: "Find Food",
    desc: "Browse nearby food donations and request what you need.",
  },
  {
    icon: FaHandHoldingHeart,
    title: "Collect Food",
    desc: "Meet the donor, collect food, and spread happiness.",
  },
];

const HowItWorks = () => {
  return (
    <section className=" py-2 mt-5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
        >
          How It Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-gray-600 mb-14"
        >
          PlateShare makes food sharing simple, transparent, and impactful in
          just three easy steps.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl border border-pink-100 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-pink-100 text-pink-600">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
