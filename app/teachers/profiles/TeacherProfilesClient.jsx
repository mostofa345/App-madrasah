"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  User, BookOpen, GraduationCap, Star, Search, 
  ArrowRight, Sparkles, Award, Calendar, Layers
} from "lucide-react";

const TeacherProfilesClient = ({ initialTeachers }) => {
  const [selectedDept, setSelectedDept] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const heroInfo = initialTeachers.length > 0 ? {
    title: initialTeachers[0].heroTitle || "The Faces of Excellence",
    description: initialTeachers[0].heroDescription || "Amader shikhokmondoli.",
    img: initialTeachers[0].heroImg || "https://images.unsplash.com/photo-1576489922094-2cfe89fb1733"
  } : {
    title: "The Faces of Excellence",
    description: "Amader shikhokmondoli.",
    img: "https://images.unsplash.com/photo-1576489922094-2cfe89fb1733"
  };

  const departments = ["All", "Nurani", "Ibtedayee", "Dakhil", "Alim", "Fazil"];

  const filteredTeachers = initialTeachers.filter(t => {
    const matchDept = selectedDept === "All" || t.department === selectedDept;
    const matchSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-50 dark:to-[#020617] z-10" />
          <img 
            src={heroInfo.img} 
            className="w-full h-full object-cover bg-center" 
            alt="Hero Background"
          />
        </div>

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 px-6 py-2 rounded-full text-emerald-400 font-black text-xs uppercase tracking-widest mb-8">
              <Sparkles size={16} /> Knowledge & Guidance
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter">
              {heroInfo.title}
            </h1>
            <p className="text-xl text-slate-200 font-light leading-relaxed max-w-3xl mx-auto">
              {heroInfo.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- FILTERS --- */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-30">
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 shadow-2xl border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col lg:flex-row gap-8 justify-between items-center">
            <div className="flex flex-wrap justify-center gap-3">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all ${
                    selectedDept === dept 
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search teacher..."
                className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- TEACHER GRID --- */}
      <main className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {filteredTeachers.map((teacher) => (
              <motion.div
                key={teacher._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:border-emerald-500/20 transition-all duration-500">
                  
                  {/* Top Section / Cover */}
                  <div className="h-40 bg-gradient-to-br from-emerald-100 to-blue-50 dark:from-emerald-900/20 dark:to-slate-800 relative">
                    <div className="absolute -bottom-10 left-8">
                       <div className="w-24 h-24 rounded-3xl bg-white dark:bg-slate-800 shadow-xl border-4 border-white dark:border-slate-900 overflow-hidden">
                          <img src={teacher.profileImg} className="w-full h-full object-cover" alt={teacher.name} />
                       </div>
                    </div>
                    <div className="absolute top-6 right-8">
                       <div className="px-4 py-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-full text-[10px] font-black uppercase text-emerald-600 border border-emerald-100 dark:border-emerald-800">
                          {teacher.department}
                       </div>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="p-8 pt-16">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 transition-colors">
                      {teacher.name}
                    </h3>
                    <p className="text-emerald-500 text-xs font-bold uppercase tracking-widest mb-4">
                      {teacher.title}
                    </p>
                    
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold mb-4">
                      <GraduationCap size={16} className="text-emerald-500" />
                      {teacher.qualification}
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-6">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Expertise</p>
                      <p className="text-sm text-slate-700 dark:text-slate-200 font-medium line-clamp-2">
                        {teacher.expertise}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                       <div className="flex items-center gap-2">
                          <Calendar size={14} /> Joined: {teacher.joinedDate}
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredTeachers.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-bold">No teachers found in this department.</div>
        )}
      </main>

      {/* --- FOOTER STATS --- */}
      <section className="max-w-7xl mx-auto px-4 pb-32">
        <div className="bg-slate-900 dark:bg-emerald-950 rounded-[4rem] p-12 md:p-20 text-center">
           <h2 className="text-4xl md:text-6xl font-black text-white mb-16">Faculty <span className="text-emerald-400">Overview</span></h2>
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-white">
              <div><Layers className="mx-auto mb-4 text-emerald-400" size={40}/><h4 className="text-2xl font-bold">17</h4><p className="text-xs text-slate-400">Sections</p></div>
              <div><Award className="mx-auto mb-4 text-emerald-400" size={40}/><h4 className="text-2xl font-bold">25+</h4><p className="text-xs text-slate-400">Scholars</p></div>
              <div><BookOpen className="mx-auto mb-4 text-emerald-400" size={40}/><h4 className="text-2xl font-bold">Deeni</h4><p className="text-xs text-slate-400">Education</p></div>
              <div><Star className="mx-auto mb-4 text-emerald-400" size={40}/><h4 className="text-2xl font-bold">100%</h4><p className="text-xs text-slate-400">Moral Goal</p></div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherProfilesClient;