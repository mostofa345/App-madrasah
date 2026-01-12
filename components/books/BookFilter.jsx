"use client";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BookFilter({ active, setActive }) {
  const [categories, setCategories] = useState([]);
  
  // env theke API URL nawa 
  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/book-categories`;

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(API_URL);
        // "All Books" ke default menu hisebe add kora holo
        setCategories([{ name: "All Books", _id: "default" }, ...res.data]);
      } catch (err) {
        console.error("Filter fetch error:", err);
        setCategories([{ name: "All Books", _id: "default" }]);
      }
    };
    getCategories();
  }, [API_URL]);

  return (
    <div className="bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 sticky top-[56px] z-40 overflow-x-auto no-scrollbar">
      <div className="container mx-auto px-6 py-4 flex items-center justify-center gap-4">
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setActive(cat.name)}
            className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all relative ${
              active === cat.name ? "text-white" : "text-zinc-500 hover:text-emerald-500"
            }`}
          >
            {active === cat.name && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 bg-emerald-600 rounded-full shadow-lg shadow-emerald-600/20"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}