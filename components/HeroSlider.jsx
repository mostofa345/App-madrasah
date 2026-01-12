"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // API URL from .env
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/slider/get-sliders";

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data && res.data.length > 0) {
          setSlides(res.data);
        }
      } catch (err) {
        console.error("Slider Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, [API_URL]);

  // Automatic Slide Change (৫ সেকেন্ড পর পর)
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, slides]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <div className="h-[400px] md:h-[600px] w-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );
  }

  if (slides.length === 0) return null;

  return (
    <section className="relative w-full h-[400px] md:h-[600px] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${slides[currentIndex].image.url})` 
            }}
          >
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl"
            >
              {slides[currentIndex].title}
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sm md:text-xl text-zinc-200 max-w-2xl mb-8"
            >
              {slides[currentIndex].subtitle}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex gap-4"
            >
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg">
                ভর্তি আবেদন
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-8 py-3 rounded-full font-bold transition-all">
                বিস্তারিত
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/50 text-white transition-all z-20"
      >
        <ChevronLeft size={30} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/50 text-white transition-all z-20"
      >
        <ChevronRight size={30} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx ? "w-8 bg-emerald-500" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}