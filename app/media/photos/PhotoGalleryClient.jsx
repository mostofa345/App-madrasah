"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageIcon, Maximize2, X, Sparkles, Download, Share2 } from "lucide-react";

const PhotoGalleryClient = ({ initialPhotos }) => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Modern Header Section */}
        <div className="text-center mb-20 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-3xl rotate-12">
              <ImageIcon size={40} />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight"
          >
            Memories in <span className="text-emerald-600">Focus</span>
          </motion.h1>
          <p className="mt-6 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Discover our journey through the lens. Every photo tells a story of dedication, faith, and knowledge.
          </p>
        </div>

        {/* Pinterest Style Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {initialPhotos.map((photo, index) => (
            <motion.div
              key={photo._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedImg(photo)}
              className="relative group cursor-zoom-in overflow-hidden rounded-[2.5rem] border-4 border-white dark:border-slate-900 shadow-lg hover:shadow-2xl hover:border-emerald-500/20 transition-all duration-500"
            >
              {/* Image Size ekhon boro ebong height auto Pinterest er moto */}
              <motion.img 
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6 }}
                src={photo.content?.url} 
                alt={photo.title} 
                className="w-full h-auto object-cover rounded-[2rem]"
              />

              {/* Stylish Pinterest-like Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="flex justify-end">
                   <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-emerald-600 transition-colors">
                      <Maximize2 size={20} />
                   </button>
                </div>
                
                <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-emerald-400" size={16} />
                    <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Featured Memory</span>
                  </div>
                  <h3 className="text-white text-xl font-black leading-tight drop-shadow-lg">
                    {photo.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {initialPhotos.length === 0 && (
          <div className="text-center py-32 bg-slate-50 dark:bg-slate-900/50 rounded-[4rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
             <p className="text-slate-400 font-black text-xl uppercase italic">No photos available in the archive.</p>
          </div>
        )}
      </div>

      {/* Fullscreen Enhanced Lightbox Overlay */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute top-10 right-10 text-white bg-white/10 p-4 rounded-full hover:bg-red-600 transition-all z-[1001]"
              onClick={() => setSelectedImg(null)}
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              className="relative max-w-6xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImg.content?.url} 
                alt={selectedImg.title} 
                className="max-h-[75vh] w-auto rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] border-2 border-white/10"
              />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-10 text-center w-full max-w-2xl"
              >
                <h3 className="text-white text-3xl md:text-5xl font-black tracking-tight mb-6">
                   {selectedImg.title}
                </h3>
                
                <div className="flex justify-center gap-4">
                   <button className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-emerald-500 transition-all">
                      <Download size={20} /> Download
                   </button>
                   <button className="flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-2xl font-black hover:bg-white/20 transition-all">
                      <Share2 size={20} /> Share
                   </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGalleryClient;