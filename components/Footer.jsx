"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import { 
  Mail, Phone, MapPin, Facebook, 
  Youtube, Twitter, ChevronRight
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // .env থেকে বেস ইউআরএল

  const [footerData, setFooterData] = useState(null);

  // ডাটাবেস থেকে ফুটার ডেটা ফেচ করা
  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/footer`);
        if (res.data) {
          setFooterData(res.data);
        }
      } catch (err) {
        console.error("Footer data fetch error:", err);
      }
    };
    if (API_BASE_URL) fetchFooter();
  }, [API_BASE_URL]);

  // ডেটা লোড না হওয়া পর্যন্ত একটি ডিফল্ট কঙ্কাল বা নাল রিটার্ন করা
  if (!footerData) return null;

  return (
    <footer className="bg-[#0A2E4E] dark:bg-zinc-950 text-white pt-16 pb-8 transition-colors duration-500 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 dark:via-emerald-500 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Section 1: About & Logo */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 overflow-hidden">
                {footerData.logoUrl ? (
                  <img src={footerData.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-[10px] text-emerald-800 font-bold text-center leading-none">লোগো</span>
                )}
              </div>
              <h2 className="text-lg font-bold leading-tight">
                {footerData.madrasahName || "মাদরাসার নাম"}
              </h2>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {footerData.shortBio || "প্রতিষ্ঠানের সংক্ষিপ্ত বিবরণ..."}
            </p>
            <div className="flex gap-4">
              {footerData.socialLinks?.facebook && (
                <Link href={footerData.socialLinks.facebook} target="_blank" className="p-2 bg-white/5 hover:bg-orange-500 dark:hover:bg-emerald-600 rounded-full transition-all">
                  <Facebook size={20} />
                </Link>
              )}
              {footerData.socialLinks?.youtube && (
                <Link href={footerData.socialLinks.youtube} target="_blank" className="p-2 bg-white/5 hover:bg-orange-500 dark:hover:bg-emerald-600 rounded-full transition-all">
                  <Youtube size={20} />
                </Link>
              )}
              {footerData.socialLinks?.twitter && (
                <Link href={footerData.socialLinks.twitter} target="_blank" className="p-2 bg-white/5 hover:bg-orange-500 dark:hover:bg-emerald-600 rounded-full transition-all">
                  <Twitter size={20} />
                </Link>
              )}
            </div>
          </motion.div>

          {/* Section 2: Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-orange-500 dark:text-emerald-400 font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerData.quickLinks?.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.slug || "#"} className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm group transition-colors">
                    <ChevronRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Section 3: Resources */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-orange-500 dark:text-emerald-400 font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerData.resources?.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.slug || "#"} className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm group transition-colors">
                    <ChevronRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Section 4: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-orange-500 dark:text-emerald-400 font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block">
              Contact Us
            </h3>
            <div className="space-y-4 text-sm text-zinc-400">
              <div className="flex gap-3">
                <MapPin size={20} className="text-orange-500 shrink-0" />
                <span>{footerData.contact?.address || "ঠিকানা পাওয়া যায়নি"}</span>
              </div>
              <div className="flex gap-3">
                <Phone size={20} className="text-orange-500 shrink-0" />
                <span>{footerData.contact?.phone || "ফোন নম্বর পাওয়া যায়নি"}</span>
              </div>
              <div className="flex gap-3">
                <Mail size={20} className="text-orange-500 shrink-0" />
                <span>{footerData.contact?.email || "ইমেইল পাওয়া যায়নি"}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>{footerData.copyrightText?.replace("{currentYear}", currentYear) || `© ${currentYear} All rights reserved.`}</p>
          <div className="flex gap-6">
            <Link href={footerData.bottomLinks?.privacy?.slug || "#"} className="hover:text-white">
              {footerData.bottomLinks?.privacy?.label || "Privacy Policy"}
            </Link>
            <Link href={footerData.bottomLinks?.terms?.slug || "#"} className="hover:text-white">
              {footerData.bottomLinks?.terms?.label || "Terms & Conditions"}
            </Link>
            {footerData.developer && (
              <span className="flex items-center gap-1">
                Developed by <Link href={footerData.developer.website || "#"} target="_blank" className="text-white font-bold hover:underline">{footerData.developer.name}</Link>
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}