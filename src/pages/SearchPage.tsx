import { useState } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");
  const [, setClickCount] = useState(0);

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

  const handleProfileClick = (username: string) => {
    setClickCount((prev) => {
      const next = prev + 1;
      console.log("Clicked profile:", username, "total clicks:", next);
      return next;
    });
  };

  return (
    <Layout title="Discover Creators">
      <div className="max-w-4xl mx-auto text-center mb-8 px-4 animate-fade-in">
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
          Explore and filter top influencers across Instagram, YouTube, and TikTok to build your next campaign team.
        </p>
      </div>

      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="w-full max-w-6xl mx-auto px-4 mb-4 flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium animate-fade-in">
        <span>
          Showing <span className="text-violet-600 dark:text-violet-400 font-semibold">{filtered.length}</span> of {allProfiles.length} creators
        </span>
        <span className="capitalize px-2 py-0.5 bg-gray-100 dark:bg-zinc-800 rounded-md text-xs font-semibold text-gray-600 dark:text-gray-300">
          {platform} Index
        </span>
      </div>

      <ProfileList
        profiles={filtered}
        platform={platform}
        onProfileClick={handleProfileClick}
      />
    </Layout>
  );
}
