"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Award, BookOpen, CheckCircle2, 
  History, Lightbulb, Target, Users 
} from "lucide-react";

const IntroductionClient = ({ data }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-20">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src={data.heroImage} 
          alt={data.heroImageAlt} 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 dark:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-center md:text-left md:w-2/3"
          >
            <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">
              {data.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl">
              {data.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="max-w-7xl mx-auto px-4 -mt-20 relative z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-16 shadow-2xl border dark:border-slate-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 text-blue-600 mb-4">
                <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
                <span className="font-black uppercase tracking-widest text-sm">At a Glance</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white mb-6">
                {data.overviewTitle}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed whitespace-pre-line">
                {data.overviewDesc}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                { icon: <BookOpen />, title: "Modern Education", desc: "Integrated curriculum" },
                { icon: <Users />, title: "Expert Teachers", desc: "Skillful mentorship" },
                { icon: <Award />, title: "Best Results", desc: "Glorious achievement" }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl">
                    <div className="text-blue-500 mb-4">{item.icon}</div>
                    <h4 className="font-bold text-slate-800 dark:text-white">{item.title}</h4>
                 </div>
               ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* History Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-blue-500/10 rounded-[3rem] blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
            <img 
              src={data.historyImage} 
              alt={data.historyImageAlt} 
              className="relative rounded-[2.5rem] shadow-2xl object-cover w-full h-[500px]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 text-emerald-500 mb-4">
              <History size={24} />
              <span className="font-black uppercase tracking-widest text-sm">Our Journey</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white mb-8">
              {data.historyTitle}
            </h2>
            <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              <p>{data.historyDesc1}</p>
              <p>{data.historyDesc2}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3rem]"
            >
              <Target className="text-blue-400 mb-6" size={48} />
              <h3 className="text-3xl font-black text-white mb-4">Our Vision</h3>
              <p className="text-slate-400 text-lg leading-relaxed">{data.vision}</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3rem]"
            >
              <Lightbulb className="text-yellow-400 mb-6" size={48} />
              <h3 className="text-3xl font-black text-white mb-4">Our Mission</h3>
              <p className="text-slate-400 text-lg leading-relaxed">{data.mission}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white mb-4">Our Core Values</h2>
          <p className="text-slate-500">The ideals upon which our institution is built</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.coreValues?.map((value, idx) => (
            <motion.div
              key={value._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-blue-500/5 transition-all"
            >
              <div className="mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{value.title}</h4>
              <p className="text-slate-600 dark:text-slate-400">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default IntroductionClient;