"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Briefcase, Phone, Clock, ShieldCheck, UserCircle, 
  Headset, FileText, BadgeCheck, Building2, Settings
} from "lucide-react";

const OfficeStaffClient = ({ initialStaffs }) => {
  // Extract Hero Data from initialStaffs
  const heroInfo = initialStaffs.length > 0 ? {
    title: initialStaffs[0].heroTitle || "Our Dedicated Office Support",
    description: initialStaffs[0].heroDescription || "Administrative backbone of our Madrasah.",
    img: initialStaffs[0].heroImg || null
  } : {
    title: "Our Dedicated Office Support",
    description: "Madrasah-r administrative kaj-gulo shusthu bhabe sompadon korai amader lokkhyo.",
    img: null
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      
      {/* --- DYNAMIC HERO SECTION --- */}
      <section className="relative py-24 px-4 overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        {heroInfo.img && (
          <div className="absolute inset-0 z-0 opacity-10">
            <img src={heroInfo.img} alt="Background" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Building2 size={14} /> Administrative Backbone
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              {heroInfo.title}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-2xl">
              {heroInfo.description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-slate-500 font-medium"><BadgeCheck className="text-emerald-500" /> Professional Team</div>
              <div className="flex items-center gap-2 text-slate-500 font-medium"><Clock className="text-blue-500" /> 24/7 Management</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 grid grid-cols-2 gap-4 max-w-md">
            <div className="p-8 bg-emerald-600 rounded-3xl text-white shadow-xl flex flex-col items-center justify-center">
               <FileText size={40} className="mb-4" />
               <span className="font-bold">Records</span>
            </div>
            <div className="p-8 bg-slate-900 dark:bg-slate-800 rounded-3xl text-white shadow-xl flex flex-col items-center justify-center mt-8">
               <Settings size={40} className="mb-4" />
               <span className="font-bold">Support</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- STAFF GRID (100% DATABASE DRIVEN) --- */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 italic">Meet Our Office Team</h2>
          <div className="w-24 h-1.5 bg-emerald-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {initialStaffs.map((staff) => (
              <motion.div
                key={staff._id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col md:flex-row gap-8 items-center"
              >
                {/* Profile Image - 100% Restored Design */}
                <div className="w-40 h-40 flex-shrink-0 bg-slate-50 dark:bg-slate-800 rounded-3xl border-4 border-emerald-500/10 overflow-hidden relative">
                  {staff.staffImg ? (
                    <img src={staff.staffImg} alt={staff.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <UserCircle size={80} className="text-slate-300 m-auto h-full" />
                  )}
                </div>

                {/* Info Area */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">{staff.name}</h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold mb-4 flex items-center justify-center md:justify-start gap-2 text-sm">
                    <Briefcase size={16} /> {staff.role}
                  </p>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border-l-4 border-emerald-500 mb-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Responsibility</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {staff.responsibility}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-center md:justify-start gap-3 text-slate-600 dark:text-slate-400">
                      <Phone size={18} className="text-emerald-500" />
                      <span className="font-black tracking-wider text-sm">{staff.phone}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {initialStaffs.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-bold">No office staff profiles found.</div>
        )}
      </section>

      {/* --- RULES SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
           <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-6">
              <ShieldCheck className="text-blue-600" size={32} />
              <div><h4 className="font-bold dark:text-white text-sm">Secure Records</h4><p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">100% Privacy</p></div>
           </div>
           <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-6">
              <Clock className="text-purple-600" size={32} />
              <div><h4 className="font-bold dark:text-white text-sm">Punctual Service</h4><p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Zero Delay Policy</p></div>
           </div>
           <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-6">
              <Settings className="text-amber-600" size={32} />
              <div><h4 className="font-bold dark:text-white text-sm">Digitalized</h4><p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Fully Automated</p></div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default OfficeStaffClient;