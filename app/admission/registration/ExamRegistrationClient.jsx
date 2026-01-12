"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  ClipboardCheck, CalendarDays, AlertTriangle, 
  FileEdit, Clock, Download, Calendar, Banknote 
} from 'lucide-react';

const ExamRegistrationClient = ({ examData }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] font-sans pb-20 transition-colors duration-500">
      
      {/* 1. Registration Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="p-4 bg-blue-500/10 text-blue-500 rounded-[1.5rem] border border-blue-500/20">
              <ClipboardCheck size={35} />
            </div>
            <div>
              <h2 className="text-4xl font-black dark:text-white uppercase tracking-tighter">Registration</h2>
              <p className="text-slate-500 font-medium">Board Exam & Admission Form Fill-up</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examData?.registrations?.map((reg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group transition-all"
              >
                <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 transition-opacity dark:text-white">
                  <FileEdit size={120} />
                </div>
                <h3 className="text-2xl font-black dark:text-white mb-6 leading-tight">{reg.name}</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-medium">
                    <Clock size={18} className="text-blue-500" /> 
                    <span>সময়সীমা: <b className="text-slate-700 dark:text-slate-200">{reg.duration}</b></span>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-500 font-black text-lg">
                    <Banknote size={20} /> <span>ফি: {reg.fee}</span>
                  </div>
                </div>
                <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all shadow-xl shadow-blue-500/20 uppercase tracking-widest text-xs">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Notice Section */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="bg-amber-500/10 border-2 border-dashed border-amber-500/30 p-10 rounded-[3.5rem] flex flex-col md:flex-row items-center gap-10"
          >
            <div className="p-5 bg-amber-500 text-white rounded-[2rem] shadow-lg shadow-amber-500/40 animate-bounce">
              <AlertTriangle size={35} />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h4 className="text-amber-600 dark:text-amber-500 font-black text-2xl mb-2 italic uppercase tracking-wider">Special Notice:</h4>
              <p className="text-slate-700 dark:text-slate-300 text-lg font-bold leading-relaxed">
                {examData?.notice || "No new updates at this moment."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Routine Section */}
      <section className="py-24 px-4 bg-slate-100/50 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-[1.5rem] border border-emerald-500/20">
              <CalendarDays size={35} />
            </div>
            <div>
              <h2 className="text-4xl font-black dark:text-white uppercase tracking-tighter">Exam Routine</h2>
              <p className="text-slate-500 font-medium">Upcoming & Ongoing Schedules</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {examData?.exams?.map((exam, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 p-8 rounded-[3.5rem] flex flex-col md:flex-row items-start md:items-center gap-8 hover:border-emerald-500 transition-all shadow-2xl"
              >
                <div className="w-full md:w-36 h-36 bg-emerald-500 text-white rounded-[2.5rem] flex flex-col items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0 border-4 border-white dark:border-slate-800">
                  <Calendar size={35} />
                  <span className="text-[10px] font-black uppercase mt-2 tracking-widest">Date</span>
                  <span className="text-sm font-black">{exam.date}</span>
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">
                      {exam.bibag}
                    </span>
                    <span className="text-slate-400 font-black text-xs">/ {exam.className}</span>
                  </div>
                  <h3 className="text-3xl font-black dark:text-white mb-4 tracking-tight leading-tight">{exam.examName}</h3>
                  <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2"><Clock size={16} className="text-emerald-500" /> {exam.startTime} - {exam.endTime}</div>
                    <div className="flex items-center gap-2"><Banknote size={16} className="text-emerald-500" /> ফি: {exam.fee}</div>
                  </div>
                </div>

                {exam.routineUrl && (
                  <a 
                    href={exam.routineUrl} 
                    target="_blank"
                    className="w-full md:w-auto p-6 bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] transition-all flex items-center justify-center shadow-xl group"
                  >
                    <Download size={28} className="group-hover:scale-110 transition-transform" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Link Card */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-br from-emerald-600 to-teal-800 p-12 md:p-20 rounded-[5rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 shadow-[0_35px_60px_-15px_rgba(5,150,105,0.3)]"
        >
          <div className="space-y-6 text-center lg:text-left max-w-2xl">
            <h3 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">Pay Online</h3>
            <p className="opacity-90 text-xl font-medium leading-relaxed">Submit your exam fees instantly via bKash, Nagad, or Rocket using our secure payment gateway.</p>
          </div>
          <button className="whitespace-nowrap bg-white text-emerald-700 px-14 py-6 rounded-[2.5rem] font-black text-2xl hover:shadow-2xl hover:scale-105 transition-all uppercase tracking-widest">
            Payment Methods
          </button>
        </motion.div>
      </section>

    </div>
  );
};

export default ExamRegistrationClient;