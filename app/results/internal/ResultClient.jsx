"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

import { 
  BookOpen, Download, GraduationCap, Printer, 
  Search, User, Layers, Hash, FileText, 
  UserCircle, Loader2, AlertCircle 
} from "lucide-react";

const ResultClient = () => {
  const API_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://madrasah-server.onrender.com/api") + "/internal-results/search";

  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [studentResult, setStudentResult] = useState(null);
  
  const [searchData, setSearchData] = useState({
    bibag: "",
    class: "",
    roll: ""
  });

  const classData = {
    "নূরানী": ["১ম শ্রেণী", "২য় শ্রেণী", "৩য় শ্রেণী"],
    "ইবতেদায়ী": ["৪র্থ শ্রেণী", "৫ম শ্রেণী"],
    "দাখিল": ["৬ষ্ঠ শ্রেণী", "৭ম শ্রেণী", "৮ম শ্রেণী", "৯ম শ্রেণী", "১০ম শ্রেণী"],
    "আলিম": ["১ম বর্ষ (একাদশ)", "২য় বর্ষ (দ্বাদশ)"],
    "ফাজিল": ["১ম বর্ষ", "২য় বর্ষ", "৩য় বর্ষ"]
  };

  useEffect(() => {
    setSearchData(prev => ({ ...prev, class: "" }));
  }, [searchData.bibag]);

  const calculateFinalGPA = (subjects) => {
    if (!subjects || subjects.length === 0) return "0.00";
    const totalPoints = subjects.reduce((sum, s) => sum + s.point, 0);
    const gpa = totalPoints / subjects.length;
    return gpa.toFixed(2);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShowResult(false);
    
    try {
      const response = await axios.get(API_URL, {
        params: {
          bibag: searchData.bibag,
          className: searchData.class,
          rollNo: searchData.roll
        }
      });

      if (response.data) {
        setStudentResult(response.data);
        setShowResult(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "ফলাফল পাওয়া যায়নি! তথ্যগুলো আবার চেক করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] p-4 md:p-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        {/* হেডার */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-block p-3 bg-emerald-500/10 rounded-2xl mb-4 border border-emerald-500/20">
            <GraduationCap className="text-emerald-600 dark:text-emerald-500" size={40} />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white mb-2 font-bangla">
            ছনখোলা আলামিয়া ইসলামিয়া <span className="text-emerald-600">ফাজিল মাদ্রাসা</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium font-bangla">অভ্যন্তরীণ পরীক্ষার ফলাফল ও অনলাইন মার্কশিট</p>
        </motion.div>

        {/* সার্চ ফরম */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 mb-12">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bangla">
                <Layers size={16} className="text-emerald-500" /> বিভাগ নির্বাচন
              </label>
              <select required value={searchData.bibag} onChange={(e) => setSearchData({...searchData, bibag: e.target.value})} className="w-full p-4 rounded-2xl border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none appearance-none font-bangla">
                <option value="">বিভাগ নির্বাচন করুন</option>
                {Object.keys(classData).map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bangla">
                <BookOpen size={16} className="text-emerald-500" /> ক্লাস/বর্ষ
              </label>
              <select required disabled={!searchData.bibag} value={searchData.class} onChange={(e) => setSearchData({...searchData, class: e.target.value})} className="w-full p-4 rounded-2xl border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none disabled:opacity-50 font-bangla">
                <option value="">ক্লাস নির্বাচন করুন</option>
                {searchData.bibag && classData[searchData.bibag].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bangla">
                <Hash size={16} className="text-emerald-500" /> রোল নম্বর
              </label>
              <input type="number" placeholder="Ex: 101" required value={searchData.roll} className="w-full p-4 rounded-2xl border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none" onChange={(e) => setSearchData({...searchData, roll: e.target.value})} />
            </div>

            <div className="flex items-end">
              <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl shadow-emerald-500/20 font-bangla">
                {loading ? <Loader2 className="animate-spin" size={20} /> : <><Search size={20} /> ফলাফল দেখুন</>}
              </button>
            </div>
          </form>
          {error && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 font-bold font-bangla">
               <AlertCircle size={20} /> {error}
            </motion.div>
          )}
        </motion.div>

        {/* মার্কশিট এরিয়া */}
        <AnimatePresence>
          {showResult && studentResult && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-10 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 rotate-12"><GraduationCap size={200} /></div>
                <h2 className="text-3xl md:text-4xl font-black mb-2 font-bangla">একাডেমিক ট্রান্সক্রিপ্ট</h2>
                <p className="text-emerald-50/80 text-lg uppercase tracking-widest font-bold">Annual Examination - 2025</p>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                   <DetailBox icon={<UserCircle className="text-emerald-500"/>} label="নাম" value={studentResult.studentName} />
                   <DetailBox icon={<User className="text-blue-500"/>} label="পিতার নাম" value={studentResult.fatherName} />
                   <DetailBox icon={<User className="text-pink-500"/>} label="মাতার নাম" value={studentResult.motherName} />
                   <DetailBox icon={<Hash className="text-orange-500"/>} label="রোল নম্বর" value={studentResult.rollNo} />
                   <DetailBox icon={<Layers className="text-purple-500"/>} label="বিভাগ" value={studentResult.bibag} />
                   <DetailBox icon={<BookOpen className="text-teal-500"/>} label="ক্লাস/বর্ষ" value={studentResult.className} />
                </div>

                <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden mb-10">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider font-bangla">
                        <th className="p-6 font-bold">বিষয় (Subject Name)</th>
                        <th className="p-6 font-bold text-center">প্রাপ্ত নম্বর</th>
                        <th className="p-6 font-bold text-center">লেটার গ্রেড</th>
                        <th className="p-6 font-bold text-right">গ্রেড পয়েন্ট</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-slate-800">
                      {studentResult.subjects.map((item, i) => (
                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-emerald-500/5 transition-colors">
                          <td className="p-6 font-bold text-slate-700 dark:text-slate-200">{item.name}</td>
                          <td className="p-6 text-center font-black text-emerald-600">{item.marks}</td>
                          <td className="p-6 text-center font-bold dark:text-white">{item.grade}</td>
                          <td className="p-6 text-right font-black text-slate-800 dark:text-white">{item.point.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-8 bg-emerald-600 rounded-[2rem] text-white">
                   <div className="flex items-center gap-4">
                      <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md"><FileText size={32} /></div>
                      <div>
                        <p className="text-emerald-100 text-sm font-bold uppercase font-bangla">সর্বমোট প্রাপ্ত নম্বর</p>
                        <h3 className="text-3xl font-black">
                           {studentResult.subjects.reduce((sum, s) => sum + s.marks, 0)} / {studentResult.subjects.length * 100}
                        </h3>
                      </div>
                   </div>
                   <div className="h-12 w-[2px] bg-white/20 hidden md:block"></div>
                   <div className="text-center md:text-right">
                      <p className="text-emerald-100 text-sm font-bold uppercase font-bangla">ফলাফল (CGPA)</p>
                      <h3 className="text-4xl font-black tracking-tighter uppercase">
                        GPA {studentResult.totalGPA || calculateFinalGPA(studentResult.subjects)}
                      </h3>
                   </div>
                </div>

                <div className="mt-12 flex flex-wrap gap-4 justify-center">
                  <button className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-200 border dark:border-slate-700 font-bangla">
                    <Printer size={20} /> প্রিন্ট করুন
                  </button>
                  <button className="flex items-center gap-3 bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all font-bangla">
                    <Download size={20} /> মার্কশিট ডাউনলোড
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const DetailBox = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 p-5 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800">
    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">{icon}</div>
    <div>
      <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1 font-bangla">{label}</p>
      <p className="font-bold text-slate-800 dark:text-white leading-tight font-bangla">{value || "---"}</p>
    </div>
  </div>
);

export default ResultClient;