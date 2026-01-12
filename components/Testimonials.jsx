"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "আব্দুর রহমান",
    role: "অভিভাবক",
    comment: "মাদরাসার শিক্ষার পরিবেশ অত্যন্ত চমৎকার। আমার ছেলে এখানে পড়াশোনার পাশাপাশি আদব-কায়দাও খুব ভালো শিখছে। বিশেষ করে শিক্ষকদের আন্তরিকতা আমাকে মুগ্ধ করেছে।",
    image: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: 2,
    name: "মাহমুদুল হাসান",
    role: "প্রাক্তন ছাত্র",
    comment: "এই মাদরাসা থেকে শিক্ষা লাভ করা আমার জীবনের অন্যতম সেরা অর্জন। এখানকার ধর্মীয় ও আধুনিক শিক্ষার সমন্বয় আমাকে ক্যারিয়ারে অনেক এগিয়ে দিয়েছে।",
    image: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: 3,
    name: "ড. আব্দুল্লাহ আল মামুন",
    role: "শিক্ষাবিদ",
    comment: "দারুন্নাজাত মাদরাসা একটি আদর্শ মানুষ গড়ার প্রতিষ্ঠান। তাদের কারিকুলাম এবং ম্যানেজমেন্ট সিস্টেম আন্তর্জাতিক মানের। আমি এই প্রতিষ্ঠানের উত্তরোত্তর সাফল্য কামনা করি।",
    image: "https://i.pravatar.cc/150?u=3",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // অটো স্লাইডার
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  const prev = () => setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));

  return (
    <section className="py-24 bg-white dark:bg-black transition-colors duration-500 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/10 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-block p-2 bg-orange-100 dark:bg-emerald-900/30 rounded-lg text-orange-600 dark:text-emerald-500 mb-4">
            <Quote size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white">
            অভিভাবকদের <span className="text-zinc-400">মতামত</span>
          </h2>
        </motion.div>

        <div className="relative h-[350px] md:h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute w-full bg-zinc-50 dark:bg-zinc-900 p-8 md:p-12 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl"
            >
              <div className="flex flex-col items-center">
                {/* Stars */}
                <div className="flex gap-1 mb-6 text-orange-500 dark:text-emerald-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>

                {/* Comment */}
                <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 italic font-medium leading-relaxed mb-8">
                  "{reviews[index].comment}"
                </p>

                {/* Profile */}
                <div className="flex items-center gap-4">
                  <img 
                    src={reviews[index].image} 
                    alt={reviews[index].name} 
                    className="w-14 h-14 rounded-full border-2 border-orange-500 dark:border-emerald-500 p-1"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-zinc-900 dark:text-white">{reviews[index].name}</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{reviews[index].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-6">
            <button onClick={prev} className="p-3 bg-white dark:bg-zinc-800 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-700 hover:bg-orange-500 dark:hover:bg-emerald-600 hover:text-white transition-all">
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${index === i ? "w-8 bg-orange-500 dark:bg-emerald-500" : "w-2 bg-zinc-300 dark:bg-zinc-700"}`} />
              ))}
            </div>
            <button onClick={next} className="p-3 bg-white dark:bg-zinc-800 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-700 hover:bg-orange-500 dark:hover:bg-emerald-600 hover:text-white transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}