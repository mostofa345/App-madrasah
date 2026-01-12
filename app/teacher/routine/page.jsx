"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock, Download, MapPin, Printer } from "lucide-react";

export default function ClassRoutine() {
  const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  
  const schedule = [
    { time: "09:30 - 10:15", subject: "Arabic 1st", class: "Class 10", room: "Room 201" },
    { time: "10:15 - 11:00", subject: "Hadith Sharif", class: "Fazil 1st", room: "Hall A" },
    { time: "11:00 - 11:45", subject: "Fiqh", class: "Alim 2nd", room: "Room 305" },
    { time: "11:45 - 12:30", subject: "English", class: "Class 9", room: "Room 102" },
    { time: "12:30 - 01:30", subject: "Zohr & Lunch Break", isBreak: true },
    { time: "01:30 - 02:15", subject: "Tafsir", class: "Fazil 2nd", room: "Hall B" },
    { time: "02:15 - 03:00", subject: "Bangla", class: "Class 8", room: "Room 204" },
    { time: "03:00 - 03:30", subject: "General Math", class: "Class 7", room: "Room 105" },
    { time: "03:30 - 04:00", subject: "Mantiq/Sarf", class: "Alim 1st", room: "Room 302" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
              Academic <span className="text-blue-600">Routine</span>
            </h1>
            <p className="text-slate-500 font-medium italic">Weekly Class Schedule - Academic Session 2026</p>
          </div>
          
          <div className="flex gap-3">
            <button className="p-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl text-slate-500 hover:text-blue-600 transition-all shadow-sm">
              <Printer size={20} />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">
              <Download size={16} /> PDF Routine
            </button>
          </div>
        </header>

        {/* Weekly Day Selector (Desktop) */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
          {days.map((day) => (
            <button 
              key={day}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap
                ${day === "Saturday" 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "bg-white dark:bg-zinc-900 text-slate-400 border border-slate-200 dark:border-zinc-800 hover:border-blue-400"
                }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Routine Timeline */}
        <div className="space-y-4">
          {schedule.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              key={index}
              className={`group flex flex-col md:flex-row items-center gap-4 md:gap-8 p-6 rounded-[2rem] border transition-all
                ${item.isBreak 
                  ? "bg-slate-100 dark:bg-zinc-800/50 border-dashed border-slate-300 dark:border-zinc-700 opacity-80" 
                  : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 hover:shadow-xl hover:border-blue-500/50"
                }`}
            >
              {/* Time Slot */}
              <div className="w-full md:w-40 flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${item.isBreak ? "bg-slate-200 dark:bg-zinc-700" : "bg-blue-50 dark:bg-blue-500/10 text-blue-600"}`}>
                  <Clock size={20} />
                </div>
                <p className="font-black text-slate-800 dark:text-slate-200 text-sm whitespace-nowrap">{item.time}</p>
              </div>

              {/* Subject Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className={`text-lg font-black uppercase italic ${item.isBreak ? "text-slate-500" : "text-slate-800 dark:text-white"}`}>
                  {item.subject}
                </h3>
                {!item.isBreak && (
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-1">
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <Calendar size={12} className="text-blue-500" /> {item.class}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <MapPin size={12} className="text-blue-500" /> {item.room}
                    </span>
                  </div>
                )}
              </div>

              {/* Status Badge */}
              {!item.isBreak ? (
                <div className="hidden md:block">
                  <div className="px-4 py-2 bg-slate-50 dark:bg-zinc-800 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-all">
                    Active Class
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-400 font-bold italic text-xs uppercase tracking-widest">
                  <BookOpen size={16} /> Restricted Time
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-10 p-6 bg-blue-50 dark:bg-blue-500/5 rounded-[2rem] border border-blue-100 dark:border-blue-500/10">
          <p className="text-center text-sm font-bold text-blue-600/70 italic uppercase tracking-wider">
            Note: All classes follow the standard Madrasah Education Board guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}