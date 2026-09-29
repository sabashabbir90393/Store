import { Search, X } from "lucide-react";

function SearchBar({
  value,
  onChange,
  placeholder = "Search products...",
}) {
  return (
    <div className="rounded-2xl border border-[#E8E4D9] bg-white p-3 shadow-sm">
      <div className="flex items-center gap-3 rounded-xl border border-[#E7E3D9] bg-[#FCFBF7] px-4 py-3.5 transition focus-within:border-[#0F3D35] focus-within:ring-2 focus-within:ring-[#0F3D35]/10">
        <Search
          size={20}
          className="shrink-0 text-[#0F3D35]"
        />

        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#17201D] outline-none placeholder:text-[#929A95] sm:text-base"
          aria-label="Search products"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#6B746F] transition hover:bg-[#EAE7DE] hover:text-[#0F3D35]"
            aria-label="Clear search"
          >
            <X size={17} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;