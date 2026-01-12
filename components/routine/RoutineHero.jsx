"use client";
import Image from "next/image";
import { motion } from "framer-motion";

// 1. Framer Motion import kora hoyeche error fix korar jonno

export default function RoutineHero() {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden bg-slate-900">
      
      {/* Background Image with Parallax Effect */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image 
          src="/madrasa-photo.jpg" // Apnar image path-ti thik thakben public folder e
          alt="Madrasa Banner"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-[#0A2E4E] dark:to-zinc-950" />
      </motion.div>

      {/* Floating Animated Shapes (Optional - High Level Design er jonno) */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full"
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        
        {/* Small Badge */}
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest uppercase bg-orange-500 text-white rounded-full shadow-lg shadow-orange-500/20"
        >
          Academic Excellence
        </motion.span>

        {/* Main Title with Text Animation */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
        >
          একাডেমিক <span className="text-orange-400">ক্লাস রুটিন</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-slate-200 leading-relaxed font-medium"
        >
          নূরানী থেকে ফাজিল পর্যন্ত সকল ক্লাসের সময়সূচী এবং বিষয়ের বিস্তারিত তথ্য এখানে পাবেন। 
          আধুনিক মাদরাসা ব্যবস্থাপনায় আমরা সদা প্রস্তুত।
        </motion.p>

        {/* Animated Line Underneath */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ duration: 1, delay: 1.2 }}
          className="h-1.5 bg-orange-500 mx-auto mt-8 rounded-full"
        />
      </div>

      {/* Bottom Curve Shape (Optional) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-white dark:fill-slate-950 transition-colors duration-500">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105.41,114,120,169.31,120,224.62,120,263.39,70.52,321.39,56.44Z"></path>
        </svg>
      </div>

    </section>
  );
}