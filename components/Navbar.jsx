"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Home, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dbNavItems, setDbNavItems] = useState([]);
  const [activeMobileMenu, setActiveMobileMenu] = useState(null);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_URL = `${BASE_URL}/navbar/get-nav`;

  useEffect(() => {
    const fetchNav = async () => {
      if (!BASE_URL) return;
      try {
        const res = await axios.get(API_URL);
        if (res.data) setDbNavItems(res.data);
      } catch (err) {
        console.error("Navbar Fetch Error:", err.message);
      }
    };
    fetchNav();
  }, [API_URL, BASE_URL]);

  const navItems = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    ...dbNavItems
  ];

  return (
    <nav className="w-full bg-emerald-900 dark:bg-zinc-950 sticky top-0 z-[100] border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section Remove kora hoyeche, kintu layout thik rakhar jonno khali div rakha hoyeche */}
          <div className="flex-shrink-0">
            {/* Madrasah text ekhane chhilo, seta remove kora hoyeche */}
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, idx) => (
              <div key={idx} className="relative group">
                {item.href ? (
                  <Link href={item.href} className="px-4 py-2 text-sm font-bold text-emerald-50 hover:text-orange-400 transition-colors uppercase">
                    {item.name}
                  </Link>
                ) : (
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-emerald-50 group-hover:text-orange-400 transition-colors uppercase">
                    {item.name} <ChevronDown size={14} />
                  </button>
                )}

                {item.submenu && item.submenu.length > 0 && (
                  <div className="absolute top-full left-0 w-52 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden py-2">
                      {item.submenu.map((sub, sIdx) => (
                        <Link key={sIdx} href={sub.href} className="block px-5 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-700 transition-colors">
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Toggle Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(true)} className="p-2 text-white bg-white/10 rounded-lg">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Sidebar --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[998] lg:hidden"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[280px] bg-emerald-950 dark:bg-zinc-950 z-[999] shadow-2xl flex flex-col lg:hidden border-r border-white/10"
            >
              <div className="p-5 flex items-center justify-between border-b border-white/10">
                <span className="text-white font-bold text-lg">MENU</span>
                <button onClick={() => setIsOpen(false)} className="p-2 text-white/70 hover:text-white bg-white/5 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {navItems.map((item, idx) => (
                  <div key={idx}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-3 text-emerald-50 font-bold hover:bg-white/10 rounded-xl transition-all"
                      >
                        <div className="p-2 bg-orange-400/10 rounded-lg text-orange-400">
                          {item.icon || <Home size={18} />}
                        </div>
                        {item.name}
                      </Link>
                    ) : (
                      <div className="space-y-1">
                        <button
                          onClick={() => setActiveMobileMenu(activeMobileMenu === idx ? null : idx)}
                          className="w-full flex items-center justify-between p-3 text-emerald-50 font-bold hover:bg-white/10 rounded-xl transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-400/10 rounded-lg text-emerald-400 text-xs w-9 text-center uppercase">
                              {item.name.charAt(0)}
                            </div>
                            {item.name}
                          </div>
                          <ChevronRight size={18} className={`transition-transform ${activeMobileMenu === idx ? "rotate-90 text-orange-400" : "text-white/30"}`} />
                        </button>
                        
                        {activeMobileMenu === idx && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            className="ml-12 space-y-1 border-l border-white/10 pl-4"
                          >
                            {item.submenu.map((sub, sIdx) => (
                              <Link
                                key={sIdx}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-2.5 text-sm text-zinc-400 hover:text-orange-400 transition-colors"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-5 border-t border-white/10 bg-black/20 text-center">
                <p className="text-[10px] text-white/30 tracking-widest uppercase italic">Developed for Madrasah</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
