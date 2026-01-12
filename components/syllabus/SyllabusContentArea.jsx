"use client";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronRight, Download, FileText } from "lucide-react";

export default function SyllabusContentArea({ activeClass }) {
  // Sample Logic: Active class er upor vitti kore subject list
  const subjects = [
    { name: "আল-কুরআন", code: "101", description: "সিফাত, তাজবিদ এবং নির্বাচিত সূরা হিফজ।" },
    { name: "আল-হাদিস", code: "102", description: "আরবাঈন নববী এবং হাদিসের পরিভাষা।" },
    { name: "আরবি সাহিত্য", code: "103", description: "নাহু এবং সরফ এর প্রাথমিক জ্ঞান।" },
    { name: "গণিত", code: "104", description: "পাটিগণিত ও বীজগণিতের প্রাথমিক ধারণা।" },
  ];

  return (
    <div className="py-16 container mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold dark:text-white">বই ও পাঠ্যসূচী: <span className="text-emerald-500">{activeClass}</span></h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="wait">
          {subjects.map((sub, idx) => (
            <motion.div
              key={sub.code}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all shadow-sm hover:shadow-2xl hover:shadow-emerald-500/5"
            >
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600">
                  <BookOpen size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Code: {sub.code}</span>
                    <button className="text-zinc-400 hover:text-emerald-500 transition-colors">
                      <Download size={20} />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold dark:text-white mb-2 group-hover:text-emerald-500 transition-colors">{sub.name}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                    {sub.description}
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-[10px] font-bold dark:text-zinc-400">PDF SYLLABUS</span>
                    <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-[10px] font-bold dark:text-zinc-400">LECTURE SHEET</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}