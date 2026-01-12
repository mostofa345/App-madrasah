"use client";
import { motion } from "framer-motion";

const tiers = [
  { id: 'nurani', label: 'নূরানী ও ইবতেদায়ী', classes: ['Nurani 1', 'Ebtedayi 1', 'Ebtedayi 2', 'Ebtedayi 3', 'Ebtedayi 4', 'Ebtedayi 5'] },
  { id: 'dakhil', label: 'দাখিল (৬ষ্ঠ - ১০ম)', classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'] },
  { id: 'alim', label: 'আলিম (১ম ও ২য় বর্ষ)', classes: ['Alim 1st Year', 'Alim 2nd Year'] },
  { id: 'fazil', label: 'ফাজিল (স্নাতক)', classes: ['Fazil 1st Year', 'Fazil 2nd Year', 'Fazil 3rd Year'] }
];

export default function AcademicTierFilter({ activeTier, setActiveTier, activeClass, setActiveClass }) {
  return (
    <section className="py-12 bg-white dark:bg-zinc-950 border-b dark:border-zinc-800">
      <div className="container mx-auto px-6">
        {/* Tier Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {tiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => {setActiveTier(tier.id); setActiveClass(tier.classes[0]);}}
              className={`px-8 py-4 rounded-2xl font-bold transition-all ${
                activeTier === tier.id 
                ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20" 
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>

        {/* Sub-Class Selector */}
        <motion.div 
          layout
          className="flex flex-wrap justify-center gap-2"
        >
          {tiers.find(t => t.id === activeTier)?.classes.map((cls) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={cls}
              onClick={() => setActiveClass(cls)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                activeClass === cls
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-500"
              }`}
            >
              {cls}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}