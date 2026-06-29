import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CampaignDrawer } from "./CampaignDrawer";
import { useCampaignStore } from "@/store/campaignStore";
import { FiList } from "react-icons/fi";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const { selectedProfiles, toggleDrawer } = useCampaignStore();
  const count = selectedProfiles.length;

  return (
    <div className="flex flex-col min-h-screen bg-[#faf9fb] dark:bg-[#0d0c0f] transition-colors duration-300">
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 w-full border-b border-gray-200/60 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              Wobb
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 rounded-md border border-violet-100 dark:border-violet-900/30">
              Discover
            </span>
          </Link>

          <button
            onClick={toggleDrawer}
            className="group relative flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs sm:text-sm font-semibold rounded-xl cursor-pointer shadow-md shadow-violet-600/10 hover:shadow-lg hover:shadow-violet-600/20 active:scale-98 transition-all duration-200"
          >
            <FiList className="text-sm" />
            <span>Campaign List</span>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm animate-pulse">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        {title && (
          <div className="mb-6 animate-fade-in text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-zinc-300 dark:to-white bg-clip-text text-transparent">
              {title}
            </h1>
          </div>
        )}
        <div className="w-full">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 mt-12 border-t border-gray-200/50 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-950/20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 dark:text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} Wobb Premium Assignment. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Candidate Assessment Portfolio</span>
          </div>
        </div>
      </footer>

      {/* Sidebar Drawer */}
      <CampaignDrawer />
    </div>
  );
}
