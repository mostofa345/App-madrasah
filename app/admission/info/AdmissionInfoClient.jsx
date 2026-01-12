"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Info, CheckCircle, Calendar, FileText, 
  ArrowRight, UserPlus, AlertCircle, HelpCircle
} from 'lucide-react';

const AdmissionInfoClient = ({ admissionData }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-20">
      
      {/* Header Section - Dynamic Background */}
      <section 
        className="relative py-32 text-white overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: admissionData.header.bgImage ? `linear-gradient(to bottom right, rgba(6, 78, 59, 0.9), rgba(19, 78, 74, 0.8)), url(${admissionData.header.bgImage})` : "" }}
      >
        {!admissionData.header.bgImage && <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-teal-900" />}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex p-4 bg-white/10 backdrop-blur-xl rounded-3xl mb-8 border border-white/20"
          >
            <UserPlus size={45} className="text-emerald-400" />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          >
            {admissionData.header.title} <span className="text-emerald-400">{admissionData.header.highlightText}</span>
          </motion.h1>
          <p className="text-emerald-100 text-lg md:text-2xl max-w-3xl mx-auto opacity-90 font-medium">
            {admissionData.header.description}
          </p>
        </div>
      </section>

      {/* Admission Status Cards */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {admissionData.departments?.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 hover:border-emerald-500 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                  item.status === 'Open' ? 'bg-emerald-100 text-emerald-600' : 
                  item.status === 'Closing Soon' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                }`}>
                  {item.status}
                </div>
                <Calendar size={20} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
              </div>
              <h4 className="text-2xl font-bold dark:text-white mb-3">{item.class}</h4>
              <p className="text-sm text-slate-500 mb-6 font-medium">শেষ তারিখ: {item.deadline}</p>
              <div className="pt-5 border-t dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-black text-slate-400 uppercase">{item.seats} Seats</span>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="bg-emerald-600 dark:bg-emerald-900 rounded-[4rem] p-8 md:p-16 text-white overflow-hidden relative shadow-2xl shadow-emerald-500/20">
          <div className="absolute right-0 bottom-0 opacity-5 -rotate-12 translate-x-10 translate-y-10">
            <FileText size={500} />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <FileText size={32} />
              </div>
              <h2 className="text-4xl md:text-6xl font-black leading-tight">ভর্তির জন্য প্রয়োজনীয় <br/>নথিপত্র</h2>
              <ul className="space-y-5">
                {admissionData.requirements?.map((text, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/5 backdrop-blur-sm"
                  >
                    <CheckCircle size={24} className="text-emerald-300 shrink-0" />
                    <span className="font-semibold text-lg">{text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950/40 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 shadow-3xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-amber-500/20 rounded-xl">
                   <AlertCircle size={32} className="text-amber-400" />
                </div>
                <h4 className="text-2xl font-bold">জরুরি নির্দেশিকা</h4>
              </div>
              <p className="text-lg leading-relaxed text-emerald-50/80 italic font-medium">
                "{admissionData.importantNote}"
              </p>
              <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                <div className="flex -space-x-3">
                   {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-emerald-500" />)}
                </div>
                <p className="text-sm font-bold text-emerald-300">ভর্তি হওয়া ছাত্রদের মতামত</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Callout */}
      <section className="py-20 text-center px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
          <HelpCircle className="mx-auto text-emerald-500 mb-8" size={60} />
          <h2 className="text-3xl md:text-4xl font-black dark:text-white mb-6">আপনার কি আরো জিজ্ঞাসা আছে?</h2>
          <p className="text-slate-500 text-lg mb-10">আমাদের সাপোর্ট টিম আপনাকে সঠিক তথ্য দিয়ে সহযোগিতা করতে প্রস্তুত।</p>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 rounded-2xl font-black shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all text-lg">
            হেল্পডেস্কের সাথে কথা বলুন
          </button>
        </div>
      </section>

    </div>
  );
};

export default AdmissionInfoClient;