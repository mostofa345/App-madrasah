"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, Download, Feather, Share2 } from "lucide-react";

const MagazinePage = () => {
  const archives = [
    { id: 1, title: "রিসালাতুল জামিয়া - ২০২৪", theme: "রমজান সংখ্যা", image: "https://images.unsplash.com/photo-1544640808-32ca72ac7f37?q=80&w=1000" },
    { id: 2, title: "জাগরণ - ২০২৩", theme: "বিজয় দিবস সংখ্যা", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000" },
    { id: 3, title: "আল-ইলম - ২০২২", theme: "বার্ষিক সংকলন", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000" },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcf9] dark:bg-slate-950 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b dark:border-slate-900 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-bold">
              <Feather size={16} /> আমাদের কণ্ঠস্বর
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-900 dark:text-white leading-tight">
              রিসালাতুল <span className="text-amber-600">জামিয়া</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed italic">
              "মাদরাসার ছাত্রদের জ্ঞান ও সাহিত্য চর্চার এক অনন্য প্ল্যাটফর্ম। যেখানে কলমের কালিতে ফুটে ওঠে ইসলামের সুমহান আদর্শ ও সমকালীন ভাবনা।"
            </p>
            <div className="flex gap-4">
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-amber-200 dark:shadow-none transition-all flex items-center gap-2">
                সর্বশেষ সংখ্যা পড়ুন <BookOpen size={20} />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 w-full aspect-[3/4] max-w-sm mx-auto bg-white shadow-2xl rounded-tr-[4rem] rounded-bl-[4rem] overflow-hidden border-8 border-white dark:border-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000" 
                className="w-full h-full object-cover" 
                alt="Magazine Cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-white font-bold text-xl uppercase tracking-widest">জানুয়ারি ২০২৪ সংখ্যা</p>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-200/50 dark:bg-amber-900/20 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Magazine Description Section */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <motion.h2 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            className="text-3xl md:text-4xl font-bold dark:text-white"
          >
            ম্যাগাজিন সম্পর্কে কিছু কথা
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "চিন্তার স্বাধীনতা", desc: "ছাত্রদের সৃজনশীল চিন্তা ও গবেষণাধর্মী লেখার বিকাশ ঘটানো।" },
              { title: "ইসলামী আদর্শ", desc: "শুদ্ধ ইসলামী তাহজীব-তামাদ্দুনকে বিশ্ববাসীর কাছে পৌঁছে দেওয়া।" },
              { title: "সাহিত্য চর্চা", desc: "আরবি, বাংলা ও ইংরেজি ভাষায় সাহিত্যিক দক্ষতা বৃদ্ধি করা।" },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl text-left border dark:border-slate-700">
                <h4 className="font-black text-amber-600 mb-2">{item.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Archives Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-3xl font-bold dark:text-white">পুরানো সংখ্যাসমূহ</h3>
              <p className="text-slate-500">আমাদের অতীতের সকল প্রকাশনা এখান থেকে দেখুন</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-amber-600 font-bold">
              সব দেখুন <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {archives.map((mag, idx) => (
              <motion.div 
                key={mag.id}
                whileHover={{ scale: 1.02 }}
                className="group bg-white dark:bg-slate-900 p-4 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border dark:border-slate-800 transition-all"
              >
                <div className="relative h-72 rounded-[2rem] overflow-hidden mb-6">
                  <img src={mag.image} alt={mag.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-full text-xs font-bold dark:text-white shadow-lg">
                      PDF
                    </span>
                  </div>
                </div>
                <div className="px-2 pb-4">
                  <h4 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-amber-600 transition-colors">
                    {mag.title}
                  </h4>
                  <p className="text-slate-500 text-sm mt-1 mb-6">{mag.theme}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-amber-600 hover:text-white dark:text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                      <Download size={16} /> ডাউনলোড
                    </button>
                    <button className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl dark:text-white transition-all">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribution CTA */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-slate-900 to-slate-800 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white">আপনার লেখা আমাদের পাঠান</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              আগামী সংখ্যায় আপনার প্রবন্ধ, কবিতা বা গল্প প্রকাশ করতে চান? আপনার লেখাটি পাঠিয়ে দিন আমাদের কাছে।
            </p>
            <button className="bg-amber-600 hover:bg-amber-500 text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg shadow-amber-900/20">
              লেখা জমা দিন
            </button>
          </div>
          {/* Background Decor */}
          <div className="absolute top-0 left-0 opacity-10">
            <BookOpen size={300} />
          </div>
        </div>
      </section>

    </div>
  );
};

export default MagazinePage;