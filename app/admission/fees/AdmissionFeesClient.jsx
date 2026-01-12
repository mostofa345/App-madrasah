"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, CreditCard, Banknote, 
  HelpCircle, Wallet, Info, ExternalLink
} from 'lucide-react';

const AdmissionFeesClient = ({ feeInfo }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-20">
      
      {/* Hero Header */}
      <section className="bg-emerald-600 py-20 px-4 text-center text-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Wallet className="mx-auto mb-6 opacity-80" size={60} />
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Admission Fees</h1>
          <p className="text-emerald-100 text-lg md:text-xl font-medium">Transparent fee structure for the academic year</p>
        </motion.div>
      </section>

      {/* Main Fee Table */}
      <section className="max-w-6xl mx-auto px-4 -mt-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8 text-emerald-600">
              <Info size={24} />
              <span className="font-black uppercase tracking-widest text-sm">Fee Breakdown</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-slate-100 dark:border-slate-800">
                    <th className="py-6 px-4 text-slate-400 font-black uppercase text-xs tracking-widest">Department</th>
                    <th className="py-6 px-4 text-slate-400 font-black uppercase text-xs tracking-widest">Admission Fee</th>
                    <th className="py-6 px-4 text-slate-400 font-black uppercase text-xs tracking-widest">Monthly Fee</th>
                    <th className="py-6 px-4 text-slate-400 font-black uppercase text-xs tracking-widest">Total (Initial)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {feeInfo.structure?.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-6 px-4 font-bold text-slate-800 dark:text-white text-lg">{item.department}</td>
                      <td className="py-6 px-4 text-slate-600 dark:text-slate-400 font-medium">৳ {item.admissionFee}</td>
                      <td className="py-6 px-4 text-slate-600 dark:text-slate-400 font-medium">৳ {item.monthlyFee}</td>
                      <td className="py-6 px-4">
                        <span className="bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-xl font-black">
                          ৳ {item.total}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Payment Methods & Notes */}
      <section className="max-w-6xl mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-500 rounded-2xl text-white"><CreditCard size={28} /></div>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Payment Methods</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {['bKash', 'Nagad', 'Bank Transfer', 'Cash at Office'].map((method) => (
               <div key={method} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex items-center gap-3 font-bold text-slate-700 dark:text-slate-300">
                 <div className="h-2 w-2 bg-emerald-500 rounded-full"></div> {method}
               </div>
             ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-white"><Banknote size={120} /></div>
            <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-widest">Important Notes</h3>
            <ul className="space-y-4">
               {feeInfo.notes?.map((note, i) => (
                 <li key={i} className="flex gap-3 items-start text-slate-300">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={18} />
                    <p className="font-medium text-sm leading-relaxed">{note}</p>
                 </li>
               ))}
            </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white dark:bg-slate-900 p-12 rounded-[4rem] border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-xl">
           <HelpCircle className="mx-auto text-emerald-500 mb-6" size={48} />
           <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-6">Have any questions?</h2>
           <div className="flex flex-wrap justify-center gap-4">
              <a href="/admission/apply" className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-emerald-500 transition-all">
                Apply Online <ExternalLink size={18} />
              </a>
           </div>
        </div>
      </section>

    </div>
  );
};

export default AdmissionFeesClient;