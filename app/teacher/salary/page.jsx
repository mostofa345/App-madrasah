"use client";
import React from "react";
import { motion } from "framer-motion";

import { 
  Wallet, Download, PieChart, TrendingUp, 
  FileText, History, DollarSign, BadgeCheck 
} from "lucide-react";

export default function SalaryDetails() {
  const salaryHistory = [
    { month: "December", year: "2025", amount: "28,500", status: "Paid", date: "Jan 05, 2026" },
    { month: "November", year: "2025", amount: "28,500", status: "Paid", date: "Dec 03, 2025" },
    { month: "October", year: "2025", amount: "32,000", status: "Paid", date: "Nov 02, 2025" }, // Bonus month
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
              Payroll <span className="text-orange-500">& Earnings</span>
            </h1>
            <p className="text-slate-500 font-medium">View your monthly breakdown and salary slips</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16} /> Download Full Statement
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          
          {/* Main Salary Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 bg-gradient-to-br from-zinc-900 to-black p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <p className="text-zinc-400 text-xs font-black uppercase tracking-[0.2em] mb-2">Net Payable Salary</p>
                  <h2 className="text-5xl font-black italic tracking-tighter">৳ 28,500.00</h2>
                </div>
                <div className="h-14 w-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <Wallet size={28} className="text-orange-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase">Basic Pay</p>
                  <p className="font-black text-sm mt-1">৳ 22,000</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase">Allowance</p>
                  <p className="font-black text-sm mt-1">৳ 4,500</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase">Fazil Bonus</p>
                  <p className="font-black text-sm mt-1 text-emerald-400">৳ 2,000</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase">Provident Fund</p>
                  <p className="font-black text-sm mt-1 text-red-400">- ৳ 1,200</p>
                </div>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-8">
               <BadgeCheck size={120} className="text-white opacity-[0.03]" />
            </div>
          </motion.div>

          {/* Side Info Cards */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-2xl text-orange-500">
                  <TrendingUp size={20} />
                </div>
                <h4 className="font-black text-slate-800 dark:text-white uppercase tracking-tighter">YTD Earnings</h4>
              </div>
              <p className="text-2xl font-black text-slate-800 dark:text-white leading-none">৳ 3,42,000</p>
              <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest leading-none">Current Financial Year</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-500">
                  <PieChart size={20} />
                </div>
                <h4 className="font-black text-slate-800 dark:text-white uppercase tracking-tighter">Tax Summary</h4>
              </div>
              <p className="text-sm font-bold text-slate-500 leading-snug">No Tax Deductions applied for this month.</p>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="font-black text-slate-800 dark:text-white uppercase italic flex items-center gap-2">
              <History size={18} className="text-orange-500" /> Payment History
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-zinc-800/30">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Period</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Paid Date</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                {salaryHistory.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 transition-all">
                    <td className="px-8 py-5">
                      <p className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight">{item.month} {item.year}</p>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-black text-slate-800 dark:text-slate-200">৳ {item.amount}</p>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-xs font-bold text-slate-500">{item.date}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 text-[10px] font-black rounded-lg uppercase tracking-widest">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl transition-all text-slate-400 hover:text-orange-500">
                        <FileText size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}