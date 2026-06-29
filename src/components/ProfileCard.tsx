import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { useCampaignStore } from "@/store/campaignStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K";
  return String(count);
}

export function ProfileCard({
  profile,
  platform,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { addProfile, removeProfile, isProfileSelected } = useCampaignStore();
  const isSelected = isProfileSelected(profile.user_id);

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleToggleList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      removeProfile(profile.user_id);
    } else {
      addProfile(profile);
    }
  };

  // Platform specific icon/badge styles
  const getPlatformBadge = () => {
    switch (platform) {
      case "instagram":
        return {
          icon: "📸",
          label: "Instagram",
          border: "group-hover:border-pink-500/30",
          text: "text-pink-500",
          bg: "bg-pink-50 dark:bg-pink-950/20"
        };
      case "youtube":
        return {
          icon: "📺",
          label: "YouTube",
          border: "group-hover:border-red-500/30",
          text: "text-red-600",
          bg: "bg-red-50 dark:bg-red-950/20"
        };
      case "tiktok":
        return {
          icon: "🎵",
          label: "TikTok",
          border: "group-hover:border-zinc-500/30",
          text: "text-zinc-900 dark:text-zinc-100",
          bg: "bg-zinc-100 dark:bg-zinc-800/40"
        };
      default:
        return {
          icon: "⭐",
          label: "Social",
          border: "group-hover:border-violet-500/30",
          text: "text-violet-500",
          bg: "bg-violet-50 dark:bg-violet-950/20"
        };
    }
  };

  const badge = getPlatformBadge();

  return (
    <div
      onClick={handleClick}
      className={`group flex flex-col justify-between bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800/80 rounded-2xl p-5 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 animate-fade-in ${badge.border}`}
    >
      <div>
        {/* Card Header (Platform tag + Add button) */}
        <div className="flex items-center justify-between mb-4">
          <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
            <span>{badge.icon}</span>
            <span>{badge.label}</span>
          </span>

          <button
            onClick={handleToggleList}
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
              isSelected
                ? "bg-red-500 text-white hover:bg-red-600 shadow-sm"
                : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-violet-600 hover:text-white"
            }`}
            title={isSelected ? "Remove from List" : "Add to List"}
          >
            {isSelected ? "✕" : "＋"}
          </button>
        </div>

        {/* Profile Info Section */}
        <div className="flex flex-col items-center text-center mt-2">
          <div className="relative">
            <img
              src={profile.picture}
              alt={`${profile.fullname} avatar`}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 dark:border-zinc-800 shadow-inner group-hover:scale-105 transition-transform duration-300"
            />
            {profile.is_verified && (
              <span className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] border-2 border-white dark:border-zinc-900">
                ✓
              </span>
            )}
          </div>

          <h3 className="font-bold text-base text-gray-900 dark:text-white mt-3 truncate w-full">
            {profile.fullname}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            @{profile.username}
          </p>
        </div>
      </div>

      {/* Profile Metrics Summary */}
      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-zinc-800/80">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div>
            <span className="block text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">
              Followers
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {formatFollowersLocal(profile.followers)}
            </span>
          </div>

          <div>
            <span className="block text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">
              Eng. Rate
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {profile.engagement_rate !== undefined
                ? (profile.engagement_rate * 100).toFixed(2) + "%"
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
