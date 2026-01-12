"use client";
import axios from "axios";
import { motion } from "framer-motion";
import { Bell, Calendar as CalIcon, Clock, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function CalendarHero() {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  // API URL fetch from .env
  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/calendar-hero`;

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data) {
          setHeroData(res.data);
        }
      } catch (err) {
        console.error("Calendar Hero fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, [API_URL]);

  if (loading) return (
    <div className="min-h-[400px] bg-slate-950 flex items-center justify-center text-emerald-500">
      <Loader2 className="animate-spin" size={40} />
    </div>
  );

  // Database-e data na thakle ekti fallback UI ba null return korbe
  if (!heroData) return null;

  return (
    <section className="relative min-h-[500px] bg-gradient-to-br from-[#0A2E4E] via-[#0f406d] to-emerald-900 overflow-hidden py-24 px-6">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -30, 0], 
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 45, 0] 
            }}
            transition={{ duration: 5 + i, repeat: Infinity }}
            className="absolute bg-white/10 blur-2xl rounded-full"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${i * 20}%`,
              top: `${i * 15}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10 text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-white text-sm font-bold mb-8 shadow-xl"
        >
          <Bell size={16} className="text-emerald-400 animate-pulse" />
          Academic Session: {heroData.session}
        </motion.div>

        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter"
        >
          {/* Title parsing for special styling (optional logic) */}
          {heroData.title.split(' ').map((word, i) => (
            word === "ক্যালেন্ডার" ? (
              <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-orange-400"> {word} </span>
            ) : <span key={i}>{word} </span>
          ))}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto text-zinc-300 text-lg md:text-xl font-medium mb-12 leading-relaxed"
        >
          {heroData.description}
        </motion.p>

        {/* Dynamic Info Cards from Database */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {heroData.infoCards?.map((card, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl min-w-[200px] text-left shadow-2xl"
            >
              <h4 className="text-emerald-400 text-xs font-bold uppercase mb-2 tracking-widest">{card.label}</h4>
              <p className="text-white text-2xl font-black">{card.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Hero Image from Cloudinary (if available) */}
        {heroData.imageUrl && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10"
          >
            <img 
              src={heroData.imageUrl} 
              alt="Academic Banner" 
              className="w-full h-auto object-cover"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}