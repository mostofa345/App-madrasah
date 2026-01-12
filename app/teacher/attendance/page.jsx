"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  MapPin, Clock, Calendar, CheckCircle2, 
  ArrowRightLeft, Timer, Coffee, LogOut 
} from "lucide-react";

export default function TeacherAttendance() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [history, setHistory] = useState([]);
  const [todayRecord, setTodayRecord] = useState(null);

  useEffect(() => {
    setMounted(true);
    const storedUser = JSON.parse(localStorage.getItem("userData")); 
    if (storedUser) setUser(storedUser);

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (mounted && user) {
      fetchAttendanceHistory();
    }
  }, [mounted, user]);

  const fetchAttendanceHistory = async () => {
  try {
    // লক্ষ্য করুন এখানে /api নেই কারণ সেটা env ফাইলে অলরেডি আছে
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/attendance/history/${user._id}`);
    setHistory(res.data);
    const today = new Date().toISOString().split('T')[0];
    const record = res.data.find(r => r.date === today);
    if (record) { setTodayRecord(record); setIsCheckedIn(true); }
  } catch (err) { console.log("Fetch error"); }
};

const handleCheckIn = async () => {
  try {
    const data = {
      teacherId: user._id,
      name: user.name,
      role: user.role,
      inTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    // URL সংশোধিত
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/attendance/check-in`, data);
    if (res.status === 201) { alert("Check-in Successful!"); fetchAttendanceHistory(); }
  } catch (err) {
    console.error("Check-in Error:", err.response?.data);
    alert("Check-in failed!");
  }
};

const handleCheckOut = async () => {
  try {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/attendance/check-out`, {
      teacherId: user._id,
      outTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    });
    if (res.status === 200) {
      alert("Checked out successfully!");
      fetchAttendanceHistory();
    }
  } catch (err) {
    alert(err.response?.data?.message || "Check-out failed");
  }
};
  if (!mounted || !user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic">
              Welcome, <span className="text-emerald-600">{user.name}</span>
            </h1>
            <p className="text-slate-500 font-medium tracking-wide">Role: {user.role.toUpperCase()}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 px-6 py-3 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Time</p>
              <p className="text-xl font-black text-slate-800 dark:text-white uppercase">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <Clock className="text-emerald-500" size={24} />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6 uppercase italic">
                {isCheckedIn && !todayRecord?.outTime ? "You are on Duty" : isCheckedIn && todayRecord?.outTime ? "Shift Completed" : "Ready to Start?"}
              </h2>
              <div className="flex flex-wrap gap-4">
                {!isCheckedIn ? (
                  <button onClick={handleCheckIn} className="px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase flex items-center gap-3 transition-all">
                    <ArrowRightLeft size={20} /> Check In
                  </button>
                ) : !todayRecord?.outTime ? (
                  <button onClick={handleCheckOut} className="px-10 py-5 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-sm uppercase flex items-center gap-3 transition-all shadow-lg shadow-red-500/20">
                    <LogOut size={20} /> Check Out
                  </button>
                ) : (
                  <div className="px-8 py-4 bg-slate-100 dark:bg-zinc-800 text-slate-500 rounded-xl font-black uppercase text-xs tracking-widest flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-500" /> Today's Session Finished
                  </div>
                )}
                <button className="px-6 py-5 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black text-xs uppercase hover:bg-slate-200 transition-all flex items-center gap-2">
                  <Coffee size={18} /> Break
                </button>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-4">
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-slate-200 dark:border-zinc-800 flex items-center gap-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl"><CheckCircle2 className="text-emerald-500" /></div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Present Days</p>
                <h4 className="text-xl font-black text-slate-800 dark:text-white uppercase">{history.length}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="font-black text-slate-800 dark:text-white uppercase italic">Recent Activity</h3>
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
                {history.map((row) => (
                  <tr key={row._id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                    <td className="px-8 py-5 text-sm font-bold text-slate-700 dark:text-slate-300">{row.date}</td>
                    <td className="px-8 py-5 text-sm font-black text-emerald-600 tracking-tighter">{row.inTime}</td>
                    <td className="px-8 py-5 text-sm font-black text-red-500 tracking-tighter">{row.outTime || "Active"}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${row.outTime ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                        {row.outTime ? "Completed" : "On Duty"}
                      </span>
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