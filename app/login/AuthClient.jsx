"use client";
import React, { useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  User, Mail, Lock, GraduationCap, 
  Users, UserSquare2, Loader2 
} from "lucide-react";

export default function AuthClient() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true); 
  const [role, setRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const roles = [
    { id: "student", label: "Student", icon: <GraduationCap size={18} /> },
    { id: "teacher", label: "Teacher", icon: <Users size={18} /> },
    { id: "parent", label: "Parent", icon: <UserSquare2 size={18} /> },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const endpoint = isLogin ? "/user-login" : "/user-register";
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-auth${endpoint}`;

    try {
      const response = await axios.post(apiUrl, {
        ...formData,
        role: role
      });

      if (response.data.success) {
        if (isLogin) {
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("userRole", response.data.user.role);
          
          if (response.data.user.role === "student") router.push("/dashboard/student");
          else if (response.data.user.role === "teacher") router.push("/dashboard/teacher");
          else if (response.data.user.role === "parent") router.push("/dashboard/parent");
        } else {
          alert("Registration successful! Please wait for admin approval.");
          setIsLogin(true);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <motion.div 
        layout
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-zinc-800 p-8 md:p-10 relative overflow-hidden"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black italic text-slate-900 dark:text-white uppercase tracking-tighter">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            {isLogin ? "Login to access your dashboard" : "Register as a new user"}
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex bg-slate-100 dark:bg-zinc-800 p-1.5 rounded-2xl mb-8">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all ${
                role === r.id 
                ? "bg-white dark:bg-zinc-700 shadow-sm text-emerald-600 dark:text-emerald-400" 
                : "text-slate-500"
              }`}
            >
              {r.icon} {r.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 text-xs font-bold rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    required={!isLogin}
                    className="w-full bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 p-4 pl-12 rounded-2xl outline-none focus:border-emerald-500 transition-all dark:text-white"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                placeholder="name@email.com"
                required
                className="w-full bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 p-4 pl-12 rounded-2xl outline-none focus:border-emerald-500 transition-all dark:text-white"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                required
                className="w-full bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 p-4 pl-12 rounded-2xl outline-none focus:border-emerald-500 transition-all dark:text-white"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all mt-4"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : (isLogin ? "SIGN IN" : "CREATE ACCOUNT")}
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800 text-center">
          <button 
            onClick={() => {
                setIsLogin(!isLogin);
                setError("");
            }}
            className="text-sm text-slate-500 font-medium transition-all"
          >
            {isLogin ? "Don't have an account?" : "Already have an account?"} 
            <span className="text-emerald-500 font-bold ml-1 hover:underline">
              {isLogin ? "Sign Up Now" : "Login Here"}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}