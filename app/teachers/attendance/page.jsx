"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { 
  MapPin, Clock, Calendar, CheckCircle2, 
  AlertCircle, ArrowRightLeft, Timer, Coffee 
} from "lucide-react";

export default function TeacherAttendance() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // Time update logic
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const attendanceStats = [
    { label: "Present Days", value: "22", icon: <CheckCircle2 className="text-emerald-500" /> },
    { label: "Late Entries", value: "02", icon: <Clock className="text-orange-500" /> },
    { label: "Total Hours", value: "160h", icon: <Timer className="text-blue-500" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
              Daily <span className="text-emerald-600">Attendance</span>
            </h1>
            <p className="text-slate-500 font-medium">Mark your arrival and track working hours</p>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 px-6 py-3 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Current Time</p>
              <p className="text-xl font-black text-slate-800 dark:text-white uppercase">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </p>
            </div>
            <div className="h-10 w-px bg-slate-200 dark:bg-zinc-800"></div>
            <Calendar className="text-emerald-500" size={24} />
          </div>
        </header>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          
          {/* Main Check-in Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 shadow-xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-emerald-600 mb-6">
                <MapPin size={18} />
                <span className="text-xs font-black uppercase tracking-widest">Madrasah Campus Area</span>
              </div>

              <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2 uppercase italic">
                {isCheckedIn ? "You are on Duty" : "Ready to Start?"}
              </h2>
              <p className="text-slate-500 text-sm mb-8 max-w-sm font-medium leading-relaxed">
                Please ensure you are within the campus boundary to mark your attendance accurately.
              </p>

              <div className="flex flex-wrap gap-4">
                {!isCheckedIn ? (
                  <button 
                    onClick={() => setIsCheckedIn(true)}
                    className="px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-3"
                  >
                    <ArrowRightLeft size={20} /> Check In Now
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsCheckedIn(false)}
                    className="px-10 py-5 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-red-500/20 transition-all flex items-center gap-3"
                  >
                    <LogOutIcon size={20} /> Check Out
                  </button>
                )}
                <button className="px-6 py-5 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2">
                  <Coffee size={18} /> Take Break
                </button>
              </div>
            </div>

            {/* Decorative Background Icon */}
            <CheckCircle2 size={200} className="absolute -bottom-10 -right-10 text-slate-50 dark:text-zinc-800/20 -z-0" />
          </motion.div>

          {/* Quick Stats Column */}
          <div className="flex flex-col gap-4">
            {attendanceStats.map((stat, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 5 }}
                className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-slate-200 dark:border-zinc-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 dark:bg-zinc-800 rounded-2xl">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    <h4 className="text-xl font-black text-slate-800 dark:text-white uppercase">{stat.value}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="font-black text-slate-800 dark:text-white uppercase italic">Recent Activity</h3>
            <button className="text-[10px] font-black text-emerald-600 hover:underline uppercase tracking-widest">View Full Log</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-zinc-800/30">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">In Time</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Out Time</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                {[1, 2, 3].map((row) => (
                  <tr key={row} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                    <td className="px-8 py-5 text-sm font-bold text-slate-700 dark:text-slate-300 uppercase">Jan 1{row}, 2026</td>
                    <td className="px-8 py-5 text-sm font-black text-emerald-600">08:55 AM</td>
                    <td className="px-8 py-5 text-sm font-black text-red-500">04:30 PM</td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 text-[10px] font-black rounded-lg uppercase">On Time</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Logout Icon if not imported
function LogOutIcon({size}) {
  return <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />;
}