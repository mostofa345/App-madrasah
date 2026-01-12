"use client";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Eye, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function BookGrid({ activeCategory }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewBook, setPreviewBook] = useState(null); // Preview modal state

  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/books`; // 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(API_URL);
        setBooks(res.data);
      } catch (err) {
        console.error("Books fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [API_URL]);

  // Filtering Logic
  const filteredBooks = activeCategory === "All Books" 
    ? books 
    : books.filter(b => b.class === activeCategory);

  if (loading) return (
    <div className="py-20 flex justify-center text-emerald-500">
      <Loader2 className="animate-spin" size={40} />
    </div>
  );

  return (
    <section className="py-16 container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredBooks.map((book) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ y: -10 }}
              key={book._id}
              className="group relative"
            >
              <div className="aspect-[3/4] rounded-2xl bg-zinc-200 dark:bg-zinc-800 overflow-hidden shadow-lg border-b-4 border-emerald-600">
                <img src={book.img} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                   <button className="p-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-400 transition-colors shadow-lg">
                      <Download size={20} />
                   </button>
                   <button 
                    onClick={() => setPreviewBook(book)}
                    className="px-4 py-2 bg-white text-zinc-900 rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-zinc-100 transition-colors"
                   >
                      <Eye size={14} /> View Preview
                   </button>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1 block">
                  {book.class}
                </span>
                <h3 className="font-bold text-zinc-800 dark:text-zinc-200 truncate">{book.title}</h3>
                <p className="text-xs text-zinc-400 mt-1">{book.author}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Book Preview Modal */}
      <AnimatePresence>
        {previewBook && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewBook(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-3xl overflow-hidden relative z-10 shadow-2xl"
            >
              <button 
                onClick={() => setPreviewBook(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="p-8 flex flex-col items-center">
                <div className="w-48 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl mb-6">
                  <img src={previewBook.img} alt={previewBook.title} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-2xl font-black text-white text-center">{previewBook.title}</h2>
                <p className="text-emerald-500 font-bold mt-2">{previewBook.class}</p>
                <p className="text-zinc-400 mt-1 italic">{previewBook.author}</p>
                <button className="mt-8 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95">
                  <Download size={20} /> Download PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}