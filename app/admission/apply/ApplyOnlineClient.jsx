"use client";
import React, { useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { 
  User, MapPin, BookOpen, Camera, 
  Send, CheckCircle, AlertCircle, Phone,
  FileText, ArrowRight, ArrowLeft, GraduationCap, 
  Hash, Loader2
} from 'lucide-react';

export default function ApplyOnlineClient() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/applications/submit";

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appId, setAppId] = useState("");

  const classData = {
    "নূরানী": ["১ম শ্রেণী", "২য় শ্রেণী", "৩য় শ্রেণী"],
    "ইবতেদায়ী": ["৪র্থ শ্রেণী", "৫ম শ্রেণী"],
    "দাখিল": ["৬ষ্ঠ শ্রেণী", "৭ম শ্রেণী", "৮ম শ্রেণী", "৯ম শ্রেণী", "১০ম শ্রেণী"],
    "আলিম": ["১ম বর্ষ (একাদশ)", "২য় বর্ষ (দ্বাদশ)"],
    "ফাজিল": ["১ম বর্ষ", "২য় বর্ষ", "৩য় বর্ষ"]
  };

  const [formData, setFormData] = useState({
    bibag: "", class: "", studentNameBn: "", studentNameEn: "",
    fatherName: "", motherName: "", birthDate: "", birthRegNo: "",
    phone: "", bloodGroup: "", houseName: "", village: "",
    postOffice: "", upazila: "", district: "", photo: "" 
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2000000) { 
        alert("ছবি ২ মেগাবাইটের কম হতে হবে");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const submissionData = {
        ...formData,
        address: JSON.stringify({
          houseName: formData.houseName,
          village: formData.village,
          postOffice: formData.postOffice,
          upazila: formData.upazila,
          district: formData.district
        })
      };
      const res = await axios.post(API_URL, submissionData);
      setAppId(res.data.applicationId);
      setSubmitted(true);
    } catch (err) {
      alert("আবেদন জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans p-4 md:p-10">
      <div className="max-w-4xl mx-auto text-left">
        <div className="text-center mb-12">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block p-4 bg-emerald-500/10 rounded-3xl mb-6">
            <GraduationCap size={48} className="text-emerald-500" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">Online Admission</h1>
          <p className="text-slate-500 font-medium">Follow the steps below to submit your information</p>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl relative">
          {!submitted && (
            <div className="h-2 w-full bg-slate-800 flex">
              <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8 md:p-12">
                {step === 1 && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-4 text-emerald-500 mb-8 font-bold text-2xl uppercase"><BookOpen size={24} /> Academic Info</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 ml-2 tracking-widest">Select Department</label>
                        <select value={formData.bibag} onChange={(e) => setFormData({...formData, bibag: e.target.value, class: ""})} className="w-full bg-[#1e293b] border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500 transition-all">
                          <option value="">Choose Bibag</option>
                          {Object.keys(classData).map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 ml-2 tracking-widest">Admission Class</label>
                        <select value={formData.class} onChange={(e) => setFormData({...formData, class: e.target.value})} disabled={!formData.bibag} className="w-full bg-[#1e293b] border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500 transition-all disabled:opacity-30">
                          <option value="">Choose Class</option>
                          {formData.bibag && classData[formData.bibag].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-blue-500 mt-12 mb-8 font-bold text-2xl uppercase"><User size={24} /> Personal Details</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input type="text" placeholder="ছাত্রের নাম (বাংলায়)" value={formData.studentNameBn} onChange={(e) => setFormData({...formData, studentNameBn: e.target.value})} className="bg-[#1e293b] border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-blue-500" />
                      <input type="text" placeholder="Student Name (English)" value={formData.studentNameEn} onChange={(e) => setFormData({...formData, studentNameEn: e.target.value})} className="bg-[#1e293b] border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-blue-500" />
                      <input type="text" placeholder="পিতার নাম" value={formData.fatherName} onChange={(e) => setFormData({...formData, fatherName: e.target.value})} className="bg-[#1e293b] border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-blue-500" />
                      <input type="text" placeholder="মাতার নাম" value={formData.motherName} onChange={(e) => setFormData({...formData, motherName: e.target.value})} className="bg-[#1e293b] border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-blue-500" />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-4 text-amber-500 mb-8 font-bold text-2xl uppercase"><Hash size={24} /> ID & Contact</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 ml-2 uppercase tracking-widest">Birth Date</label>
                        <input type="date" value={formData.birthDate} onChange={(e) => setFormData({...formData, birthDate: e.target.value})} className="w-full bg-[#1e293b] border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-amber-500" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 ml-2 uppercase tracking-widest">Birth Reg No</label>
                        <input type="text" placeholder="17 Digit Number" value={formData.birthRegNo} onChange={(e) => setFormData({...formData, birthRegNo: e.target.value})} className="w-full bg-[#1e293b] border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-amber-500" />
                      </div>
                      <input type="tel" placeholder="মোবাইল নম্বর" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-[#1e293b] border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-amber-500" />
                      <select value={formData.bloodGroup} onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})} className="bg-[#1e293b] border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-amber-500">
                        <option value="">Blood Group</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>

                    <div className="flex items-center gap-4 text-emerald-500 mt-12 mb-8 font-bold text-2xl uppercase"><MapPin size={24} /> Present Address</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <input type="text" placeholder="বাড়ির নাম" value={formData.houseName} onChange={(e) => setFormData({...formData, houseName: e.target.value})} className="bg-[#1e293b] border border-slate-700 rounded-2xl px-5 py-3 outline-none" />
                      <input type="text" placeholder="গ্রাম/রাস্তা" value={formData.village} onChange={(e) => setFormData({...formData, village: e.target.value})} className="bg-[#1e293b] border border-slate-700 rounded-2xl px-5 py-3 outline-none" />
                      <input type="text" placeholder="ডাকঘর" value={formData.postOffice} onChange={(e) => setFormData({...formData, postOffice: e.target.value})} className="bg-[#1e293b] border border-slate-700 rounded-2xl px-5 py-3 outline-none" />
                      <input type="text" placeholder="উপজেলা" value={formData.upazila} onChange={(e) => setFormData({...formData, upazila: e.target.value})} className="bg-[#1e293b] border border-slate-700 rounded-2xl px-5 py-3 outline-none" />
                      <input type="text" placeholder="জেলা" value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} className="bg-[#1e293b] border border-slate-700 rounded-2xl px-5 py-3 outline-none" />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="text-center space-y-10 py-10">
                    <div className="w-48 h-60 mx-auto bg-[#1e293b] border-2 border-dashed border-slate-700 rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden group">
                      {formData.photo ? (
                        <img src={formData.photo} alt="Student" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Camera size={48} className="text-slate-600 mb-4" />
                          <p className="text-[10px] font-black text-slate-500 uppercase px-4 tracking-tighter">Passport Size Photo</p>
                        </>
                      )}
                      <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                    <div className="max-w-md mx-auto">
                       <h2 className="text-2xl font-bold text-white mb-4 italic uppercase tracking-widest">Declaration</h2>
                       <p className="text-sm text-slate-400 leading-relaxed">I hereby declare that the information provided is true and correct to the best of my knowledge.</p>
                    </div>
                  </div>
                )}

                <div className="mt-12 flex justify-between items-center pt-8 border-t border-slate-800">
                  {step > 1 ? (
                    <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-slate-400 font-bold hover:text-white transition-all uppercase text-xs tracking-widest"><ArrowLeft size={20} /> Back</button>
                  ) : <div></div>}
                  
                  {step < 3 ? (
                    <button onClick={() => setStep(step + 1)} disabled={!formData.bibag || !formData.studentNameBn} className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-2xl font-bold shadow-xl flex items-center gap-2 transition-all disabled:opacity-20 uppercase text-xs tracking-widest">Next Step <ArrowRight size={20} /></button>
                  ) : (
                    <button onClick={handleSubmit} disabled={loading || !formData.photo} className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-4 rounded-2xl font-black shadow-xl flex items-center gap-3 transition-all disabled:opacity-50 uppercase text-xs tracking-widest">
                      {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />} {loading ? "Submitting..." : "Complete Application"}
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-16 text-center space-y-8">
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <CheckCircle size={48} className="text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Submission Successful!</h2>
                  <p className="text-slate-400 text-lg">Your Application ID: <span className="text-emerald-500 font-black tracking-widest">{appId}</span></p>
                </div>
                <button onClick={() => window.location.reload()} className="px-10 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold transition-all uppercase text-xs tracking-widest">Go to Main Page</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}