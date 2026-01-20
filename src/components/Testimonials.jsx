import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah K.",
    text: "PlateShare helped me donate leftover food to people in need. Amazing experience!",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Rony M.",
    text: "I received meals through PlateShare and it made my day! Highly recommended.",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Anika P.",
    text: "Simple and effective platform for sharing food with the community.",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

const Testimonials = () => {
  return (
    <section className=" dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-12"
        >
          What Our Users Say
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 border border-pink-100 dark:border-gray-700 rounded-2xl shadow-md p-6 flex flex-col items-center text-center"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full mb-4 border border-gray-200 dark:border-gray-700"
              />
              <p className="text-gray-700 dark:text-gray-300 mb-3">{t.text}</p>
              <h3 className="text-gray-800 dark:text-gray-100 font-semibold">
                {t.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
