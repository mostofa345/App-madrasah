"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Home, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dbNavItems, setDbNavItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Next.js-e client-side environment variable access
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_URL = `${BASE_URL}/navbar/get-nav`;

  useEffect(() => {
    const fetchNav = async () => {
      if (!BASE_URL) {
        console.error("API BASE URL is missing in .env. Please add NEXT_PUBLIC_API_BASE_URL");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(API_URL);
        if (res.data) {
          setDbNavItems(res.data);
        }
      } catch (err) {
        console.error("Navbar Fetch Error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNav();
  }, [API_URL, BASE_URL]);

  // Home menu manually prothome rakha hoyeche, baki gulo DB theke spread hobe
  const navItems = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    ...dbNavItems
  ];

  return (
    <nav className="w-full bg-emerald-900/95 dark:bg-slate-950/95 backdrop-blur-md sticky top-0 z-50 border-b border-white/10 shadow-xl transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex justify-center items-center h-14 md:h-16">
          
          {/* Desktop Menu - Center aligned, no Madrasah Name, no Apply Now */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, idx) => (
              <div key={idx} className="relative group px-1">
                {/* Check if item has a href (like Home) or if it's a dropdown */}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold text-emerald-50 hover:bg-white/10 hover:text-orange-400 transition-all duration-300"
                  >
                    {item.icon && item.icon}
                    <span>{item.name}</span>
                  </Link>
                ) : (
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold text-emerald-50 group-hover:bg-white/10 group-hover:text-orange-400 transition-all duration-300 uppercase">
                    <span>{item.name}</span>
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                  </button>
                )}

                {/* Submenu Dropdown */}
                {item.submenu && item.submenu.length > 0 && (
                  <div className="absolute top-full left-0 mt-1 w-56 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-emerald-100 dark:border-white/5 overflow-hidden p-2">
                      {item.submenu.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={sub.href}
                          className="block px-4 py-2.5 text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-xl transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-emerald-50 hover:bg-white/10 rounded-xl transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[280px] bg-emerald-950 dark:bg-slate-950 shadow-2xl z-[70] p-6 lg:hidden"
            >
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <span className="text-xl font-black text-orange-400 uppercase tracking-widest">Menu</span>
                <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col space-y-4 overflow-y-auto max-h-[calc(100vh-150px)]">
                {navItems.map((item, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-2">
                    {item.href ? (
                      <Link 
                        href={item.href} 
                        onClick={() => setIsOpen(false)} 
                        className="flex items-center gap-2 py-2 text-lg font-semibold text-white hover:text-orange-400 transition-colors"
                      >
                        {item.icon && item.icon}
                        <span>{item.name}</span>
                      </Link>
                    ) : (
                      <div className="py-2 text-lg font-semibold text-orange-400/80">
                        {item.name}
                      </div>
                    )}
                    
                    {item.submenu && item.submenu.length > 0 && (
                      <div className="pl-4 space-y-2 mt-2">
                        {item.submenu.map((sub, sIdx) => (
                          <Link 
                            key={sIdx} 
                            href={sub.href} 
                            onClick={() => setIsOpen(false)}
                            className="block text-zinc-400 text-sm hover:text-orange-400 transition-colors py-1"
                          >
                            • {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}