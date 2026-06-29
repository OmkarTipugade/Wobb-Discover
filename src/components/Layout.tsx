import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CampaignDrawer } from "./CampaignDrawer";
import { useCampaignStore } from "@/store/campaignStore";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const { selectedProfiles, toggleDrawer } = useCampaignStore();
  const count = selectedProfiles.length;

  return (
    <div className="p-4 min-h-screen">
      <header className="mb-6 border-b pb-4 flex items-center justify-between">
        <div>
          <Link to="/" className="text-xl font-semibold text-gray-900">
            Influencer Search
          </Link>
          {title && <h1 className="text-2xl mt-2">{title}</h1>}
        </div>
        <button
          onClick={toggleDrawer}
          className="relative px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
        >
          📋 Campaign List
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {count}
            </span>
          )}
        </button>
      </header>
      <main>{children}</main>
      <CampaignDrawer />
    </div>
  );
}
