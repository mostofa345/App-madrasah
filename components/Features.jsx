"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  BookOpen, Bus, CloudSun, Heart, Home, Monitor, 
  Loader2, AlertCircle 
} from "lucide-react";

// Icon Map: Database theke asha string ke Icon Component-e convert korar jonno
const IconMap = {
  Heart: Heart,
  Monitor: Monitor,
  BookOpen: BookOpen,
  Home: Home,
  Bus: Bus,
  CloudSun: CloudSun,
};

export default function Features() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  // API URL checking
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/features/get-features";

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data) {
          setFeatures(res.data);
        }
      } catch (err) {
        console.error("Features Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatures();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center bg-zinc-50 dark:bg-black">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  return (
    <section className="py-24 bg-zinc-50 dark:bg-black transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter"
          >
            আমাদের <span className="text-orange-500 dark:text-emerald-500">সুযোগ-সুবিধাসমূহ</span>
          </motion.h2>
          <div className="w-24 h-1.5 bg-orange-500 dark:bg-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => {
            // Database theke asha string diye icon component ber kora
            const DynamicIcon = IconMap[item.icon] || AlertCircle;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image?.url} 
                    alt={item.image?.alt || item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1577891776198-c28c303f396f?q=80&w=800"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Icon and Title Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg ring-4 ring-white/10`}>
                      <DynamicIcon size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight drop-shadow-md">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Description Section */}
                <div className="p-8">
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg font-medium">
                    {item.desc}
                  </p>
                  
                  {/* Interactive Underline */}
                  <motion.div 
                    className={`mt-6 h-1.5 w-0 bg-gradient-to-r ${item.color} group-hover:w-full transition-all duration-700 rounded-full`}
                  />
                </div>

                {/* Decorative Glow (Dark Mode) */}
                <div className="absolute inset-0 border-2 border-transparent dark:group-hover:border-emerald-500/20 rounded-[2.5rem] pointer-events-none transition-colors" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}