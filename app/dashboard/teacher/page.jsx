"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import { 
  LayoutDashboard, UserCheck, CalendarDays, Wallet, 
  BookOpen, Bell, LogOut, Menu, UserCircle, 
  Settings, ChevronRight, Search, Clock
} from "lucide-react";

export default function TeacherDashboard() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [userData, setUserData] = useState({ 
    name: "Teacher", 
    email: "", 
    profilePicture: null 
  });

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const role = localStorage.getItem("userRole");
    
    if (!token || role !== "teacher") {
      router.push("/auth"); 
      return;
    }

    // LocalStorage theke updated user data neya
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData({
        name: parsedUser.name || "Teacher",
        email: parsedUser.email || "",
        profilePicture: parsedUser.profilePicture || null
      });
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/auth");
  };

  const menuItems = [
    { icon: <UserCheck size={20} />, label: "Attendance", href: "/teacher/attendance" },
    { icon: <BookOpen size={20} />, label: "My Classes", href: "/teacher/routine" },
    { icon: <CalendarDays size={20} />, label: "Schedule", href: "/teacher/profile"  },
    { icon: <Wallet size={20} />, label: "Payroll", href: "/teacher/salary" },
    { icon: <Settings size={20} />, label: "Settings", href: "/teacher/profile" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans">
      
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isOpen ? "280px" : "80px" }}
        className="bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 flex flex-col transition-all duration-300 relative z-20"
      >
        <div className="p-6 flex items-center gap-3 overflow-hidden">
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <span className="text-white font-black text-xl italic">M</span>
          </div>
          {isOpen && <h2 className="text-xl font-black italic tracking-tighter dark:text-white">MADARIS</h2>}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href || "#"}>
              <div className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${item.active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-800'}`}>
                <span className="shrink-0">{item.icon}</span>
                {isOpen && <span className="font-bold text-sm uppercase tracking-widest">{item.label}</span>}
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-zinc-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 p-4 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all"
          >
            <LogOut size={20} />
            {isOpen && <span className="font-bold text-sm uppercase tracking-widest">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-20 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 px-8 flex items-center justify-between sticky top-0 z-10">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl transition-all">
            <Menu size={20} className="text-slate-600 dark:text-slate-300" />
          </button>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input type="text" placeholder="Search anything..." className="bg-slate-100 dark:bg-zinc-800/50 border-none rounded-xl py-2 pl-10 pr-4 text-sm w-64 outline-none focus:ring-2 ring-blue-600/20 transition-all dark:text-white" />
            </div>
            
            <div className="flex items-center gap-4 border-l pl-6 border-slate-200 dark:border-zinc-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight leading-none">
                  {userData.name}
                </p>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Teacher Account</p>
              </div>
              
              {/* Profile Image Logic */}
              <Link href="/teacher/profile">
                <div className="h-11 w-11 rounded-xl bg-slate-100 dark:bg-zinc-800 border-2 border-blue-600/10 overflow-hidden cursor-pointer hover:border-blue-600 transition-all">
                  {userData.profilePicture ? (
                    <img src={userData.profilePicture} alt="User" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-400">
                      <UserCircle size={28} />
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-8 overflow-y-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">
              Welcome back, <span className="text-blue-600">{userData.name.split(' ')[0]}!</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1">Here's what's happening in your classes today.</p>
          </div>

          {/* Stats & Cards (Keep your existing stats grid here) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 shadow-sm">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Total Students</p>
                <h3 className="text-4xl font-black dark:text-white tracking-tighter">128</h3>
             </div>
             {/* Add more cards as needed */}
          </div>
        </div>
      </main>
    </div>
  );
}