import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useCampaignStore } from "@/store/campaignStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M followers";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K followers";
  return count + " followers";
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

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-3 border border-gray-300 mb-2 cursor-pointer hover:bg-gray-50 w-full max-w-2xl rounded-lg transition-colors"
    >
      <img src={profile.picture} alt={`${profile.fullname} avatar`} className="w-12 h-12 rounded-full" />
      <div className="text-left flex-1">
        <div className="font-bold">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-600">{profile.fullname}</div>
        <div className="text-sm">{formatFollowersLocal(profile.followers)}</div>
      </div>
      <button
        onClick={handleToggleList}
        className={`px-3 py-1 text-sm rounded-md font-medium transition-colors ${
          isSelected
            ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
            : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
      >
        {isSelected ? "Remove" : "Add to List"}
      </button>
    </div>
  );
}
