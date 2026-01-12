"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

import { 
  Search, Download, Printer, ShieldCheck, 
  FileText, Calendar, Hash, UserCircle2, 
  MapPin, Award, RefreshCcw, AlertCircle 
} from 'lucide-react';

const PublicResult = () => {
  // ব্যাকএন্ড API রাউট
  const API_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://madrasah-server.onrender.com/api") + "/public-results/search";

  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [searchData, setSearchData] = useState({
    exam: "দাখিল",
    year: "২০২৪",
    board: "বাংলাদেশ মাদ্রাসা শিক্ষা বোর্ড",
    roll: "",
    reg: ""
  });

  // ২০০০ থেকে ২০৪০ পর্যন্ত সাল জেনারেট
  const years = Array.from({ length: 41 }, (_, i) => (2000 + i).toString());

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResultData(null);

    try {
      const response = await axios.get(API_URL, {
        params: searchData // রোল, রেজি এবং বোর্ড প্যারামিটার হিসেবে পাঠানো হচ্ছে
      });

      if (response.data.success) {
        setResultData(response.data.data); // সফল হলে ডাটা সেট হবে
      }
    } catch (err) {
      setError(err.response?.data?.message || "ফলাফল পাওয়া যায়নি! তথ্যগুলো আবার চেক করুন।");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResultData(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-300 pb-20">
      
      {/* Top Banner */}
      <div className="bg-emerald-700 dark:bg-emerald-900 py-12 px-4 text-center text-white">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ShieldCheck className="mx-auto mb-4 opacity-80" size={48} />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">পাবলিক পরীক্ষা ফলাফল পোর্টাল</h1>
          <p className="mt-2 text-emerald-100 opacity-80 font-bold">মাদ্রাসা শিক্ষা বোর্ড ও ইসলামী আরবি বিশ্ববিদ্যালয়</p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-10">
        {!resultData ? (
          /* Search Form Card */
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-6 md:p-10 border border-gray-100 dark:border-slate-800"
          >
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl flex items-center gap-3 font-bold">
                <AlertCircle size={20} /> {error}
              </div>
            )}

            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputWrapper label="পরীক্ষার নাম (Exam)">
                  <select 
                    value={searchData.exam}
                    onChange={(e) => setSearchData({...searchData, exam: e.target.value})}
                    className="w-full p-4 rounded-xl border bg-gray-50 dark:bg-slate-800 dark:border-slate-700 outline-none"
                  >
                    <option>দাখিল</option>
                    <option>আলিম</option>
                    <option>ফাজিল ১ম বর্ষ</option>
                    <option>ফাজিল ২য় বর্ষ</option>
                    <option>ফাজিল ৩য় বর্ষ</option>
                    <option>কামিল</option>
                  </select>
                </InputWrapper>

                <InputWrapper label="পরীক্ষার বছর (Year)">
                  <select 
                    value={searchData.year}
                    onChange={(e) => setSearchData({...searchData, year: e.target.value})}
                    className="w-full p-4 rounded-xl border bg-gray-50 dark:bg-slate-800 dark:border-slate-700 outline-none"
                  >
                    {years.reverse().map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </InputWrapper>

                <InputWrapper label="শিক্ষা বোর্ড (Board)">
                  <select 
                    value={searchData.board}
                    onChange={(e) => setSearchData({...searchData, board: e.target.value})}
                    className="w-full p-4 rounded-xl border bg-gray-50 dark:bg-slate-800 dark:border-slate-700 outline-none"
                  >
                    <option>বাংলাদেশ মাদ্রাসা শিক্ষা বোর্ড</option>
                    <option>ইসলামী আরবি বিশ্ববিদ্যালয়</option>
                  </select>
                </InputWrapper>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputWrapper label="রোল নম্বর (Roll No)">
                  <input 
                    type="text" required placeholder="৬ ডিজিট রোল" 
                    value={searchData.roll}
                    onChange={(e) => setSearchData({...searchData, roll: e.target.value})}
                    className="w-full p-4 rounded-xl border bg-gray-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500 font-bold" 
                  />
                </InputWrapper>
                <InputWrapper label="রেজিস্ট্রেশন নম্বর (Reg No)">
                  <input 
                    type="text" required placeholder="১০ ডিজিট রেজিস্ট্রেশন" 
                    value={searchData.reg}
                    onChange={(e) => setSearchData({...searchData, reg: e.target.value})}
                    className="w-full p-4 rounded-xl border bg-gray-50 dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500 font-bold" 
                  />
                </InputWrapper>
              </div>

              <div className="pt-4">
                <button 
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl"
                >
                  {loading ? <RefreshCcw className="animate-spin" /> : <Search size={24} />}
                  {loading ? "ফলাফল খোঁজা হচ্ছে..." : "ফলাফল দেখুন"}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          /* Result Display Section */
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-emerald-500/20">
              
              {/* Marksheet Header */}
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-8 border-b dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-600 p-4 rounded-2xl text-white">
                    <Award size={40} />
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl font-black dark:text-white uppercase tracking-tight">{resultData.exam} পরীক্ষা {resultData.year}</h2>
                    <p className="text-emerald-700 dark:text-emerald-400 font-bold">{resultData.board}</p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-5xl font-black text-emerald-600 leading-none">{resultData.gpa}</div>
                  <div className="text-xs font-black uppercase tracking-widest text-gray-400 mt-2">GPA (Out of 5.00)</div>
                </div>
              </div>

              {/* Student Bio Grid */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <BioRow icon={<UserCircle2 size={18}/>} label="ছাত্রের নাম" value={resultData.name} />
                  <BioRow icon={<Hash size={18}/>} label="রোল নম্বর" value={resultData.roll} />
                  <BioRow icon={<FileText size={18}/>} label="রেজিস্ট্রেশন" value={resultData.reg} />
                </div>
                <div className="space-y-4 border-l dark:border-slate-800 md:pl-8">
                  <BioRow icon={<UserCircle2 size={18}/>} label="পিতার নাম" value={resultData.father} />
                  <BioRow icon={<UserCircle2 size={18}/>} label="মাতার নাম" value={resultData.mother} />
                  <BioRow icon={<MapPin size={18}/>} label="ইনস্টিটিউট" value={resultData.institute || "নির্ধারিত নয়"} />
                </div>
              </div>

              {/* Subject Wise Table */}
              <div className="px-8 pb-8">
                <div className="rounded-2xl border dark:border-slate-800 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-slate-800">
                      <tr>
                        <th className="p-4 text-left text-xs font-bold uppercase dark:text-gray-400">Subject Name</th>
                        <th className="p-4 text-center text-xs font-bold uppercase dark:text-gray-400">Marks</th>
                        <th className="p-4 text-right text-xs font-bold uppercase dark:text-gray-400">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-slate-800">
                      {resultData.subjects?.map((sub, index) => (
                        <MarkRow key={index} subject={sub.name} marks={sub.marks} grade={sub.grade} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 bg-gray-50 dark:bg-slate-800/50 flex flex-wrap gap-4 justify-between items-center">
                <button onClick={resetForm} className="text-gray-500 font-bold flex items-center gap-2 hover:text-emerald-600 transition-colors">
                  <RefreshCcw size={18} /> পুনরায় সার্চ করুন
                </button>
                <div className="flex gap-3">
                  <button onClick={() => window.print()} className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-all">
                    <Printer size={18} /> প্রিন্ট
                  </button>
                  <button className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg">
                    <Download size={18} /> মার্কশিট ডাউনলোড
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// হেল্পার কম্পোনেন্টসমূহ
const InputWrapper = ({ label, children }) => (
  <div className="space-y-2 text-left">
    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{label}</label>
    {children}
  </div>
);

const BioRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 group text-left">
    <div className="text-emerald-600 dark:text-emerald-500">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter leading-none mb-1">{label}</p>
      <p className="text-gray-800 dark:text-gray-100 font-bold uppercase">{value}</p>
    </div>
  </div>
);

const MarkRow = ({ subject, marks, grade }) => (
  <tr className="hover:bg-emerald-50/30 dark:hover:bg-emerald-900/5 transition-colors">
    <td className="p-4 font-bold text-gray-700 dark:text-gray-300 text-left uppercase text-sm">{subject}</td>
    <td className="p-4 text-center font-black text-emerald-600">{marks}</td>
    <td className="p-4 text-right font-black dark:text-white">{grade}</td>
  </tr>
);

export default PublicResult;