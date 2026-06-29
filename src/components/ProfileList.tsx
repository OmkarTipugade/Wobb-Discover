import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  onProfileClick: (username: string) => void;
}

export function ProfileList({
  profiles,
  platform,
  onProfileClick,
}: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <span className="text-5xl mb-4">🔍</span>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">No profiles found</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xs">
          We couldn't find any creators matching your filter or query. Try another search.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.user_id}
            profile={profile}
            platform={platform}
            onProfileClick={onProfileClick}
          />
        ))}
      </div>
    </div>
  );
}
