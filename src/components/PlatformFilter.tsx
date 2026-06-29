import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  // Helpers for platform styling
  const getPlatformColors = (p: Platform) => {
    if (selected !== p) return "bg-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white";
    
    switch (p) {
      case "instagram":
        return "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold shadow-md";
      case "youtube":
        return "bg-red-600 text-white font-semibold shadow-md shadow-red-600/20";
      case "tiktok":
        return "bg-black dark:bg-white text-white dark:text-black font-semibold shadow-md";
      default:
        return "bg-violet-600 text-white font-semibold shadow-md";
    }
  };

  const getIcon = (p: Platform) => {
    switch (p) {
      case "instagram":
        return "📸";
      case "youtube":
        return "📺";
      case "tiktok":
        return "🎵";
      default:
        return "⭐";
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-8 animate-fade-in">
      {/* Platform Tabs Container */}
      <div className="flex p-1.5 bg-gray-100 dark:bg-zinc-900/60 rounded-xl mb-6 border border-gray-200/50 dark:border-zinc-800/40">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-lg cursor-pointer transition-all duration-300 ${getPlatformColors(p)}`}
          >
            <span>{getIcon(p)}</span>
            <span>{getPlatformLabel(p)}</span>
          </button>
        ))}
      </div>

      {/* Search Input Container */}
      <div className="relative w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={`Search ${getPlatformLabel(selected)} creators by username or name...`}
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all duration-200 placeholder-gray-400 text-sm"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </div>
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
