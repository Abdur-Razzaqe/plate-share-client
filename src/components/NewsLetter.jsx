import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="bg-pink-50 dark:bg-gray-800 py-20">
      <motion.div
        className="max-w-3xl mx-auto text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Join Our Community
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Subscribe to get updates on new food posts and community news.
        </p>

        <form className="flex flex-col sm:flex-row justify-center gap-3">
          <input
            type="email"
            placeholder="Your email address"
            required
            className="px-4 py-3 rounded-full w-full sm:w-auto flex-1 border border-pink-200 dark:border-gray-700 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-full font-semibold hover:shadow-lg transition"
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Newsletter;
