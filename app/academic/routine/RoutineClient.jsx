"use client";
import React, { useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { 
  BookOpen, Clock, Search, User, X, 
  Loader2, AlertCircle, CalendarDays 
} from "lucide-react";

export default function RoutineClient() {
  const [selectedBibag, setSelectedBibag] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [routine, setRoutine] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const bibagData = {
    Nurani: ["Class 1", "Class 2", "Class 3"],
    Evtedayee: ["Class 4", "Class 5"],
    Dhakhil: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
    Alim: ["1st Year", "2nd Year"],
    Fazil: ["1st Year", "2nd Year", "3rd Year"],
  };

  const fetchRoutine = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/routines`, 
        { params: { bibag: selectedBibag, className: selectedClass } }
      );
      
      if (response.data.success && response.data.data.length > 0) {
        setRoutine(response.data.data[0]);
        setShowModal(true);
      } else {
        setError("Ei class-er jonno kono routine pawa jayni.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Server connection somossa! Abar chesta korun.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBibag && selectedClass) {
      fetchRoutine();
    } else {
      alert("Please select both Bibag and Class");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <CalendarDays className="mx-auto text-emerald-500 mb-4" size={48} />
        <h1 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-tight">Academic Routine</h1>
        <p className="text-slate-600 dark:text-slate-400">Select your department and class to view the routine</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-3 text-slate-500 uppercase tracking-widest text-left">Select Department</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.keys(bibagData).map((bibag) => (
                <button
                  key={bibag}
                  type="button"
                  onClick={() => { setSelectedBibag(bibag); setSelectedClass(""); setError(""); }}
                  className={`py-3 px-4 rounded-xl border-2 font-bold transition-all ${
                    selectedBibag === bibag 
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600" 
                    : "border-slate-100 dark:border-zinc-800 hover:border-emerald-300 dark:text-slate-400"
                  }`}
                >
                  {bibag}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {selectedBibag && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-bold mb-3 text-slate-500 uppercase tracking-widest text-left">Select Class</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {bibagData[selectedBibag].map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => { setSelectedClass(cls); setError(""); }}
                      className={`py-2 px-3 rounded-lg border font-medium transition-all ${
                        selectedClass === cls 
                        ? "bg-emerald-600 text-white border-transparent" 
                        : "bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 dark:text-slate-300"
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-2 text-sm border border-red-100 dark:border-red-900/30">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-800 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-none transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Search size={20} />} 
            {isLoading ? "FETCHING..." : "VIEW ROUTINE"}
          </motion.button>
        </form>
      </motion.div>

      <AnimatePresence>
        {showModal && routine && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 text-left">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-white/10"
            >
              <div className="p-8 border-b dark:border-zinc-800 flex justify-between items-center bg-emerald-600 text-white">
                <div>
                  <h2 className="text-3xl font-black italic">{selectedBibag} - {selectedClass}</h2>
                  <p className="opacity-80 font-medium">Daily Academic Class Routine</p>
                </div>
                <button onClick={() => setShowModal(false)} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"><X size={24} /></button>
              </div>

              <div className="p-6 overflow-y-auto bg-slate-50 dark:bg-slate-950">
                <div className="grid gap-4">
                  {routine.routineData?.map((item, index) => (
                    <motion.div
                      key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                      className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-emerald-500 transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-4 mb-2 md:mb-0 min-w-[200px]">
                        <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600"><Clock size={22} /></div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.Day || "TIME"}</p>
                          <p className="font-bold text-slate-800 dark:text-slate-200">{item.Time || item.time}</p>
                        </div>
                      </div>
                      <div className="flex-1 md:mx-10 mb-2 md:mb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <BookOpen size={18} className="text-emerald-500" />
                          <p className="font-black text-lg text-slate-900 dark:text-white uppercase">{item.Subject || item.subject}</p>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <User size={16} />
                          <span className="font-medium italic">{item.Teacher || item.teacher}</span>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <span className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 text-slate-400 text-[10px] font-black rounded-lg uppercase tracking-widest border border-slate-200 dark:border-zinc-700">Class Period</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-zinc-900 border-t dark:border-zinc-800 text-center">
                <p className="text-xs text-slate-400 font-medium">This routine is automatically generated from official records.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}