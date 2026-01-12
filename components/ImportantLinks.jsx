"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  ExternalLink, Facebook, Globe, 
  Library, GraduationCap, FileText, 
  ShieldCheck, Share2, Loader2
} from "lucide-react";

// Icon mapping object (Database theke asha string ke icon-e convert korbe)
const ICON_COMPONENTS = {
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  Library: <Library className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  ExternalLink: <ExternalLink className="w-6 h-6" />,
};

export default function ImportantLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // API URL
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/links/get-links";

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await axios.get(API_URL);
        setLinks(res.data);
      } catch (err) {
        console.error("Error fetching links:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20 bg-white dark:bg-zinc-950">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Header - FB Part Removed */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 text-blue-600 dark:text-emerald-500 font-black tracking-widest uppercase text-sm">
              <span className="w-10 h-1 bg-current rounded-full"></span>
              প্রয়োজনীয় সংযোগ
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white leading-tight">
              গুরুত্বপূর্ণ <span className="text-zinc-400">লিঙ্কসমূহ</span>
            </h2>
          </motion.div>
        </div>

        {/* Links Grid - Full Width (FB Part removed so now it uses full columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {links.map((link, idx) => (
            <motion.a
              key={link._id || idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
            >
              <div className={`w-14 h-14 ${link.color || 'bg-blue-500'} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:rotate-6 transition-transform`}>
                {ICON_COMPONENTS[link.icon] || <ExternalLink className="w-6 h-6" />}
              </div>
              
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-emerald-500 transition-colors">
                {link.title}
              </h3>
              
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 flex-grow">
                {link.desc}
              </p>

              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                Visit Link <ExternalLink size={14} />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Info Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
            <ShieldCheck size={20} className="text-emerald-500" />
            সবগুলো লিঙ্ক ভেরিফাইড এবং নিরাপদ
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-tighter text-right hidden md:block">
              Share with <br /> Students
            </span>
            <button className="p-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-2xl hover:bg-zinc-900 hover:text-white transition-all">
              <Share2 size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}