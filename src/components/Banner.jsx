import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    id: 1,
    title: "Share Food, Spread Smiles",
    desc: "Donate your surplus food to help others and reduce waste in your community.",
    img: "https://i.ibb.co.com/6R8m967d/photo-1504754524776-8f4f37790ca0.jpg",
    btn: "View All Foods",
    link: "/available-foods",
  },
  {
    id: 2,
    title: "Be a Food Hero",
    desc: "Every plate share brings happiness to someone in need.",
    img: "https://i.ibb.co.com/CsX5KPcb/photo-1504674900247-0877df9cc836.jpg",
    btn: "Start Sharing",
    link: "/add-foods",
  },
  {
    id: 3,
    title: "Join Our Mission",
    desc: "Together, we can build a community where no food goes to waste..",
    img: "https://i.ibb.co.com/zVkqbQ44/photo-1600891964092-4316c288032e.jpg",
    btn: "View All Foods",
    link: "/manage-foods",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? "100% " : "-100%",
      opacity: 0.7,
      zIndex: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      zIndex: 0,
    }),
  };

  // const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  // const prevSlide = () =>
  //   setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[50vh] overflow-hidden rounded-lg shadow-lg">
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={slides[current].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", ease: "easeInOut", duration: 1.5 },
            opacity: { duration: 2 },
          }}
          className="absolute top-0 left-0 w-full h-full"
          onAnimationComplete={() => {
            handleNext();
          }}
        >
          <img
            src={slides[current].img}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6">
            <motion.h1
              key={slides[current].title}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              {slides[current].title}
            </motion.h1>

            <motion.p
              key={slides[current].desc}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mb-6"
            >
              {slides[current].desc}
            </motion.p>

            <motion.a
              href={slides[current].link}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg shadow-lg transition"
            >
              {slides[current].btn}
            </motion.a>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={handlePrev}
        className="absolute left-5 top 1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-5 top 1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition"
      >
        <FiChevronRight size={24} />
      </button>
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              current === i ? "bg-green-500" : "bg-white/60"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
