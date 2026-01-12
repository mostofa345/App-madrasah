"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, Waves, 
  Layout, CheckCircle2 
} from 'lucide-react';

const FacilitiesClient = ({ data }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src={data.hero?.image || "/images/placeholder-hero.jpg"} 
          alt="Madrasah Campus" 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 dark:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-center md:text-left md:w-2/3"
          >
            <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">
              {data.hero?.title || "Campus Facilities"}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
              {data.hero?.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Facility Cards Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white mb-4">Our Facilities</h2>
          <div className="w-24 h-2 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.facilities?.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.imageAlt || item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                   <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg">
                      <Layout size={24} />
                   </div>
                   <h3 className="text-2xl font-black text-white">{item.title}</h3>
                </div>
              </div>

              <div className="p-8">
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {item.desc}
                </p>
                <div className="space-y-3">
                  {item.features?.map((feat, fidx) => (
                    <div key={fidx} className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Safety Section */}
      <section className="py-24 bg-slate-100 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full font-black text-sm uppercase tracking-widest">
              <ShieldCheck size={20} /> Security & Safety
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white leading-tight">
              {data.safety?.title || "Safe & Secure Campus"}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              {data.safety?.desc}
            </p>
          </div>
          
          <div className="flex-1 relative">
             <div className="absolute -inset-4 bg-emerald-500 rounded-[3rem] blur-2xl opacity-20 animate-pulse"></div>
             <motion.img 
               initial={{ x: 50, opacity: 0 }}
               whileInView={{ x: 0, opacity: 1 }}
               src={data.safety?.image || "/images/placeholder-safety.jpg"} 
               alt="Security System" 
               className="relative z-10 w-full h-auto rounded-[3rem] shadow-2xl border-8 border-white dark:border-slate-800"
             />
          </div>
        </div>
      </section>

      {/* Environment Callout */}
      <section className="py-24 text-center px-4">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <Waves className="mx-auto text-emerald-500 mb-8" size={60} />
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-6">A Serene & Spiritual Environment</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Every corner of the Madrasah is designed so that students can focus fully on their studies and remain mentally peaceful.
          </p>
        </motion.div>
      </section>

    </div>
  );
};

export default FacilitiesClient;