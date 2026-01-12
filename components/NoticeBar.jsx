"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Megaphone, Loader2 } from "lucide-react";

export default function NoticeBar() {
  const [notices, setNotices] = useState([]);
  const [scrollSpeed, setScrollSpeed] = useState(20);
  const [loading, setLoading] = useState(true);

  // .env file theke API URL set kora hoyeche
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_URL = `${BASE_URL}/notice/get-notice`;

  useEffect(() => {
    const fetchNotices = async () => {
      if (!BASE_URL) return;
      try {
        const res = await axios.get(API_URL);
        if (res.data) {
          // Database theke data set kora hocche
          setNotices(res.data.notices || []);
          setScrollSpeed(res.data.scrollSpeed || 20);
        }
      } catch (err) {
        console.error("NoticeBar Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [API_URL, BASE_URL]);

  // Notice gulo join kore ekta lomba line toiri kora hocche
  const fullNoticeText = notices.length > 0 
    ? notices.join(" || ") 
    : "স্বাগতম! আমাদের মাদরাসার ওয়েবসাইটে আপনাকে স্বাগতম।";

  if (loading) {
    return (
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center h-10 px-4">
        <Loader2 className="animate-spin text-red-600 mr-2" size={16} />
        <span className="text-xs text-zinc-400">Loading notices...</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center overflow-hidden h-10 shadow-sm transition-colors duration-500">
      {/* বাম পাশের ফিক্সড 'Notice' লেবেল */}
      <div className="bg-red-600 dark:bg-red-700 text-white px-4 h-full flex items-center font-bold text-sm z-20 shadow-lg gap-2 shrink-0">
        <Megaphone size={16} className="animate-pulse" />
        <span>Notice:</span>
      </div>

      {/* চলন্ত নোটিশ টেক্সট */}
      <div className="relative flex items-center overflow-hidden w-full h-full bg-zinc-50 dark:bg-black/20">
        <motion.div
          key={fullNoticeText} // Data change hole animation reset hobe
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{
            repeat: Infinity,
            duration: scrollSpeed, // Admin panel theke set kora speed ekhane kaj korbe
            ease: "linear",
          }}
          className="whitespace-nowrap flex items-center gap-10 text-zinc-800 dark:text-zinc-200 font-medium text-sm md:text-base pr-10"
        >
          {fullNoticeText}
        </motion.div>
      </div>
    </div>
  );
}