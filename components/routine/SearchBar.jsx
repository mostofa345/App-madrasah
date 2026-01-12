export default function SearchBar({ query, setQuery }) {
  return (
    <div className="w-full md:w-64">
      <input
        type="text"
        placeholder="বিষয় দিয়ে খুঁজুন..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-green-500 outline-none"
      />
    </div>
  );
}