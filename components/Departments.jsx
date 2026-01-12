"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, Award, Book, GraduationCap, School, Loader2 
} from "lucide-react";

// Icon mapping string to component
const IconMap = {
  School: School,
  Book: Book,
  GraduationCap: GraduationCap,
  Award: Award,
};

export default function Departments() {
  const [depts, setDepts] = useState([]);
  const [loading, setLoading] = useState(true);

  // API URL checking from .env
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/departments/get-depts";

  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data) {
          setDepts(res.data);
        }
      } catch (err) {
        console.error("Departments Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDepts();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
      </div>
    );
  }

  // Jodi database e kono data na thake
  if (depts.length === 0) return null;

  return (
    <section className="py-24 bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tighter uppercase"
            >
              আমাদের <span className="text-orange-500 dark:text-emerald-500">বিভাগসমূহ</span>
            </motion.h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
              দ্বীনি ও আধুনিক শিক্ষার সমন্বয়ে আমাদের প্রতিটি বিভাগ সাজানো হয়েছে সুদক্ষ কারিকুলাম ও অভিজ্ঞ শিক্ষক মন্ডলী দ্বারা।
            </p>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {depts.map((dept, idx) => {
            // Dynamically select icon
            const IconComponent = IconMap[dept.icon] || School;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`group relative p-8 rounded-[2.5rem] ${dept.bgPattern} border border-zinc-100 dark:border-zinc-800 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-none overflow-hidden`}
              >
                {/* Decorative Background Element */}
                <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${dept.color} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Icon Box */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${dept.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-500`}>
                    <IconComponent size={32} />
                  </div>

                  {/* Names */}
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-1">
                    {dept.name}
                  </h3>
                  <p className="text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter mb-4">
                    {dept.engName}
                  </p>

                  {/* Description */}
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                    {dept.desc}
                  </p>

                  {/* Action Link - Redirects to /academic/syllabus */}
                  <Link href="/academic/syllabus">
                    <button className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white hover:gap-3 transition-all">
                      সিলেবাস দেখুন <ArrowUpRight size={16} className="text-orange-500" />
                    </button>
                  </Link>
                </div>

                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full bg-gradient-to-r ${dept.color} transition-all duration-700`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}