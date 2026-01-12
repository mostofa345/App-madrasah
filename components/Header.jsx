"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const [headerData, setHeaderData] = useState(null);
  const [error, setError] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://madrasah-server.onrender.com/api";
  const API_URL = `${BASE_URL}/header/get-header`;

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data) {
          setHeaderData(res.data);
        }
      } catch (err) {
        console.error("API Fetch Error:", err.message);
        setError(true);
      }
    };
    fetchHeader();
  }, [API_URL]);

  if (!headerData && !error) {
    return (
      <div className="h-44 bg-emerald-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white font-medium animate-pulse">মাদরাসার তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error || !headerData) {
    return <div className="h-10 bg-red-500 text-white text-center text-xs">ডাটা লোড করতে সমস্যা হয়েছে। সার্ভার চেক করুন।</div>;
  }

  return (
    <header className="w-full shadow-2xl border-b border-orange-200 dark:border-emerald-900/30">
      {/* Top Bar */}
      <div className="bg-amber-100 dark:bg-emerald-950 py-1.5 px-4 md:px-10 flex flex-wrap justify-between items-center text-[13px] font-bold text-amber-900 dark:text-emerald-100 transition-colors">
        <div className="flex gap-5">
          <span>Code: {headerData.code}</span>
          <span className="border-l border-amber-300 dark:border-emerald-800 pl-5">EIIN: {headerData.eiin}</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-4">
            <span className="flex items-center gap-2 bg-white/50 dark:bg-emerald-900/40 px-3 py-1 rounded-full">
              <Calendar size={14} className="text-orange-600" /> {new Date().toLocaleDateString('bn-BD')}
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Header Content */}
      <div className="relative bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 dark:from-slate-950 dark:via-emerald-950 dark:to-slate-950 py-4 px-4 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Logo & Text Container */}
          <div className="flex items-center gap-6 flex-1">
            {/* Logo */}
            <div className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center border-4 border-white/20 shrink-0 shadow-2xl overflow-hidden">
              <img 
                src={headerData.logo?.url} 
                alt={headerData.logo?.alt} 
                className="w-full h-full object-contain p-1"
              />
            </div>

            {/* Names */}
            <div className="flex flex-col text-left">
              <h2 className="text-2xl md:text-4xl font-black text-white leading-tight drop-shadow-md">
                {headerData.nameBangla}
              </h2>
              {/* ক্যালিগ্রাফি স্টাইল আরবি টেক্সট */}
              <h3 
                className="text-3xl md:text-5xl text-amber-300 py-2 leading-relaxed drop-shadow-lg" 
                style={{ 
                  fontFamily: "'Amiri', serif", // নিশ্চিত করুন এই ফন্টটি আপনার প্রজেক্টে ইমপোর্ট করা আছে
                  direction: 'rtl',
                  fontWeight: '700'
                }}
              >
                {headerData.nameArabic}
              </h3>
              <p className="text-[11px] md:text-sm font-bold text-white/90 tracking-[3px] uppercase mt-1">
                {headerData.nameEnglish}
              </p>
            </div>
          </div>

          {/* Banner Image (বড় এবং হেডারের সাথে মানানসই) */}
          <div className="hidden lg:block w-64 h-32 md:h-40 rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <img 
              src={headerData.sideImage?.url} 
              alt={headerData.sideImage?.alt} 
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </header>
  );
}