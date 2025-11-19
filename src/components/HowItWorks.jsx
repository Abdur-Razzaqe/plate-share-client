import { motion } from "framer-motion";
import { FaHandHoldingHeart, FaSearch, FaUtensils } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUtensils size={40} className="text-pink-500" />,
      title: "Post Food",
      desc: "Donate your extra food with details like location and expiry.",
    },
    {
      icon: <FaSearch size={40} className="text-pink-500" />,
      title: "Find Food",
      desc: "Users nearby can browse and request available food items.",
    },
    {
      icon: <FaHandHoldingHeart size={40} className="text-pink-500" />,
      title: "Collect Food",
      desc: "Complete the donation and make someone's day happier!.",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto text-center px-6 mt-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        How It Works
      </h2>
      <div className="grid md:grid-cols-3 gap-10">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: idx * 0.4 }}
            className="bg-white shadow-md p-8 rounded-2xl border border-pink-100 hover:shadow-lg transition"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
