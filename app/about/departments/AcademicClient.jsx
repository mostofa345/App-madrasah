"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap } from "lucide-react";

const AcademicClient = ({ data }) => {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 overflow-hidden text-left">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/10 blur-[120px] rounded-full"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              {data.hero?.title || "Academic Departments"}
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {data.hero?.subtitle}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {data.stats?.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl"
              >
                <h3 className="text-3xl font-black text-emerald-500 mb-1">{stat.val}</h3>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 gap-12">
        {data.departments?.map((dept, idx) => (
          <motion.div
            key={dept._id || idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative flex flex-col lg:flex-row bg-slate-900/30 border border-slate-800/50 rounded-[3rem] overflow-hidden hover:border-emerald-500/30 transition-all duration-500"
          >
            {/* Image Section */}
            <div className="lg:w-2/5 h-[350px] lg:h-auto relative overflow-hidden">
              <img
                src={dept.image}
                alt={dept.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Content Section */}
            <div className="lg:w-3/5 p-8 md:p-14 flex flex-col justify-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${dept.color || 'from-emerald-500 to-teal-600'} text-white text-xs font-black uppercase tracking-widest mb-6 shadow-lg`}>
                <GraduationCap size={14} />
                {dept.name}
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                {dept.title}
              </h2>
              
              <p className="text-slate-400 text-lg mb-8 leading-relaxed whitespace-pre-line">
                {dept.desc}
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {dept.features?.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-slate-300 font-medium">
                    <div className="p-1 bg-emerald-500/10 rounded-full">
                      <CheckCircle2 className="text-emerald-500" size={18} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-fit px-8 py-4 rounded-2xl bg-gradient-to-r ${dept.color || 'from-emerald-500 to-teal-600'} text-white font-black shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95`}>
                View Detailed Curriculum
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="px-4 mt-20">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
              Choose the right department for <br/> your child's bright future
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20">
                Admission Guide
              </button>
              <button className="bg-white/5 text-white border border-white/10 backdrop-blur-md px-10 py-5 rounded-2xl font-black hover:bg-white/10 transition-all">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademicClient;