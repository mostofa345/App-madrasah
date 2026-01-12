"use client";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Clock, Loader2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function EventTimeline() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // API URL fetch from .env
  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/events`;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(API_URL);
        setEvents(res.data);
      } catch (err) {
        console.error("Events fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [API_URL]);

  if (loading) return (
    <div className="py-20 flex flex-col items-center justify-center text-emerald-500 bg-slate-50 dark:bg-zinc-950">
      <Loader2 className="animate-spin mb-2" size={40} />
      <p className="text-sm font-medium animate-pulse">লোড হচ্ছে...</p>
    </div>
  );

  return (
    <section className="py-20 bg-slate-50 dark:bg-zinc-950 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl mb-4"
          >
            <Calendar size={32} />
          </motion.div>
          <h2 className="text-4xl font-black dark:text-white mb-4 italic uppercase tracking-tighter">মাসভিত্তিক ইভেন্ট প্ল্যানার</h2>
          <div className="h-1.5 w-20 bg-emerald-500 rounded-full" />
        </div>

        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-zinc-200 dark:bg-zinc-800 rounded-full" />

          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {events.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center justify-between w-full ${
                    index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border-4 border-emerald-500 z-10 shadow-lg" />

                  {/* Content Card */}
                  <div className="ml-12 md:ml-0 w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl hover:shadow-emerald-500/5 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-emerald-500" />
                        <span className="text-sm font-black text-emerald-500 uppercase tracking-widest">{event.month}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                        event.type === 'Exam' ? 'bg-red-500/10 text-red-500' : 
                        event.type === 'Holiday' ? 'bg-orange-500/10 text-orange-500' :
                        'bg-emerald-500/10 text-emerald-500'
                      }`}>
                        {event.type}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-2xl font-black dark:text-white mb-2 leading-tight">{event.title}</h3>
                      <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-bold uppercase tracking-tight">
                        <MapPin size={14} className="text-emerald-500" /> 
                        <span>{event.location}</span>
                        <span className="mx-2 text-zinc-700">|</span>
                        <span>{event.date}</span>
                      </div>
                    </div>

                    <p className="text-zinc-600 dark:text-zinc-500 text-sm leading-relaxed italic border-l-2 border-emerald-500/30 pl-4 py-1">
                      "{event.desc}"
                    </p>
                  </div>

                  {/* Spacer for MD screens */}
                  <div className="hidden md:block w-[calc(50%-2.5rem)]" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {events.length === 0 && !loading && (
            <div className="text-center py-20">
              <p className="text-zinc-500 font-bold uppercase tracking-widest">বর্তমানে কোনো ইভেন্ট পাওয়া যায়নি।</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}