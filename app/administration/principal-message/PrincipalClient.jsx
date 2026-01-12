"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, Calendar, Mail, Phone, Quote } from "lucide-react";

const PrincipalClient = ({ data }) => {
  // এনিমেশন ভেরিয়েন্ট
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-tight">
            Principal's Message
          </h1>
          <div className="w-24 h-1.5 bg-emerald-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 sticky top-24"
          >
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
              <div className="relative h-96 w-full bg-emerald-100 dark:bg-emerald-900/20">
                <Image 
                  src={data.profileImage?.url || "/placeholder.jpg"} 
                  alt={data.name} 
                  fill 
                  className="object-cover" 
                />
              </div>
              
              <div className="p-8 text-center">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">{data.name}</h2>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-6 uppercase tracking-wider">{data.title}</p>
                
                <div className="space-y-4 text-left border-t border-slate-100 dark:border-slate-800 pt-6">
                  <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg text-emerald-600"><Award size={20} /></div>
                    <span className="text-sm font-medium">{data.education}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg text-emerald-600"><Calendar size={20} /></div>
                    <span className="text-sm font-medium">Experience: {data.experience}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg text-emerald-600"><Mail size={20} /></div>
                    <span className="text-sm font-medium truncate">{data.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Message Content */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 space-y-8"
          >
            <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-900 p-8 md:p-14 rounded-[3rem] shadow-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
              <Quote className="absolute top-10 left-10 text-emerald-500/5 dark:text-emerald-500/10 w-32 h-32 -z-0" />
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-slate-800 dark:text-slate-100 italic leading-relaxed">
                  "{data.salam}"
                </h3>
                
                <div className="space-y-6 text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-300 text-justify whitespace-pre-line font-medium">
                  {data.mainMessage}
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                   <div>
                      <p className="font-serif text-2xl text-slate-800 dark:text-white italic">{data.closingGreeting}</p>
                      {data.signatureImage?.url && (
                        <div className="mt-4 h-20 w-48 relative">
                          <Image 
                            src={data.signatureImage?.url} 
                            alt="Signature" 
                            fill 
                            className="object-contain object-left dark:invert opacity-90" 
                          />
                        </div>
                      )}
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Blocks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fadeInUp} className="bg-emerald-600 p-8 rounded-[2rem] text-white shadow-lg shadow-emerald-500/20">
                <BookOpen className="mb-4 w-12 h-12 opacity-80" />
                <h4 className="text-2xl font-black mb-3">Our Vision</h4>
                <p className="text-emerald-50 leading-relaxed font-medium">{data.vision}</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border-2 border-emerald-100 dark:border-emerald-900/30 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                   <div className="p-4 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl text-emerald-600">
                      <Phone size={28} />
                   </div>
                   <h4 className="text-2xl font-black text-slate-800 dark:text-white">Contact Info</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-600 dark:text-slate-400 font-bold">Emergency: <span className="text-emerald-600">{data.contactNumber}</span></p>
                  <p className="text-slate-500 dark:text-slate-400 font-medium italic">Office Time: {data.officeTime}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalClient;