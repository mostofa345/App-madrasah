"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { 
  BookOpen, 
  Mail, 
  Phone, 
  GraduationCap, 
  Award, 
  Search, 
  Filter, 
  Facebook, 
  Twitter, 
  Linkedin,
  Star,
  CheckCircle,
  Users
} from "lucide-react";

// Mock Data for Teachers
const teachersData = [
  {
    id: 1,
    name: "Maulana Hafiz Ahmed",
    designation: "Head of Arabic Department",
    category: "Arabic",
    qualification: "M.A in Islamic Studies (Al-Azhar)",
    experience: "12 Years",
    phone: "+880 1711-223344",
    email: "ahmed.arabic@madrasah.edu",
    image: null,
    speciality: "Fiqh & Hadith"
  },
  {
    id: 2,
    name: "Mufti Abdullah Al-Mamun",
    designation: "Senior Hifz Teacher",
    category: "Hifz",
    qualification: "Hafez-e-Quran, Dawra-e-Hadith",
    experience: "10 Years",
    phone: "+880 1812-556677",
    email: "mamun.hifz@madrasah.edu",
    image: null,
    speciality: "Tajweed & Qirat"
  },
  {
    id: 3,
    name: "Professor Kamal Hossain",
    designation: "General Education Coordinator",
    category: "General",
    qualification: "M.Sc in Mathematics (DU)",
    experience: "8 Years",
    phone: "+880 1913-889900",
    email: "kamal.math@madrasah.edu",
    image: null,
    speciality: "Advanced Mathematics"
  },
  {
    id: 4,
    name: "Qari Shoriful Islam",
    designation: "Nurani Section Head",
    category: "Nurani",
    qualification: "Nurani Muallim Trained",
    experience: "15 Years",
    phone: "+880 1614-112233",
    email: "shorif.nurani@madrasah.edu",
    image: null,
    speciality: "Child Psychology & Makhraj"
  },
  // Add more teachers here to reach the scale you need
];

const categories = ["All", "Arabic", "Hifz", "Nurani", "General"];

const TeachingStaff = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeachers = teachersData.filter(teacher => {
    const matchesCategory = activeCategory === "All" || teacher.category === activeCategory;
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          teacher.designation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500 pb-20">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-slate-900/80 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1523050853064-db72f10745f9?q=80&w=2070')] bg-cover bg-center" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold tracking-widest uppercase mb-6 border border-emerald-500/30 backdrop-blur-md">
              Illuminating Minds
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Our Expert <span className="text-emerald-400">Teaching</span> Staff
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              Amader madrasah-r 17-ti class-er jonno niyojito achen desh-shera ulamaye keram ebong dhoiryoshil shikhokmondoli, jara protyek shikkharthike deeni o duniyabi shikkhay parodorshi kore tulten protishrutiboddho.
            </p>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-30">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-3 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-6 md:p-10 text-center">
              <div>
                <h3 className="text-3xl font-black text-emerald-600">50+</h3>
                <p className="text-sm text-slate-500 font-bold uppercase">Teachers</p>
              </div>
              <div className="border-x border-slate-100 dark:border-slate-800">
                <h3 className="text-3xl font-black text-blue-600">12+</h3>
                <p className="text-sm text-slate-500 font-bold uppercase">PhD/Ijazah</p>
              </div>
              <div>
                <h3 className="text-3xl font-black text-purple-600">17</h3>
                <p className="text-sm text-slate-500 font-bold uppercase">Departments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FILTER & SEARCH SECTION --- */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800">
            
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by name or subject..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                    activeCategory === cat 
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- TEACHERS GRID --- */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredTeachers.map((teacher) => (
                <motion.div
                  layout
                  key={teacher.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  {/* Teacher Image Area */}
                  <div className="relative h-64 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 group-hover:scale-110 transition-transform duration-700">
                      <Users size={80} strokeWidth={1} />
                    </div>
                    {/* <img src={teacher.image || "/staff-placeholder.jpg"} className="w-full h-full object-cover" /> */}
                    
                    {/* Hover Social Overlay */}
                    <div className="absolute inset-0 bg-emerald-600/60 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="p-3 bg-white rounded-full text-emerald-600 hover:bg-emerald-50 transition-colors"><Facebook size={20}/></button>
                      <button className="p-3 bg-white rounded-full text-emerald-600 hover:bg-emerald-50 transition-colors"><Twitter size={20}/></button>
                      <button className="p-3 bg-white rounded-full text-emerald-600 hover:bg-emerald-50 transition-colors"><Linkedin size={20}/></button>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-600 border border-emerald-100 dark:border-emerald-800">
                      {teacher.category} Section
                    </div>
                  </div>

                  {/* Teacher Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 transition-colors">
                      {teacher.name}
                    </h3>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-tighter">
                      {teacher.designation}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                        <GraduationCap size={16} className="text-emerald-500" />
                        <span className="line-clamp-1">{teacher.qualification}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                        <Award size={16} className="text-blue-500" />
                        <span>{teacher.experience} Exp.</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                        <Star size={16} className="text-amber-500" />
                        <span>Expert in {teacher.speciality}</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-50 dark:border-slate-800 grid grid-cols-2 gap-2">
                       <a href={`tel:${teacher.phone}`} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-600 hover:text-white transition-all font-bold text-xs">
                          <Phone size={14} /> Call
                       </a>
                       <a href={`mailto:${teacher.email}`} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-all font-bold text-xs">
                          <Mail size={14} /> Email
                       </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredTeachers.length === 0 && (
            <div className="text-center py-20">
              <BookOpen size={64} className="mx-auto text-slate-200 mb-4" />
              <h3 className="text-2xl font-bold text-slate-400">No teachers found in this category.</h3>
            </div>
          )}
        </div>
      </section>

      {/* --- WHY OUR TEACHERS SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
         <div className="grid lg:grid-cols-2 gap-12 items-center bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-0" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-8">
                Why Our Teachers are <span className="text-emerald-600">Special?</span>
              </h2>
              <div className="space-y-6">
                {[
                  { t: "Deep Islamic Knowledge", d: "Dawra-e-Hadith ebong bishisto Al-Azhar graduate ulamaye keram." },
                  { t: "Child Psychology Expert", d: "Bachader nurani pora shohoje bujhate bishheshvabe proshikkhito." },
                  { t: "Modern Teaching Tools", d: "Digital board ebong audio-visual method e Hifz porano hoy." },
                  { t: "Moral Mentorship", d: "Shudhu shikkhai noy, amader teacher-ra bachader charitrik unnoyoneo mononibesh koren." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1"><CheckCircle className="text-emerald-500" size={24} /></div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{item.t}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4">
               <div className="space-y-4">
                 <div className="h-48 rounded-3xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                    <BookOpen size={50} className="text-emerald-600" />
                 </div>
                 <div className="h-64 rounded-3xl bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1577896851231-70ef1460371e?q=80&w=2070" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Teaching" />
                 </div>
               </div>
               <div className="space-y-4 pt-8">
                  <div className="h-64 rounded-3xl bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Teaching" />
                  </div>
                  <div className="h-48 rounded-3xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <GraduationCap size={50} className="text-blue-600" />
                 </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default TeachingStaff;