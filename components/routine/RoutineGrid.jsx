import { AnimatePresence, motion } from "framer-motion";

/* eslint-disable react/jsx-no-undef */
// RoutineGrid.js
export default function RoutineGrid({ routines }) {
  return (
    <motion.div 
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {routines.map((item) => (
          <RoutineCard key={item.id} item={item} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

// RoutineCard.js
function RoutineCard({ item }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full">
          {item.class}
        </span>
        <span className="text-slate-500 text-sm font-mono">{item.time}</span>
      </div>
      <h3 className="text-xl font-semibold mb-1">{item.subject}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm italic">Ustadh: {item.teacher}</p>
    </motion.div>
  );
}