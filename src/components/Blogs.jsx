import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const blogs = [
  { id: 1, title: "Reduce Food Waste Today", date: "Jan 12, 2026" },
  { id: 2, title: "Top 5 Tips to Donate Food", date: "Feb 20, 2026" },
  { id: 3, title: "Community Meals & You", date: "Mar 5, 2026" },
];

const Blogs = () => {
  const navigate = useNavigate();
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 text-center mb-12"
      >
        Latest Blogs
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((b) => (
          <motion.div
            key={b.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 border border-pink-100 dark:border-gray-700 rounded-2xl shadow-md p-6 cursor-pointer"
            onClick={() => navigate(`/blogs/${b.id}`)}
          >
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {b.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{b.date}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
