"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Video, Play, X, Youtube, FileVideo } from "lucide-react";

const VideoGalleryClient = ({ initialVideos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` 
      : url;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="flex justify-center mb-4"
          >
            <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full shadow-lg">
              <Video size={32} />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white"
          >
            ভিডিও <span className="text-red-600">গ্যালারি</span>
          </motion.h1>
          <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium">মাদরাসার বিশেষ অনুষ্ঠান ও কার্যক্রমের ভিডিওসমূহ</p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialVideos.map((video, index) => (
            <motion.div
              key={video._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800 group cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              {/* Thumbnail Area */}
              <div className="relative aspect-video bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                {video.uploadType === "link" ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                     <Youtube size={60} className="text-red-600 opacity-20 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                ) : (
                  <FileVideo size={60} className="text-slate-400 opacity-20 group-hover:opacity-100 transition-all duration-500" />
                )}
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-500 flex items-center justify-center">
                  <div className="w-20 h-20 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Play fill="currentColor" size={32} className="ml-1" />
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-8">
                <h3 className="text-xl font-black text-slate-800 dark:text-white line-clamp-2 group-hover:text-red-600 transition-colors tracking-tight">
                  {video.title}
                </h3>
                <div className="w-12 h-1 bg-red-100 dark:bg-red-900/30 my-4 rounded-full group-hover:w-24 transition-all duration-500"></div>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 italic font-medium leading-relaxed">
                  {video.description || "মাদরাসা মিডিয়া উইং"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Player Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <button 
                className="absolute top-8 right-8 text-white bg-red-600 p-3 rounded-2xl shadow-2xl hover:bg-red-700 transition-all z-[1001] active:scale-90"
                onClick={() => setSelectedVideo(null)}
              >
                <X size={28} />
              </button>

              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-6xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(220,38,38,0.2)] border-2 border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedVideo.uploadType === "link" ? (
                  <iframe
                    src={getEmbedUrl(selectedVideo.videoLink)}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    src={selectedVideo.videoFile?.url}
                    controls
                    autoPlay
                    className="w-full h-full"
                  ></video>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VideoGalleryClient;