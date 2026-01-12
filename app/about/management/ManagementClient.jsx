"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Award, Briefcase, Mail, 
  Phone, Quote, ShieldCheck, Users 
} from "lucide-react";

const ManagementClient = ({ data }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-20 text-left">
      
      {/* 1. Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000" 
            alt="Management Hero" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            {data.hero?.title || "Management Board"}
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
            {data.hero?.subtitle}
          </p>
        </motion.div>
      </section>

      {/* 2. Board of Trustees Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-800 dark:text-white">Board of Trustees</h2>
              <p className="text-emerald-600 font-bold tracking-widest uppercase text-xs mt-1">Founding Leadership</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.trustees?.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 group hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img 
                    src={member.image || `https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                </div>
                <div className="p-8 text-center relative">
                  <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-emerald-500 font-bold text-sm mb-6">{member.role}</p>
                  
                  <div className="flex flex-col gap-3 items-center pt-6 border-t border-slate-100 dark:border-slate-800">
                    {member.email && (
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                        <Mail size={16} className="text-emerald-500" />
                        {member.email}
                      </div>
                    )}
                    {member.phone && (
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                        <Phone size={16} className="text-emerald-500" />
                        {member.phone}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Management Committee Section */}
      <section className="py-20 bg-slate-100 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-12 justify-center text-center flex-col">
            <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/20">
              <Users size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-800 dark:text-white">Executive Committee</h2>
              <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mt-1">Management Team</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.committee?.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all shadow-sm group"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                  <Briefcase size={24} />
                </div>
                <h4 className="text-lg font-black text-slate-800 dark:text-white">{member.name}</h4>
                <p className="text-blue-600 text-xs font-black mt-1 uppercase">{member.role}</p>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                   <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{member.info}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Footer Quote Section */}
      {data.footerQuote && (
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="relative p-12 rounded-[4rem] bg-emerald-500/5 border-2 border-dashed border-emerald-200 dark:border-emerald-900/30"
            >
              <Quote className="absolute -top-6 left-1/2 -translate-x-1/2 text-emerald-500 bg-slate-50 dark:bg-slate-950 px-4" size={48} />
              <p className="text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-200 italic leading-snug">
                "{data.footerQuote}"
              </p>
            </motion.div>
          </div>
        </section>
      )}

    </div>
  );
};

export default ManagementClient;