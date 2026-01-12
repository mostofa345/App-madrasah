"use client";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";

import { 
  LayoutDashboard, BookOpen, GraduationCap, 
  Wallet, FileText, Bell, LogOut, Menu, 
  Moon, Sun, CheckCircle, Clock 
} from "lucide-react";

export default function StudentDashboard() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20}/>, path: "/student" },
    { name: "Daily Sabaq", icon: <BookOpen size={20}/>, path: "/student/sabaq" },
    { name: "Attendance", icon: <CheckCircle size={20}/>, path: "/student/attendance" },
    { name: "Result Card", icon: <FileText size={20}/>, path: "/student/result" },
    { name: "Fees/Payment", icon: <Wallet size={20}/>, path: "/student/fees" },
    { name: "Class Routine", icon: <Clock size={20}/>, path: "/student/routine" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex font-sans">
      {/* --- Sidebar --- */}
      <motion.aside 
        animate={{ width: isOpen ? "260px" : "80px" }}
        className="bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 flex flex-col sticky top-0 h-screen transition-all z-50"
      >
        <div className="p-6 flex items-center justify-between">
          {isOpen && <h1 className="font-black text-xl text-emerald-600 italic uppercase">Al-Hidaya</h1>}
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg">
            <Menu size={20} className="dark:text-white"/>
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.path}>
              <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition-all cursor-pointer group">
                <span className="text-emerald-500 group-hover:scale-110 transition-transform">{item.icon}</span>
                {isOpen && <span className="font-bold text-xs uppercase tracking-widest">{item.name}</span>}
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-zinc-800">
          <button className="w-full flex items-center gap-4 p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all">
            <LogOut size={20}/>
            {isOpen && <span className="font-bold text-xs uppercase tracking-widest">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* --- Main Content --- */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">
              Student <span className="text-emerald-600">Portal</span>
            </h2>
            <p className="text-slate-500 text-sm font-medium italic">Class: Fazil (Final Year) | ID: 2026105</p>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Assalamu Alaikum</p>
              <p className="font-bold text-slate-800 dark:text-slate-200">MD Sabbir Rahman</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-emerald-600 border-4 border-emerald-100 dark:border-emerald-900 shadow-lg flex items-center justify-center text-white font-black italic">SR</div>
          </div>
        </header>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-[2rem] text-white shadow-xl">
            <GraduationCap className="mb-4 opacity-50" size={30} />
            <p className="text-xs font-bold uppercase opacity-80 tracking-widest">Academic Status</p>
            <h3 className="text-xl font-black italic mt-1 uppercase">Nurani to Fazil</h3>
            <p className="text-xs mt-4 bg-white/20 w-fit px-3 py-1 rounded-full">Level: Advanced</p>
          </motion.div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-slate-200 dark:border-zinc-800 flex justify-between items-center">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Attendance Rate</p>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white mt-1">94.5%</h3>
            </div>
            <div className="h-12 w-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 font-bold tracking-tighter">GOOD</div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-slate-200 dark:border-zinc-800 flex justify-between items-center">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Pending Fees</p>
              <h3 className="text-2xl font-black text-red-500 mt-1">৳ 1,200</h3>
            </div>
            <Link href="/student/fees" className="text-[10px] font-black bg-slate-100 dark:bg-zinc-800 px-3 py-2 rounded-xl text-slate-500 hover:text-emerald-500 uppercase tracking-widest transition-all">PAY NOW</Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Lessons */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase italic mb-6 border-l-4 border-emerald-500 pl-4">Today's Sabaq (Lesson)</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border-l-4 border-emerald-500">
                <p className="text-xs font-bold text-emerald-600 uppercase mb-1">Quran - Hifz Section</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight text-sm">Surah Al-Baqarah (Para 2) - Page 35</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border-l-4 border-blue-500">
                <p className="text-xs font-bold text-blue-600 uppercase mb-1">Kitab - Nahu/Sorf</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight text-sm">Mizan-us-Sarf - Bab-ul-Inshiqaq</p>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase italic">Announcements</h3>
               <Bell size={18} className="text-emerald-500 animate-bounce" />
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-xl h-fit">
                  <p className="text-[10px] font-black text-slate-500 uppercase">Jan 12</p>
                </div>
                <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-snug">Upcoming Madrasah Sports Day - Participation Mandatory.</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-xl h-fit">
                  <p className="text-[10px] font-black text-slate-500 uppercase">Jan 15</p>
                </div>
                <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-snug">Semester exam routine published. Download PDF.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}