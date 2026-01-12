const classes = ["All", "Nurani", "Mishkat", "Alim", "Fazil"];

export default function ClassFilter({ selected, setSelected }) {
  return (
    <div className="flex flex-wrap gap-2">
      {classes.map((cls) => (
        <button
          key={cls}
          onClick={() => setSelected(cls)}
          className={`px-4 py-2 rounded-full border transition-all ${
            selected === cls 
            ? "bg-green-600 text-white border-green-600" 
            : "bg-transparent border-slate-300 dark:border-slate-700 hover:border-green-500"
          }`}
        >
          {cls}
        </button>
      ))}
    </div>
  );
}