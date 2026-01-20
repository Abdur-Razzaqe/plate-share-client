import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router";

const slides = [
  {
    id: 1,
    title: "Share Food, Spread Smiles",
    desc: "Donate surplus food and support people in your community.",
    img: "https://i.ibb.co.com/6R8m967d/photo-1504754524776-8f4f37790ca0.jpg",
  },
  {
    id: 2,
    title: "Be a Food Hero",
    desc: "Every shared meal brings hope to someone in need.",
    img: "https://i.ibb.co.com/CsX5KPcb/photo-1504674900247-0877df9cc836.jpg",
  },
  {
    id: 3,
    title: "Together Against Food Waste",
    desc: "Join PlateShare and make a meaningful impact today.",
    img: "https://i.ibb.co.com/zVkqbQ44/photo-1600891964092-4316c288032e.jpg",
  },
];

const Banner = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoSlide, setAutoSlide] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!autoSlide) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [autoSlide]);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;
    setLoading(true);
    setTimeout(() => {
      navigate(`/available-foods?search=${search}`);
      setLoading(false);
    }, 600);
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <section
      className="relative h-[65vh] w-full overflow-hidden rounded-xl shadow-lg"
      onMouseEnter={() => setAutoSlide(false)}
      onMouseLeave={() => setAutoSlide(true)}
    >
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={slides[index].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[index].img}
            alt={slides[index].title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-6 text-white">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
              {slides[index].title}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl text-base md:text-lg mb-6"
            >
              {slides[index].desc}
            </motion.p>

            <form onSubmit={handleSearch} className="flex w-full max-w-md">
              <input
                type="text"
                placeholder="Search available food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered w-full rounded-l-full text-black"
              />
              <button
                disabled={loading}
                className="btn rounded-r-full bg-pink-600 hover:bg-pink-700 text-white"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </form>

            {/* visual scroll hint */}
            <span className="mt-8 animate-bounce text-sm opacity-80">
              Scroll to explore ↓
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full"
      >
        <FiChevronLeft size={22} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full"
      >
        <FiChevronRight size={22} />
      </button>

      {/* indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === index ? "bg-green-500" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
