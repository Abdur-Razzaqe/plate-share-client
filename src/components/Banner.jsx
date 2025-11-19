import { AnimatePresence, motion } from "framer-motion";

import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router";

const slides = [
  {
    id: 1,
    title: "Share Food, Spread Smiles",
    desc: "Donate your surplus food to help others and reduce waste in your community.",
    img: "https://i.ibb.co.com/6R8m967d/photo-1504754524776-8f4f37790ca0.jpg",
  },
  {
    id: 2,
    title: "Be a Food Hero",
    desc: "Every meal share brings happiness to someone in need.",
    img: "https://i.ibb.co.com/CsX5KPcb/photo-1504674900247-0877df9cc836.jpg",
  },
  {
    id: 3,
    title: "Join Our Mission",
    desc: "Together, we can build a community where no food goes to waste..",
    img: "https://i.ibb.co.com/zVkqbQ44/photo-1600891964092-4316c288032e.jpg",
  },
];

const Banner = () => {
  const [direction, setDirection] = useState(1);
  const [index, setIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [autoSlide, setAutoSlide] = useState(true);

  useEffect(() => {
    if (!autoSlide) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer);
  }, [autoSlide]);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!searchTerm) return;
    setLoading(true);

    const timer = setTimeout(() => {
      navigate(`/available-foods?search=${searchTerm}`);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchTerm, navigate]);

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div
      className="relative h-[30vh] w-full md:h-[50vh] overflow-hidden rounded-lg shadow-lg"
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
          transition={{
            x: { type: "tween", duration: 0.8 },
            opacity: { duration: 0.8 },
          }}
          className="absolute top-0 left-0  w-full h-full"
        >
          <img
            src={slides[index].img}
            alt={slides[index].title}
            className="absolute w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6">
            <motion.h1
              key={slides[index].title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
            >
              {slides[index].title}
            </motion.h1>

            <motion.p
              key={slides[index].desc}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mb-6"
            >
              {slides[index].desc}
            </motion.p>

            <div className="">
              <form className="flex justify-center items-center text-center w-full px-4 md:px-0">
                <input
                  type="text"
                  placeholder="Search for food...."
                  value={searchTerm}
                  required
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input w-full sm:w-[300px] px-4 py-2 rounded-l-full text-black focus:outline-none border-pink-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn px-6 py-2 rounded-r-full border-none text-white bg-gradient-to-r- from bg-pink-500 hover:from-pink-600 hover:to-rose-600 ${
                    loading ? "opacity-60" : ""
                  }`}
                >
                  {loading ? "Search..." : "Search"}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 p-3 rounded-full shadow-md transition"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2  text-gray-800 p-3 rounded-full shadow-md transition"
      >
        <FiChevronRight size={24} />
      </button>
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              i === index ? "bg-green-500" : "bg-white/60"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
