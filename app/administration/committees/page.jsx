"use client";
import React from "react";
import { motion } from "framer-motion";

import { 
  Users, 
  History, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2,
  User,
  Image as ImageIcon
} from "lucide-react";

// Committees Members Data
const committeeMembers = [
  {
    id: 1,
    name: "Alhaj Maulana Yusuf Ahmed",
    role: "President",
    phone: "+880 1711-000000",
    email: "president@madrasah.edu",
    image: null, // Public folder e image thakle path hobe "/images/p1.jpg"
    bio: "Madrasah-r protisthata sodoshyo ebong unnoyon prokolper prodhan."
  },
  {
    id: 2,
    name: "Hafiz Muhammad Ibrahim",
    role: "General Secretary",
    phone: "+880 1812-000000",
    email: "gs@madrasah.edu",
    image: null,
    bio: "Proshashon o shikkha karjokrom somonnyokari."
  },
  {
    id: 3,
    name: "Alhaj Karim Ullah",
    role: "Treasurer",
    phone: "+880 1913-000000",
    email: "finance@madrasah.edu",
    image: null,
    bio: "Orthoyon o bittiyo bebosthapona tadorokkari."
  }
];

const CommitteesPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      
      {/* --- HERO SECTION: History & Introduction --- */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50 dark:bg-emerald-900/10 -z-10 rounded-l-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 text-emerald-600 font-bold tracking-widest text-sm mb-6 uppercase">
              <History size={18} />
              About Our Foundation
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Our Madrasah <span className="text-emerald-600 underline decoration-wavy">Journey</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Amader ei deeni protishthan 1995 saale matro 5 jon bishisto shomaj sebok o ulamaye keramer uddogye gothito hoy. Deeni shikkhar proshat o ekjon adorsho manush gorar protishruti niyei amader ei jatra shuru. Aj amra 17-ti class-e shikkha prodan korchi.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-500 mt-1" />
                <div>
                  <h4 className="font-bold dark:text-white">Founders</h4>
                  <p className="text-sm text-slate-500">05 Dedicated Ulamas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-500 mt-1" />
                <div>
                  <h4 className="font-bold dark:text-white">Established</h4>
                  <p className="text-sm text-slate-500">Since 1995</p>
                </div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-emerald-500/30"
            >
              Download Full History <ArrowRight size={18} />
            </motion.button>
          </motion.div>

          {/* Madrasah Main Photo Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
               <div className="bg-slate-200 dark:bg-slate-800 h-[400px] w-full flex flex-col items-center justify-center text-slate-400">
                  <ImageIcon size={60} strokeWidth={1} />
                  <p className="mt-4 font-medium italic">Madrasah Main Building Photo</p>
               </div>
               {/* <img src="/madrasah-photo.jpg" alt="Madrasah" className="w-full h-full object-cover" /> */}
            </div>
            {/* Decorative Card over image */}
            <div className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl z-20 border border-slate-100 dark:border-slate-800">
              <p className="text-3xl font-black text-emerald-600">25+</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Years of Excellence</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- COMMITTEE MEMBERS SECTION --- */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Our Executive Committee
            </h2>
            <div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {committeeMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500"
              >
                {/* Member Profile Image */}
                <div className="relative h-72 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                    <User size={80} strokeWidth={1} />
                  </div>
                  {/* <img src={member.image || "/avatar.jpg"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /> */}
                  
                  {/* Floating Role Badge */}
                  <div className="absolute top-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-emerald-600 shadow-lg border border-emerald-100 dark:border-emerald-800">
                    {member.role}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 italic">
                    "{member.bio}"
                  </p>

                  <div className="space-y-3 pt-6 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:translate-x-2 transition-transform">
                      <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                        <Phone size={16} />
                      </div>
                      <span className="text-sm font-semibold">{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:translate-x-2 transition-transform">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600">
                        <Mail size={16} />
                      </div>
                      <span className="text-sm font-semibold">{member.email}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-emerald-600 dark:bg-emerald-700 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Become a Part of Our Progress</h2>
            <p className="text-emerald-100 max-w-2xl mx-auto mb-10 text-lg font-light">
              Apnar kono poramorsho ba maddhyom thakle amader sathe jogajog korte paren. Madrasah-r unnoyone apnar obodan amra kadr kori.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-emerald-700 px-10 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all">
                Contact Committee
              </button>
              <button className="bg-emerald-500 text-white border border-emerald-400 px-10 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all">
                Donate Funds
              </button>
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        </div>
      </section>
    </div>
  );
};

export default CommitteesPage;