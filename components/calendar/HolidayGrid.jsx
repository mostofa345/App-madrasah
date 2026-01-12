"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { 
  Download, 
  Palmtree, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  Calendar, 
  Flag, 
  BookOpen 
} from "lucide-react";

// আইকন ম্যাপ: ডাটাবেজ থেকে আসা iconName অনুযায়ী আইকন দেখাবে
const iconMap = {
  Palmtree: Palmtree,
  Star: Star,
  ShieldCheck: ShieldCheck,
  Calendar: Calendar,
  Flag: Flag,
  BookOpen: BookOpen
};

export default function HolidayGrid() {
  const [holidayCategories, setHolidayCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // ডাটাবেজ থেকে ডাটা ফেচ করা
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch("https://madrasah-server.onrender.com/api/holidays"); // আপনার সার্ভার ইউআরএল
        const data = await response.json();
        setHolidayCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching holidays:", error);
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  // লোডিং স্টেট
  if (loading) {
    return (
      <div className="py-20 text-center dark:text-white">
        লোড হচ্ছে...
      </div>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-zinc-950 px-6">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Sparkles className="text-orange-500" />
          <h2 className="text-3xl font-bold dark:text-white">ছুটির তালিকা ও ক্যাটাগরি</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {holidayCategories.map((cat, i) => {
            // ডাইনামিক আইকন সিলেক্ট করা
            const IconComponent = iconMap[cat.iconName] || Palmtree;
            
            // কালার ক্লাস ডাইনামিক করা (tailing bg-emerald-500 style maintain korar jonno)
            const colorClass = cat.color === "orange" ? "text-orange-500" : 
                               cat.color === "blue" ? "text-blue-500" : 
                               "text-emerald-500";
            
            const dotClass = cat.color === "orange" ? "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" : 
                             cat.color === "blue" ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" : 
                             "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]";

            return (
              <motion.div
                key={cat._id || i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group p-8 rounded-[40px] bg-slate-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 transition-all duration-500"
              >
                <div className="mb-6 p-4 bg-white dark:bg-zinc-800 w-fit rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <IconComponent size={32} className={colorClass} />
                </div>
                <h3 className="text-2xl font-bold dark:text-white mb-6">{cat.title}</h3>
                <ul className="space-y-4">
                  {cat.items && cat.items.map((item, j) => (
                    <motion.li 
                      key={j} 
                      className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 font-medium"
                      whileHover={{ x: 5 }}
                    >
                      <div className={`w-2 h-2 rounded-full ${dotClass}`} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Action Bar / Download Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-20 p-10 rounded-[40px] overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[#0A2E4E] dark:bg-zinc-900 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">পূর্ণাঙ্গ ক্যালেন্ডার ডাউনলোড করুন</h3>
              <p className="text-emerald-200/70 text-lg max-w-md">
                সারা বছরের সকল ইভেন্ট এবং ছুটি একত্রে পেতে আমাদের অফিশিয়াল ক্যালেন্ডার পিডিএফ সংগ্রহে রাখুন।
              </p>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-2xl transition-all shadow-2xl shadow-emerald-500/40"
            >
              <Download size={22} />
              DOWNLOAD PDF (2025)
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}