"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Camera, Maximize2, X, LayoutGrid, Calendar, 
  MapPin, ChevronRight, Sparkles, Loader2 
} from "lucide-react";

const EventGalleryClient = ({ galleryData }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImg, setSelectedImg] = useState(null);

  if (!galleryData) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin text-emerald-500 mb-4" size={40} />
        <p className="font-bold tracking-widest uppercase text-xs">Loading Gallery...</p>
      </div>
    );
  }

  const categories = ["All", ...new Set(galleryData?.galleryImages?.map(img => img.category))];

  const filteredImages = selectedCategory === "All" 
    ? galleryData?.galleryImages || []
    : galleryData?.galleryImages?.filter(img => img.category === selectedCategory) || [];

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-500 pb-20">
      
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
           <img 
             src={galleryData?.heroBgImage?.url || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070"} 
             className="w-full h-full object-cover opacity-40" 
             alt="Chonkhola Madrasah Gallery" 
           />
           <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/60 to-slate-950" />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-xl rounded-full text-emerald-400 text-xs font-black uppercase tracking-[0.3em] mb-6 border border-white/10">
              <Camera size={16} /> Visual History
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-4 tracking-tighter">
              {galleryData?.heroTitle?.split(' ')[0] || "Event"} <span className="text-emerald-500 italic">{galleryData?.heroTitle?.split(' ').slice(1).join(' ') || "Gallery"}</span>
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              {galleryData?.heroDescription || "Capturing the colorful memories of our Madrasah's journey."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- GALLERY FILTER TABS --- */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-slate-100 dark:border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-6">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 rounded-xl text-white">
                <LayoutGrid size={20} />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-sm">Filter Album</h3>
           </div>

           <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-full font-bold text-xs transition-all duration-300 ${
                    selectedCategory === cat 
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* --- IMAGE GRID --- */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((item) => (
              <motion.div
                layout
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group cursor-pointer break-inside-avoid"
                onClick={() => setSelectedImg(item)}
              >
                <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 border border-slate-800 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                  <img 
                    src={item.img?.url || item.img} 
                    alt={item.title} 
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase mb-2">
                       <Sparkles size={12} /> {item.category}
                    </div>
                    <h3 className="text-white text-xl font-bold mb-4">{item.title}</h3>
                    
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4 text-slate-300 text-xs font-medium">
                          <span className="flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                       </div>
                       <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                          <Maximize2 size={18} />
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* --- LIGHTBOX (Details View) --- */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <button onClick={() => setSelectedImg(null)} className="absolute top-10 right-10 text-white hover:text-emerald-500 transition-colors">
              <X size={40} />
            </button>

            <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-12 items-center">
               <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex-1 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 bg-slate-900">
                 <img src={selectedImg.img?.url || selectedImg.img} className="w-full h-auto" alt="Detail" />
               </motion.div>

               <div className="w-full lg:w-96 text-white space-y-6">
                  <div className="inline-block px-4 py-1.5 bg-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {selectedImg.category} Album
                  </div>
                  <h2 className="text-4xl font-black leading-tight">{selectedImg.title}</h2>
                  
                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4 text-slate-400">
                       <Calendar className="text-emerald-500" size={20} />
                       <div>
                         <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">Event Date</p>
                         <p className="font-bold">{selectedImg.date}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 text-slate-400">
                       <MapPin className="text-emerald-500" size={20} />
                       <div>
                         <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">Location</p>
                         <p className="font-bold">{selectedImg.location}</p>
                       </div>
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed italic pt-6 border-t border-white/10">
                    "{selectedImg.description || "This event was a significant milestone for our Madrasah."}"
                  </p>

                  <button className="w-full py-5 bg-white text-slate-900 rounded-3xl font-black flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-all shadow-xl">
                    Share This Memory <ChevronRight size={18} />
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventGalleryClient;