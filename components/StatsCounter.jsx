"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Award, CalendarDays, GraduationCap, Users, Loader2 } from "lucide-react";

// Icon Map for dynamic icon rendering
const IconMap = {
  Users: Users,
  GraduationCap: GraduationCap,
  Award: Award,
  CalendarDays: CalendarDays,
};

// কাউন্টার ফাংশনাল কম্পোনেন্ট (Style 100% fixed)
const Counter = ({ value, title, icon: Icon, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <div ref={ref} className="flex flex-col items-center p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-800 transition-all hover:scale-105 group">
      <div className="p-4 bg-orange-100 dark:bg-emerald-900/30 rounded-full mb-4 group-hover:bg-orange-500 dark:group-hover:bg-emerald-600 transition-colors duration-300">
        <Icon className="text-orange-600 dark:text-emerald-400 group-hover:text-white transition-colors duration-300" size={32} />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white">
          {displayValue}
        </span>
        <span className="text-xl font-bold text-orange-500 dark:text-emerald-500">{suffix}</span>
      </div>
      <p className="mt-2 text-sm md:text-base font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
        {title}
      </p>
    </div>
  );
};

export default function StatsCounter() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  // API URL checking from .env
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/stats/get-stats";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error("Stats Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center bg-zinc-50 dark:bg-black">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  // Jodi database e kono data na thake tobe component show korbe na
  if (stats.length === 0) return null;

  return (
    <section className="py-20 bg-zinc-50 dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-black text-zinc-900 dark:text-white mb-4"
          >
            এক নজরে আমাদের মাদরাসা
          </motion.h2>
          <div className="w-24 h-1 bg-orange-500 dark:bg-emerald-600 mx-auto rounded-full" />
        </div>

        {/* Dynamic Counters Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {stats.map((item) => {
            // Icon string theke component select kora
            const IconComponent = IconMap[item.icon] || Users;
            
            return (
              <Counter 
                key={item._id} 
                title={item.title} 
                value={item.value} 
                icon={IconComponent} 
                suffix={item.suffix} 
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}