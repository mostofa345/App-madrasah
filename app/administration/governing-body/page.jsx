"use client";
import React from "react";
import { motion } from "framer-motion";

import { 
  Award, 
  ExternalLink, 
  Mail, 
  Phone, 
  ShieldCheck, 
  User, 
  Users, 
  Calendar, 
  Target, 
  Zap,
  Briefcase
} from "lucide-react";

// Member Data (JavaScript Object)
const members = [
  {
    id: 1,
    name: "Alhaj Dr. Abdur Rahman",
    role: "Chairman",
    description: "Bisisto Shomaj Sebok o Shikhannuragi. Madrasah-r unnoyone tar obodan oporisim.",
    phone: "+880 1711-XXXXXX",
    email: "chairman@madrasah.edu",
    gradient: "from-emerald-600 to-teal-600"
  },
  {
    id: 2,
    name: "Maulana Muhammad Abdullah",
    role: "Member Secretary (Principal)",
    description: "Academic ebong administrative bivager prodhan somonnyokari.",
    phone: "+880 1812-XXXXXX",
    email: "principal@madrasah.edu",
    gradient: "from-blue-600 to-indigo-600"
  },
  {
    id: 3,
    name: "Engineer Md. Kabir Hossain",
    role: "Vice Chairman",
    description: "Infrastructure ebong technical unnoyon tadorokkari.",
    phone: "+880 1913-XXXXXX",
    email: "kabir@example.com",
    gradient: "from-amber-500 to-orange-600"
  },
  {
    id: 4,
    name: "Dr. Sayed Ahmed",
    role: "Executive Member",
    description: "Sashtho o poribesh bishoyok advisor.",
    phone: "+880 1614-XXXXXX",
    email: "sayed@example.com",
    gradient: "from-purple-600 to-pink-600"
  }
];

const GoverningBody = () => {
  // Pure JavaScript Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden relative">
      
      {/* Decorative Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-400 rounded-full blur-[100px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        
        {/* --- Section Header --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck size={16} />
            Governing Council
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">
            Executive <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">Board</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
            Amader madrasah-r nirdeshona o unnoyone jara nirolosh bhabe kaj kore jacchen. Ekjon adorsho manush gorar protishrutite amra obichol.
          </p>
        </motion.div>

        {/* --- Chairman Spotlight --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mb-32 p-1 rounded-[3rem] bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 shadow-2xl overflow-hidden group"
        >
          <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl rounded-[2.9rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12">
            <div className="relative group flex-shrink-0">
              <div className="absolute inset-0 bg-emerald-500 rounded-[2.5rem] rotate-6 blur-xl opacity-20 group-hover:rotate-12 transition-transform duration-500"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2.5rem] bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-700 flex items-center justify-center overflow-hidden">
                <User size={120} className="text-slate-400" />
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase">
                <Award size={20} />
                <span>Honorable Chairman</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-none">
                {members[0].name}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed mb-8 italic">
                "{members[0].description}. Amader lokkho holo deeni o duniyabi shikkhar ekta adorsho kendro gore tola."
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <a href={`tel:${members[0].phone}`} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-lg shadow-emerald-500/30 transition-all font-bold flex items-center gap-2 transform hover:-translate-y-1">
                  <Phone size={20} /> Contact Me
                </a>
                <button className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all transform hover:-translate-y-1">
                  Private Profile
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Member Grid --- */}
        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {members.slice(1).map((member) => (
            <motion.div 
              key={member.id}
              variants={fadeInUp}
              whileHover={{ y: -15 }}
              className="relative group h-full"
            >
              <div className="h-full bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-xl hover:shadow-emerald-500/10 transition-all duration-500">
                <div className={`w-20 h-20 rounded-2xl mb-8 bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white shadow-lg`}>
                  <User size={40} />
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
                  {member.name}
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider mb-4">
                  {member.role}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
                  {member.description}
                </p>

                <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 hover:text-emerald-600 transition-colors">
                    <Phone size={18} />
                    <span className="text-sm font-medium">{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 hover:text-emerald-600 transition-colors">
                    <Mail size={18} />
                    <span className="text-sm font-medium">{member.email}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <button className="w-full py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-900 dark:text-white font-bold flex items-center justify-center gap-2 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    Full Bio <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- Footer Stats Card --- */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-slate-900 dark:bg-emerald-950 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <Users size={40} className="mx-auto mb-4 text-emerald-400" />
              <h4 className="text-4xl font-black mb-1">15+</h4>
              <p className="text-emerald-200 text-sm font-bold uppercase tracking-widest">Active Members</p>
            </div>
            <div>
              <Briefcase size={40} className="mx-auto mb-4 text-blue-400" />
              <h4 className="text-4xl font-black mb-1">20+</h4>
              <p className="text-emerald-200 text-sm font-bold uppercase tracking-widest">Year History</p>
            </div>
            <div>
              <Zap size={40} className="mx-auto mb-4 text-yellow-400" />
              <h4 className="text-4xl font-black mb-1">100%</h4>
              <p className="text-emerald-200 text-sm font-bold uppercase tracking-widest">Commitment</p>
            </div>
            <div>
              <Target size={40} className="mx-auto mb-4 text-purple-400" />
              <h4 className="text-4xl font-black mb-1">Elite</h4>
              <p className="text-emerald-200 text-sm font-bold uppercase tracking-widest">Standards</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default GoverningBody;