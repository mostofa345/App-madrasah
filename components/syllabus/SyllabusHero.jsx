"use client";
import { motion } from "framer-motion";

export default function SyllabusHero() {
  return (
    <div className="relative min-h-[450px] flex items-center justify-center overflow-hidden bg-[#0A2E4E] dark:bg-zinc-950">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-orange-500/20 blur-[120px] rounded-full" 
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-400 text-sm mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Academic Year 2025-26 Updated
        </motion.div>

        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-7xl font-black text-white mb-6"
        >
          আমাদের <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-orange-400">সিলেবাস</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto text-lg text-zinc-300 leading-relaxed"
        >
          নূরানী থেকে শুরু করে ফাজিল পর্যন্ত সকল স্তরের পাঠ্যসূচী এবং পরীক্ষার প্রস্তুতি নির্দেশিকা। 
          আধুনিক এবং ইসলামী শিক্ষার এক অনন্য সমন্বয়।
        </motion.p>
      </div>
    </div>
  );
}