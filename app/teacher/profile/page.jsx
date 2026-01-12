"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { 
  User, Mail, Lock, ArrowLeft, 
  Save, Eye, EyeOff, Camera, Loader2 
} from "lucide-react";

export default function TeacherProfile() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  
  const [userData, setUserData] = useState({ 
    name: "", 
    email: "", 
    password: "", // Password edit korar jonno field
    role: "teacher" 
  });

  // API Base URL (Apnar server er port onujayi check korun)
  const API_URL = "https://madrasah-server.onrender.com/api/user-auth";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("userToken");
      const role = localStorage.getItem("userRole");
      const storedUser = localStorage.getItem("userData");

      if (!token || role !== "teacher") {
        router.push("/auth");
        return;
      }

      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserData({
          ...user,
          password: "" // Security-r jonno password empty rakha hoyeche edit field-e
        });
        if (user.profilePicture) setProfileImage(user.profilePicture);
      }
      setIsLoading(false);
    }
  }, [router]);

  // Image hander (Base64 format e convert korbe Cloudinary te pathanor jonno)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size is too large! Please upload under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Main Save Function (Server API Call)
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("userToken");
      
      const response = await axios.put(
        `${API_URL}/update-profile`, 
        {
          name: userData.name,
          password: userData.password || undefined, // Password dilei kebol update hobe
          profileImage: profileImage // Base64 string hibebe jabe
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.success) {
        // 1. LocalStorage Update (Data persistence)
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        
        // 2. State Update
        setUserData({ ...response.data.user, password: "" });
        alert("Profile & Picture Updated Successfully!");
      }
    } catch (err) {
      console.error("Update Error:", err);
      alert(err.response?.data?.message || "Failed to update profile. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-slate-500 font-bold animate-pulse text-xs tracking-widest uppercase">Fetching Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center justify-between mb-10">
          <Link href="/dashboard/teacher">
            <div className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all font-bold uppercase text-[10px] tracking-widest cursor-pointer">
              <ArrowLeft size={16} /> Back to Dashboard
            </div>
          </Link>
          <h1 className="text-xl font-black italic text-slate-800 dark:text-white uppercase tracking-tighter">
            Account <span className="text-blue-600">Settings</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Profile Picture with Cloudinary Upload */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center h-fit">
            <div className="relative group">
              <div className="h-40 w-40 rounded-[3rem] bg-slate-100 dark:bg-zinc-800 border-4 border-blue-600/10 overflow-hidden flex items-center justify-center shadow-inner">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="h-full w-full object-cover transition-transform group-hover:scale-110 duration-500" />
                ) : (
                  <User size={60} className="text-slate-300" />
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 p-3 bg-blue-600 text-white rounded-2xl cursor-pointer hover:bg-blue-500 shadow-xl transition-all hover:scale-110 active:scale-95">
                <Camera size={20} />
                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            </div>
            <h3 className="mt-6 text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">{userData.name}</h3>
            <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mt-2 bg-blue-50 dark:bg-blue-500/10 px-4 py-1 rounded-full">{userData.role}</p>
          </motion.div>

          {/* Right: Personal Info Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 border border-slate-200 dark:border-zinc-800 shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 mb-2 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    value={userData.name} 
                    onChange={(e) => setUserData({...userData, name: e.target.value})} 
                    className="w-full bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 p-4 pl-12 rounded-2xl outline-none focus:border-blue-500 transition-all dark:text-white font-bold" 
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 mb-2 block">Email Address (Read Only)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    value={userData.email} 
                    disabled 
                    className="w-full bg-slate-100 dark:bg-zinc-800/30 border border-slate-200 dark:border-zinc-800 p-4 pl-12 rounded-2xl text-slate-400 cursor-not-allowed font-bold" 
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 mb-2 block">New Password (Leave blank to keep current)</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter new password"
                    value={userData.password} 
                    onChange={(e) => setUserData({...userData, password: e.target.value})} 
                    className="w-full bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 p-4 pl-12 rounded-2xl outline-none focus:border-blue-500 transition-all dark:text-white font-bold" 
                  />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                onClick={handleSave} 
                disabled={isSaving} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all mt-4 uppercase text-xs tracking-widest shadow-lg shadow-blue-500/20 disabled:opacity-50 active:scale-[0.98]"
              >
                {isSaving ? <Loader2 className="animate-spin" size={20} /> : <><Save size={18} /> Save & Sync Profile</>}
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}