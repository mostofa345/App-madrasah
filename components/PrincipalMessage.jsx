"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowRight, Quote, Loader2 } from "lucide-react";

export default function PrincipalMessage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // API URL checking
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/principal";

  useEffect(() => {
    const fetchPrincipalMessage = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data) {
          setData(res.data);
        }
      } catch (err) {
        console.error("Principal Message Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrincipalMessage();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center bg-white dark:bg-zinc-950">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  // Jodi database-e kono message na thake
  if (!data) return null;

  return (
    <section className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* অধ্যক্ষের ছবি */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group w-full lg:w-2/5"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500 to-amber-200 dark:from-emerald-600 dark:to-emerald-900 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-lg" />
            
            <div className="relative overflow-hidden rounded-2xl border-2 border-orange-100 dark:border-emerald-800 shadow-2xl">
              <img 
                src={data.image?.url} 
                alt={data.image?.alt || "Principal"} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-bold">{data.name}</h3>
                <p className="text-orange-400 dark:text-emerald-400 text-sm font-medium">{data.designation}</p>
              </div>
            </div>
          </motion.div>

          {/* টেক্সট কন্টেন্ট */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-3/5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-emerald-900/30 text-orange-600 dark:text-emerald-400 rounded-full text-sm font-black uppercase tracking-widest">
              <Quote size={16} /> অধ্যক্ষের বাণী
            </div>

            <div className="relative">
              <Quote className="absolute -top-4 -left-6 text-zinc-100 dark:text-zinc-900 w-20 h-20 -z-10" />
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify italic font-medium">
                 {/* Database theke asha message content */}
                 {data.messageContent}
              </div>
            </div>

            {/* অধ্যক্ষের স্বাক্ষর - Handwritten Style Italic */}
            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
               <div className="flex flex-col gap-1">
                  <span 
                    className="text-3xl text-zinc-800 dark:text-zinc-200 opacity-90" 
                    style={{ 
                      fontFamily: "'Dancing Script', 'Cursive', serif", // Handwriting font
                      fontStyle: 'italic',
                      fontWeight: '500'
                    }}
                  >
                    {data.signatureText}
                  </span>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Signature</p>
               </div>
            </div>

            <motion.button 
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 px-8 py-3 bg-zinc-900 dark:bg-emerald-600 text-white rounded-full font-bold transition-all shadow-lg hover:bg-orange-600 dark:hover:bg-emerald-700"
            >
              বিস্তারিত পড়ুন <ArrowRight size={20} />
            </motion.button>
          </motion.div>

        </div>
      </div>
      
      {/* CSS for Handwriting Font (Jodi project e na thake) */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap');
      `}</style>
    </section>
  );
}