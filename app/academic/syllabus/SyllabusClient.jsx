"use client";
import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { 
  BookOpen, CheckCircle2, GraduationCap, Layers, 
  X, Loader2, FileSpreadsheet, AlertCircle 
} from "lucide-react";

// Modal Component for Excel View
function SyllabusViewModal({ isOpen, onClose, data }) {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && data && data.fileType === 'xlsx') {
      fetchAndParseExcel();
    }
  }, [isOpen, data]);

  const fetchAndParseExcel = async () => {
    setLoading(true);
    setError(null);
    try {
      const serverUrl = process.env.NEXT_PUBLIC_API_BASE_URL.replace('/api', '');
      const formattedFilePath = data.fileUrl.replace(/\\/g, '/');
      const fileUrl = `${serverUrl}/${formattedFilePath}`;

      const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
      const workbook = XLSX.read(response.data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      setTableData(json || []);
    } catch (err) {
      console.error("Excel parse error:", err);
      setError("Syllabus file reading error.");
    } finally {
      setLoading(false);
    }
  };

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 text-left">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl overflow-hidden z-10 flex flex-col"
          >
            <div className="p-6 border-b dark:border-zinc-800 flex justify-between items-center bg-emerald-600 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg"><FileSpreadsheet size={24} /></div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wide">{data.subject}</h3>
                  <p className="text-emerald-100 text-xs font-medium">{data.bibag} — {data.className}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors"><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-auto p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950/50">
              {loading ? (
                <div className="h-64 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="animate-spin text-emerald-500" size={40} />
                  <p className="text-zinc-500 font-medium">Loading Syllabus...</p>
                </div>
              ) : error ? (
                <div className="h-64 flex flex-col items-center justify-center text-red-500 gap-3">
                  <AlertCircle size={40} />
                  <p className="font-medium text-center">{error}</p>
                </div>
              ) : tableData.length > 0 ? (
                <div className="overflow-hidden border dark:border-zinc-800 rounded-2xl shadow-sm bg-white dark:bg-zinc-900">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-100 dark:bg-zinc-800/50">
                        {tableData[0].map((header, i) => (
                          <th key={i} className="p-4 text-xs font-black text-emerald-700 dark:text-emerald-400 border-b dark:border-zinc-700 uppercase tracking-tighter">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="p-4 text-sm text-zinc-600 dark:text-zinc-400 border-b dark:border-zinc-800">{cell || "-"}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-zinc-500 gap-2 font-medium">
                  <AlertCircle size={40} className="opacity-20 text-emerald-500" />
                  <p>No valid data found in this file.</p>
                </div>
              )}
            </div>
            <div className="p-4 bg-white dark:bg-zinc-900 border-t dark:border-zinc-800 text-center">
               <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Madrasah Academic Portal • Read Only</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function SyllabusClient() {
  const [selectedBibag, setSelectedBibag] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bibagList = ["Nurani", "Evtedayee", "Dhakhil", "Alim", "Fazil"];
  const classData = {
    Nurani: ["Class 1", "Class 2", "Class 3"],
    Evtedayee: ["Class 4", "Class 5"],
    Dhakhil: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
    Alim: ["1st Year", "2nd Year"],
    Fazil: ["1st Year", "2nd Year", "3rd Year"],
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!selectedBibag || !selectedClass) { setSubjects([]); return; }
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/syllabus`, {
          params: { bibag: selectedBibag, className: selectedClass }
        });
        if (response.data.success) setSubjects(response.data.data);
      } catch (error) { console.error("Fetch Error:", error); } 
      finally { setIsLoading(false); }
    };
    fetchSubjects();
  }, [selectedBibag, selectedClass]);

  return (
    <div className="max-w-3xl mx-auto text-left">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tighter">
          Academic <span className="text-emerald-600 underline underline-offset-4">Syllabus</span>
        </h1>
        <p className="text-slate-500 font-medium italic">Official curriculum and study plan</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 md:p-10 rounded-[2.5rem] shadow-2xl border dark:border-zinc-800 space-y-10">
        <section>
          <div className="flex items-center gap-2 mb-5 text-emerald-600 font-black uppercase text-xs tracking-widest">
            <Layers size={18} /> <span>Step 01: Choose Bibag</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {bibagList.map((b) => (
              <button key={b} onClick={() => { setSelectedBibag(b); setSelectedClass(""); setSelectedSyllabus(null); }}
                className={`py-4 rounded-2xl border-2 transition-all font-bold ${selectedBibag === b ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 shadow-xl" : "border-slate-100 dark:border-zinc-800 text-slate-400"}`}
              >{b}</button>
            ))}
          </div>
        </section>

        <AnimatePresence>
          {selectedBibag && (
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-5 text-emerald-600 font-black uppercase text-xs tracking-widest">
                <GraduationCap size={18} /> <span>Step 02: Choose Class</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {classData[selectedBibag].map((c) => (
                  <button key={c} onClick={() => { setSelectedClass(c); setSelectedSyllabus(null); }}
                    className={`py-2 px-6 rounded-full border-2 transition-all font-bold ${selectedClass === c ? "bg-emerald-600 border-emerald-600 text-white shadow-lg" : "bg-slate-50 dark:bg-zinc-800 border-transparent text-zinc-500"}`}
                  >{c}</button>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedClass && (
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-5 text-emerald-600 font-black uppercase text-xs tracking-widest">
                <BookOpen size={18} /> <span>Step 03: Select Subject</span>
              </div>
              {isLoading ? (
                <div className="flex items-center justify-center p-10 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl"><Loader2 className="animate-spin text-emerald-500" size={32} /></div>
              ) : subjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {subjects.map((item) => (
                    <button key={item._id} onClick={() => setSelectedSyllabus(item)}
                      className={`p-5 rounded-2xl border-2 flex items-center justify-between transition-all ${selectedSyllabus?._id === item._id ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "border-slate-100 dark:border-zinc-800 text-zinc-500"}`}
                    >
                      <span className="font-bold uppercase tracking-tight">{item.subject}</span>
                      {selectedSyllabus?._id === item._id && <CheckCircle2 size={20} className="text-emerald-500" />}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-10 border-2 border-dashed border-zinc-800 rounded-[2rem] text-center text-zinc-500 font-medium">No syllabus found.</div>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        <motion.button whileHover={selectedSyllabus ? { scale: 1.01 } : {}} whileTap={selectedSyllabus ? { scale: 0.99 } : {}}
          disabled={!selectedSyllabus} onClick={() => setIsModalOpen(true)}
          className={`w-full py-6 rounded-2xl font-black text-xl transition-all tracking-[0.2em] shadow-2xl ${selectedSyllabus ? "bg-emerald-600 text-white hover:bg-emerald-500" : "bg-zinc-800 text-zinc-600 cursor-not-allowed opacity-50"}`}
        >VIEW SYLLABUS</motion.button>
      </div>

      <SyllabusViewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={selectedSyllabus} />
    </div>
  );
}