"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  CalendarDays, MapPin, Clock, Users, BellRing, 
  ArrowRight, Star, Mic2, Trophy, HeartHandshake 
} from "lucide-react";

const UpcomingEventsClient = ({ hero, eventsList }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500 pb-32 overflow-hidden">
      
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <motion.div 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-slate-950/90 to-[#020617] z-10" />
          <img 
            src={hero.heroBgImage?.url} 
            className="w-full h-full object-cover blur-[1px]" 
            alt="Chonkhola Madrasah Events" 
          />
        </motion.div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-500/20 backdrop-blur-xl rounded-full text-emerald-400 text-xs font-black uppercase tracking-[0.3em] mb-8 border border-emerald-500/30">
              <BellRing size={16} className="animate-pulse" /> {hero.heroBadgeText}
            </span>
            <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-none">
              {hero.heroTitle} <span className="text-emerald-500">{hero.heroHighlightText}</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light italic">
              "{hero.heroBio}"
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-emerald-500/50"
        >
          <div className="w-6 h-10 border-2 border-emerald-500/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-emerald-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* --- EVENT LIST SECTION --- */}
      <main className="max-w-7xl mx-auto px-4 -mt-24 relative z-30">
        <div className="space-y-16">
          <AnimatePresence>
            {eventsList.map((event, index) => (
              <motion.div
                key={event._id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[4rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col lg:flex-row hover:border-emerald-500/40 transition-all duration-500"
              >
                <div className={`lg:w-80 bg-gradient-to-br ${event.gradient || 'from-emerald-600 to-teal-700'} p-12 text-white flex flex-col justify-center items-center text-center relative overflow-hidden`}>
                  <motion.div whileHover={{ scale: 1.2, rotate: 10 }} className="absolute -bottom-4 -right-4 opacity-10">
                    <CalendarDays size={180} />
                  </motion.div>
                  <div className="relative z-10">
                    <h2 className="text-7xl font-black mb-1">{event.date?.split(' ')[1]?.replace(',', '') || 'DD'}</h2>
                    <p className="text-2xl font-bold uppercase tracking-[0.2em]">{event.date?.split(' ')[0] || 'MONTH'}</p>
                    <div className="mt-6 px-6 py-2 bg-black/20 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10">
                      {event.category || 'General'}
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-10 md:p-16">
                  <div className="flex flex-wrap items-center gap-6 mb-8 text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
                      <Clock className="text-emerald-500" size={18} /> {event.time}
                    </span>
                    <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
                      <MapPin className="text-emerald-500" size={18} /> {event.location}
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 group-hover:text-emerald-500 transition-colors leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed mb-10 font-medium">
                    {event.description}
                  </p>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-10 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex-1">
                      <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                        <Mic2 size={14} /> Distinguished Speakers
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {event.speakers?.map((speaker, i) => (
                          <span key={i} className="px-5 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                            {speaker}
                          </span>
                        ))}
                      </div>
                    </div>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-12 py-5 bg-slate-900 dark:bg-emerald-600 text-white rounded-[2rem] font-black text-lg flex items-center gap-4 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all group">
                       Get Reminder <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* --- PREMIUM MILESTONES --- */}
      <section className="max-w-7xl mx-auto px-4 py-40">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: <Star />, title: "Knowledge", color: "emerald", desc: "Islamic scholars-der theke deeni shikkhar sujog." },
            { icon: <Trophy />, title: "Rewards", color: "blue", desc: "Medhabi shikkharthider jonno thake award." },
            { icon: <HeartHandshake />, title: "Unity", color: "amber", desc: "Community-r moddhe shurid-somporko gore tolar jaiga." }
          ].map((item, idx) => (
            <motion.div key={idx} whileHover={{ y: -20 }} className="p-12 bg-white dark:bg-slate-900/50 rounded-[4rem] border border-slate-100 dark:border-slate-800 text-center shadow-2xl relative overflow-hidden">
              <div className={`w-24 h-24 bg-${item.color}-100 dark:bg-${item.color}-900/30 text-${item.color}-600 rounded-[2rem] mx-auto mb-10 flex items-center justify-center`}>
                {React.cloneElement(item.icon, { size: 48 })}
              </div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-wider">{item.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- VOLUNTEER CTA --- */}
      <section className="max-w-7xl mx-auto px-4">
        <motion.div whileInView={{ scale: [0.95, 1] }} className="bg-emerald-600 dark:bg-emerald-700 rounded-[5rem] p-16 md:p-32 text-center text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(16,185,129,0.3)]">
          <div className="relative z-10">
            <Users size={80} className="mx-auto mb-10 opacity-30" />
            <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-none">Become a Volunteer</h2>
            <p className="max-w-3xl mx-auto text-emerald-100 text-xl mb-16 leading-relaxed">
              Join us as a volunteer to help organize our upcoming events and be a part of our community.
            </p>
            <button className="px-16 py-6 bg-white text-emerald-700 rounded-[2rem] font-black text-xl hover:bg-slate-100 hover:scale-105 transition-all shadow-2xl">
              Apply Now
            </button>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </motion.div>
      </section>
    </div>
  );
};

export default UpcomingEventsClient;