"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

import { 
  Plus, Save, Download, FileSpreadsheet, 
  Trash2, Filter, DollarSign, Calculator 
} from "lucide-react";

export default function CollectionManagement() {
  // Sample Data (Eti backend theke asbe)
  const [rows, setRows] = useState([
    { id: 1, name: "MD Sabbir", roll: "101", type: "Monthly Fee", amount: 500, date: "2026-01-10", note: "Paid" },
    { id: 2, name: "Abdullah", roll: "102", type: "Admission Fee", amount: 2500, date: "2026-01-11", note: "New Student" },
  ]);

  const addRow = () => {
    const newRow = { id: Date.now(), name: "", roll: "", type: "Monthly Fee", amount: 0, date: "", note: "" };
    setRows([...rows, newRow]);
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map(row => row.id === id ? { ...row, [field]: value } : row);
    setRows(updatedRows);
  };

  const deleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const totalAmount = rows.reduce((sum, row) => sum + Number(row.amount || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with Totals */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
              Fee <span className="text-emerald-600">Collection</span>
            </h1>
            <p className="text-slate-500 font-medium">Class: 10 (Alim Section) | Total Collected Today</p>
          </div>
          
          <div className="bg-emerald-600 p-6 rounded-[2rem] text-white flex items-center gap-6 shadow-xl shadow-emerald-500/20">
            <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Calculator size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-none mb-1">Total Collection</p>
              <h3 className="text-2xl font-black tracking-tighter">৳ {totalAmount.toLocaleString()}</h3>
            </div>
          </div>
        </header>

        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button 
              onClick={addRow}
              className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all"
            >
              <Plus size={16} /> Add Entry
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
              <FileSpreadsheet size={16} className="text-emerald-600" /> Export Excel
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-500 shadow-lg transition-all">
            <Save size={16} /> Save All Records
          </button>
        </div>

        {/* Excel-style Editable Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-zinc-800/30 border-b border-slate-100 dark:border-zinc-800">
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Name</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest w-24">Roll</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fee Type</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest w-32">Amount (৳)</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Note</th>
                  <th className="px-6 py-5 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                {rows.map((row) => (
                  <tr key={row.id} className="group hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 transition-all">
                    <td className="px-4 py-2">
                      <input 
                        type="text" 
                        value={row.name}
                        onChange={(e) => handleInputChange(row.id, "name", e.target.value)}
                        placeholder="Enter Name"
                        className="w-full bg-transparent p-2 font-bold text-slate-700 dark:text-slate-200 focus:bg-white dark:focus:bg-zinc-800 rounded-lg outline-none border border-transparent focus:border-emerald-500/30 transition-all"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input 
                        type="text" 
                        value={row.roll}
                        onChange={(e) => handleInputChange(row.id, "roll", e.target.value)}
                        placeholder="Roll"
                        className="w-full bg-transparent p-2 font-bold text-slate-700 dark:text-slate-200 focus:bg-white dark:focus:bg-zinc-800 rounded-lg outline-none"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <select 
                        value={row.type}
                        onChange={(e) => handleInputChange(row.id, "type", e.target.value)}
                        className="w-full bg-transparent p-2 font-bold text-slate-700 dark:text-slate-200 focus:bg-white dark:focus:bg-zinc-800 rounded-lg outline-none cursor-pointer"
                      >
                        <option value="Monthly Fee">Monthly Fee</option>
                        <option value="Admission Fee">Admission Fee</option>
                        <option value="Exam Fee">Exam Fee</option>
                        <option value="Form Fillup">Form Fillup</option>
                        <option value="Registration">Registration</option>
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <input 
                        type="number" 
                        value={row.amount}
                        onChange={(e) => handleInputChange(row.id, "amount", e.target.value)}
                        className="w-full bg-transparent p-2 font-black text-emerald-600 focus:bg-white dark:focus:bg-zinc-800 rounded-lg outline-none"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input 
                        type="date" 
                        value={row.date}
                        onChange={(e) => handleInputChange(row.id, "date", e.target.value)}
                        className="w-full bg-transparent p-2 text-xs font-bold text-slate-500 focus:bg-white dark:focus:bg-zinc-800 rounded-lg outline-none"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input 
                        type="text" 
                        value={row.note}
                        onChange={(e) => handleInputChange(row.id, "note", e.target.value)}
                        placeholder="Short note..."
                        className="w-full bg-transparent p-2 text-sm font-medium text-slate-500 focus:bg-white dark:focus:bg-zinc-800 rounded-lg outline-none"
                      />
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button 
                        onClick={() => deleteRow(row.id)}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {rows.length === 0 && (
            <div className="p-20 text-center">
              <DollarSign className="mx-auto text-slate-200 mb-4" size={48} />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No records added yet</p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-500/5 rounded-[2rem] border border-blue-100 dark:border-blue-500/10 flex items-center gap-4">
          <div className="h-10 w-10 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center text-blue-600">
            <Calculator size={20} />
          </div>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Teachers can directly hand over this digital statement to the accounts department.
          </p>
        </div>
      </div>
    </div>
  );
}