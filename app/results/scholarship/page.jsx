"use client";
import React from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, Calendar, ExternalLink, GraduationCap, MapPin } from "lucide-react";

const ScholarshipPage = () => {
  // কাল্পনিক ডাটা (এটি পরে ডাটাবেজ থেকে আসবে)
  const scholarshipHolders = [
    {
      id: 1,
      name: "আব্দুল্লাহ আল মাহমুদ",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
      university: "ইসলামিক ইউনিভার্সিটি অব মদিনা",
      location: "মদিনা, সৌদি আরব",
      scholarship: "ফুল ফ্রি কিংডম স্কলারশিপ",
      year: "২০২৪",
      subject: "কুল্লিয়াতুল হাদিস",
    },
    {
      id: 2,
      name: "মুহাম্মদ রাইয়ান",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
      university: "আল-আযহার ইউনিভার্সিটি",
      location: "কায়রো, মিশর",
      scholarship: "প্রেসিডেন্সিয়াল স্কলারশিপ",
      year: "২০২৩",
      subject: "উসুলুদ দ্বীন",
    },
    {
      id: 3,
      name: "হাসানুল বান্না",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
      university: "ঢাকা বিশ্ববিদ্যালয়",
      location: "ঢাকা, বাংলাদেশ",
      scholarship: "মেধা বৃত্তি (বোর্ড)",
      year: "২০২৪",
      subject: "আরবি সাহিত্য",
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 mb-4"
          >
            <Award size={32} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white mb-4"
          >
            আমাদের <span className="text-emerald-600">গর্বিত</span> ছাত্ররা
          </motion.h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            দেশ ও বিদেশের বিভিন্ন নামকরা বিশ্ববিদ্যালয়ে স্কলারশিপ প্রাপ্ত আমাদের মেধাবী ছাত্রদের তালিকা।
          </p>
        </div>

        {/* Scholarship Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarshipHolders.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 relative group"
            >
              {/* Top Banner Decor */}
              <div className="h-24 bg-gradient-to-r from-emerald-500 to-teal-600" />
              
              {/* Profile Image */}
              <div className="relative -mt-12 px-8">
                <div className="w-24 h-24 rounded-2xl border-4 border-white dark:border-slate-900 overflow-hidden shadow-lg bg-white">
                  <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 pt-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {student.name}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 text-sm mt-1">
                    <GraduationCap size={16} /> {student.scholarship}
                  </p>
                </div>

                <div className="space-y-3 border-t dark:border-slate-800 pt-4">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg"><BookOpen size={16}/></div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-60">বিশ্ববিদ্যালয়</p>
                      <p className="text-sm font-semibold">{student.university}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg"><MapPin size={16}/></div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-60">অবস্থান</p>
                      <p className="text-sm font-semibold">{student.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg"><Calendar size={16}/></div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-60">বছর</p>
                      <p className="text-sm font-semibold">{student.year}</p>
                    </div>
                  </div>
                </div>

                {/* Profile Link Button */}
                <button className="w-full mt-6 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white dark:text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all group-hover:shadow-lg">
                  বিস্তারিত প্রোফাইল <ExternalLink size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-8 rounded-3xl bg-emerald-600 text-white text-center shadow-2xl shadow-emerald-200 dark:shadow-none"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">আপনিও কি স্কলারশিপ পেয়েছেন?</h2>
          <p className="mb-6 opacity-90">আপনার অর্জন আমাদের জানান এবং আমাদের পোর্টালের অংশ হোন।</p>
          <button className="bg-white text-emerald-600 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-all shadow-lg">
            আবেদন ফরম পূরণ করুন
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default ScholarshipPage;