"use client";
import axios from "axios";
import { motion } from "framer-motion";
import { Library } from "lucide-react";
import { useEffect, useState } from "react";

export default function BookHero() {
  const [heroData, setHeroData] = useState({
    title: "পাঠ্যবই",
    highlightText: "তালিকা",
    description: "নূরানী থেকে ফাজিল পর্যন্ত মাদরাসা বোর্ডের অনুমোদিত সকল পাঠ্যবই এবং সহায়ক বইয়ের তালিকা এখানে পাওয়া যাবে।",
    bgGradient: "bg-zinc-950",
    accentColor: "text-orange-400",
    iconColor: "text-emerald-400",
    imageUrl: ""
  });

  // process.env theke API URL fetch
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://madrasah-server.onrender.com/api";
  const API_URL = `${API_BASE}/book-hero`;

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data) {
          setHeroData(res.data);
        }
      } catch (err) {
        console.error("Hero data fetch error:", err);
      }
    };
    fetchHeroData();
  }, [API_URL]);

  return (
    <div className={`relative overflow-hidden ${heroData.bgGradient} py-20 transition-colors duration-500`}>
      {/* Background Image/Overlay if exists */}
      {heroData.imageUrl && (
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ 
            backgroundImage: `url(${heroData.imageUrl})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
        />
      )}

      {/* Animated Background Icons */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 border-[40px] border-white/20 rounded-full w-[400px] h-[400px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`p-3 bg-emerald-500/20 rounded-2xl mb-6 ${heroData.iconColor}`}
        >
          <Library size={40} />
        </motion.div>

        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tight"
        >
          {heroData.title} <span className={`${heroData.accentColor} font-serif italic`}>{heroData.highlightText}</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-xl text-emerald-100/70 text-lg font-medium"
        >
          {heroData.description}
        </motion.p>
      </div>
    </div>
  );
}