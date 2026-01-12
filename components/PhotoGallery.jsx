"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, X, ZoomIn } from "lucide-react";

export default function PhotoGallery() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  // API থেকে ডেটা নিয়ে আসা
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get("https://madrasah-server.onrender.com/api/photos/get-photos");
        setPhotos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Title Section - ১০০% সেম রাখা হয়েছে */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-orange-600 dark:text-emerald-500 font-bold mb-2"
            >
              <Camera size={20} /> <span>আমাদের গ্যালারি</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white"
            >
              মাদরাসার <span className="text-zinc-400">স্মরণীয়</span> মুহূর্তসমূহ
            </motion.h2>
          </div>
          
          {/* 'সব ছবি দেখুন' বাটন যা /media/photos এ নিয়ে যাবে */}
          <Link href="/media/photos">
            <button className="text-sm font-bold bg-zinc-100 dark:bg-zinc-900 px-6 py-2 rounded-full hover:bg-orange-500 hover:text-white transition-all">
              সব ছবি দেখুন
            </button>
          </Link>
        </div>

        {/* Photo Grid */}
        {loading ? (
          <div className="text-center py-10 text-zinc-500">লোড হচ্ছে...</div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {photos.map((photo, index) => (
              <motion.div
                key={photo._id} // MongoDB ID ব্যবহার করা হয়েছে
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedImg(photo)}
                className="relative group cursor-pointer overflow-hidden rounded-2xl break-inside-avoid border border-zinc-200 dark:border-zinc-800"
              >
                <motion.img
                  src={photo.src} // Cloudinary URL
                  alt={photo.title}
                  whileHover={{ scale: 1.05 }}
                  className="w-full h-auto object-cover transition-transform duration-500"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <div className="flex justify-between items-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <p className="text-white font-bold">{photo.title}</p>
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
                      <ZoomIn size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImg(null)}
          >
            <motion.button
              whileHover={{ rotate: 90 }}
              onClick={() => setSelectedImg(null)}
              className="absolute top-10 right-10 text-white p-2 bg-white/10 rounded-full"
            >
              <X size={30} />
            </motion.button>

            <motion.img
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              src={selectedImg.src}
              alt="Selected"
              className="max-w-full max-h-full rounded-lg shadow-2xl border-4 border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white bg-black/50 px-6 py-2 rounded-full backdrop-blur-md border border-white/10 whitespace-nowrap">
              {selectedImg.title}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}