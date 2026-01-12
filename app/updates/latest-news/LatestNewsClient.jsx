"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Calendar, Clock, ArrowRight, Share2, Bookmark,
  Bell, Search, TrendingUp, X, Loader2
} from "lucide-react";

const LatestNewsClient = ({ initialNews }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ["All", "Events", "Academic", "Admission", "Notice"];

  // Filter Logic (Database data theke filter hocche)
  const filteredNews = initialNews.filter(item => {
    const matchesCategory = activeTab === "All" || item.category === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const trendingNews = initialNews.filter(item => item.isTrending).slice(0, 4);

  const handleReadMore = (news) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500 pb-20">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-40 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center md:text-left md:flex items-end justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest mb-6">
                <Bell size={14} className="animate-bounce" /> Live Updates
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                Latest <span className="text-emerald-500">News</span> & Events
              </h1>
              <p className="max-w-2xl text-slate-400 text-lg leading-relaxed">
                Madrasah-r protyekti khobor ekhon ekebare apnar hater muthoy.
              </p>
            </div>
            
            <div className="mt-10 md:mt-0 relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-emerald-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search khobor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 -mt-24 relative z-20">
        <div className="flex flex-wrap gap-3 mb-12 bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                activeTab === cat 
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30" 
                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            <AnimatePresence mode="wait">
              {filteredNews.length > 0 ? (
                filteredNews.map((news) => (
                  <motion.article
                    key={news._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 group"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-2/5 h-64 md:h-auto overflow-hidden relative">
                        <img 
                          src={news.image?.url || "https://via.placeholder.com/400x300"} 
                          alt={news.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>

                      <div className="p-8 md:w-3/5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-4 text-slate-400 text-xs font-bold mb-4">
                            <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(news.createdAt).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1"><Clock size={14} /> {news.readTime}</span>
                          </div>
                          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 line-clamp-2">
                            {news.title}
                          </h2>
                          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                            {news.description}
                          </p>
                        </div>
                        <div className="pt-6 border-t border-slate-50 dark:border-slate-800">
                          <button onClick={() => handleReadMore(news)} className="flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-wider group/btn">
                            Read More <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <div className="text-center py-20 text-slate-500 font-bold">No news articles found.</div>
              )}
            </AnimatePresence>
          </div>

          <aside className="lg:col-span-4 space-y-10">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl sticky top-24">
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                <TrendingUp className="text-emerald-500" /> Trending Now
              </h3>
              <div className="space-y-6">
                {trendingNews.map((item) => (
                  <div key={item._id} onClick={() => handleReadMore(item)} className="flex gap-4 group cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                       <img src={item.image?.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 group-hover:text-emerald-500 transition-colors">
                      {item.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* --- NEWS DETAIL MODAL --- */}
      <AnimatePresence>
        {isModalOpen && selectedNews && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 z-10 p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
              <div className="overflow-y-auto max-h-[90vh] no-scrollbar pb-12">
                <img src={selectedNews.image?.url} className="w-full h-80 object-cover" alt={selectedNews.title} />
                <div className="p-8 md:p-12 -mt-10 relative bg-white dark:bg-slate-900 rounded-t-[3rem]">
                  <div className="flex gap-6 text-slate-400 text-sm font-bold mb-6">
                    <span className="flex items-center gap-2"><Calendar size={18} className="text-emerald-500"/> {new Date(selectedNews.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-2"><Clock size={18} className="text-emerald-500"/> {selectedNews.readTime}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 leading-tight">{selectedNews.title}</h2>
                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">{selectedNews.description}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LatestNewsClient;