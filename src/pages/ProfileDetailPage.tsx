import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useCampaignStore } from "@/store/campaignStore";
import { 
  FiArrowLeft, 
  FiPlus, 
  FiX, 
  FiExternalLink, 
  FiUsers, 
  FiTrendingUp, 
  FiLayers, 
  FiHeart, 
  FiMessageSquare, 
  FiEye, 
  FiActivity, 
  FiLoader 
} from "react-icons/fi";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

function formatFollowersDetail(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(2) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return String(count);
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);
  const { addProfile, removeProfile, isProfileSelected } = useCampaignStore();

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  const isSelected = profileData?.data?.user_profile 
    ? isProfileSelected(profileData.data.user_profile.user_id) 
    : false;

  if (!username) {
    return (
      <Layout>
        <div className="text-center py-12 animate-fade-in">
          <p className="text-red-500 font-semibold mb-4">Invalid profile request</p>
          <Link to="/" className="text-violet-600 font-bold hover:underline inline-flex items-center gap-1">
            <FiArrowLeft />
            <span>Back to search</span>
          </Link>
        </div>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <FiLoader className="animate-spin text-3xl mb-3" />
          <p className="text-sm font-medium">Fetching details from index...</p>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <div className="text-center py-12 max-w-md mx-auto animate-fade-in">
          <p className="text-rose-600 font-semibold mb-4">
            Could not locate detailed profile indices for {username}.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-xl font-bold shadow-md shadow-violet-600/10 hover:shadow-lg transition-all">
            <FiArrowLeft />
            <span>Back to search dashboard</span>
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  const handleToggle = () => {
    if (isSelected) {
      removeProfile(user.user_id);
    } else {
      addProfile(user);
    }
  };

  // Platform specific icon/badge styles
  const getPlatformMetadata = () => {
    switch (platform) {
      case "instagram":
        return {
          icon: <FaInstagram className="text-xs" />,
          label: "Instagram",
          accent: "from-pink-500 via-rose-500 to-yellow-500",
          badgeBg: "bg-pink-50 dark:bg-pink-950/20 text-pink-500"
        };
      case "youtube":
        return {
          icon: <FaYoutube className="text-xs" />,
          label: "YouTube",
          accent: "from-red-600 to-red-800",
          badgeBg: "bg-red-50 dark:bg-red-950/20 text-red-600"
        };
      case "tiktok":
        return {
          icon: <FaTiktok className="text-xs" />,
          label: "TikTok",
          accent: "from-zinc-800 to-zinc-950 dark:from-zinc-800 dark:to-zinc-900",
          badgeBg: "bg-zinc-100 dark:bg-zinc-800/40 text-zinc-900 dark:text-zinc-100"
        };
      default:
        return {
          icon: null,
          label: "Social",
          accent: "from-violet-600 to-indigo-600",
          badgeBg: "bg-violet-50 dark:bg-violet-950/20 text-violet-500"
        };
    }
  };

  const meta = getPlatformMetadata();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto animate-fade-in px-4">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            <FiArrowLeft />
            <span>Back to discovery</span>
          </Link>
        </div>

        {/* Profile Card Main Info Header */}
        <div className="relative overflow-hidden bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm mb-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Banner-like Platform Accent Backdrop */}
          <div className={`absolute top-0 left-0 right-0 h-2 bg-linear-to-r ${meta.accent}`} />

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
            <div className="relative">
              <img
                src={user.picture}
                alt={`${user.fullname} avatar`}
                className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-zinc-900 shadow-md"
              />
              {user.is_verified && (
                <span className="absolute bottom-1 right-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs border-2 border-white dark:border-zinc-900 shadow-sm">
                  ✓
                </span>
              )}
            </div>

            <div className="mt-2">
              <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                  {user.fullname}
                </h2>
                <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${meta.badgeBg}`}>
                  {meta.icon}
                  <span>{meta.label}</span>
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-1">
                @{user.username}
              </p>
              
              {user.description && (
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
                  {user.description}
                </p>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="shrink-0 flex flex-col items-center sm:items-end gap-3 mt-4 md:mt-0 w-full sm:w-auto">
            <button
              onClick={handleToggle}
              className={`w-full sm:w-auto px-5 py-3 text-sm font-bold rounded-xl cursor-pointer shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2 ${
                isSelected
                  ? "bg-rose-50 dark:bg-rose-950/20 text-rose-500 dark:text-rose-400 hover:bg-rose-100 border border-rose-200/50"
                  : "bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-violet-600/10 hover:shadow-lg hover:shadow-violet-600/20"
              }`}
            >
              {isSelected ? <FiX className="text-base" /> : <FiPlus className="text-base" />}
              <span>{isSelected ? "Remove from List" : "Add to Campaign"}</span>
            </button>

            {user.url && (
              <a
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 flex items-center gap-1 py-1"
              >
                <span>Visit Channel Profile</span>
                <FiExternalLink className="text-xs" />
              </a>
            )}
          </div>
        </div>

        {/* Detailed Marketing Metrics Grid */}
        <h3 className="text-sm uppercase font-extrabold text-gray-400 dark:text-gray-500 tracking-widest text-left mb-4">
          Marketing Insights
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {/* Followers reach card */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200/75 dark:border-zinc-800/80 rounded-2xl p-5 text-left shadow-2xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="block text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">
                Follower Reach
              </span>
              <FiUsers className="text-gray-400 dark:text-gray-500 text-base" />
            </div>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1 block">
              {formatFollowersDetail(user.followers)}
            </span>
            <span className="text-[10px] text-gray-400 mt-1 block font-medium">Total active subscriptions</span>
          </div>

          {/* Engagement rate card */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200/75 dark:border-zinc-800/80 rounded-2xl p-5 text-left shadow-2xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="block text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">
                Engagement Rate
              </span>
              <FiTrendingUp className="text-gray-400 dark:text-gray-500 text-base" />
            </div>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1 block">
              {user.engagement_rate !== undefined
                ? (user.engagement_rate * 100).toFixed(2) + "%"
                : "N/A"}
            </span>
            <span className="text-[10px] text-gray-400 mt-1 block font-medium">Audience engagement index</span>
          </div>

          {/* Content posts count card */}
          {user.posts_count !== undefined && (
            <div className="bg-white dark:bg-zinc-900 border border-gray-200/75 dark:border-zinc-800/80 rounded-2xl p-5 text-left shadow-2xs relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="block text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">
                  Total Content
                </span>
                <FiLayers className="text-gray-400 dark:text-gray-500 text-base" />
              </div>
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1 block">
                {user.posts_count}
              </span>
              <span className="text-[10px] text-gray-400 mt-1 block font-medium">Total cataloged posts</span>
            </div>
          )}

          {/* Average likes card */}
          {user.avg_likes !== undefined && (
            <div className="bg-white dark:bg-zinc-900 border border-gray-200/75 dark:border-zinc-800/80 rounded-2xl p-5 text-left shadow-2xs relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="block text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">
                  Avg Post Likes
                </span>
                <FiHeart className="text-gray-400 dark:text-gray-500 text-base" />
              </div>
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1 block">
                {formatFollowersDetail(user.avg_likes)}
              </span>
              <span className="text-[10px] text-gray-400 mt-1 block font-medium">Mean interactions per post</span>
            </div>
          )}

          {/* Average comments card */}
          {user.avg_comments !== undefined && (
            <div className="bg-white dark:bg-zinc-900 border border-gray-200/75 dark:border-zinc-800/80 rounded-2xl p-5 text-left shadow-2xs relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="block text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">
                  Avg Post Comments
                </span>
                <FiMessageSquare className="text-gray-400 dark:text-gray-500 text-base" />
              </div>
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1 block">
                {formatFollowersDetail(user.avg_comments)}
              </span>
              <span className="text-[10px] text-gray-400 mt-1 block font-medium">Mean comments per post</span>
            </div>
          )}

          {/* Average views card */}
          {user.avg_views !== undefined && user.avg_views > 0 && (
            <div className="bg-white dark:bg-zinc-900 border border-gray-200/75 dark:border-zinc-800/80 rounded-2xl p-5 text-left shadow-2xs relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="block text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">
                  Avg Video Views
                </span>
                <FiEye className="text-gray-400 dark:text-gray-500 text-base" />
              </div>
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1 block">
                {formatFollowersDetail(user.avg_views)}
              </span>
              <span className="text-[10px] text-gray-400 mt-1 block font-medium">Mean impressions per video</span>
            </div>
          )}

          {/* Engagements count card */}
          {user.engagements !== undefined && (
            <div className="bg-white dark:bg-zinc-900 border border-gray-200/75 dark:border-zinc-800/80 rounded-2xl p-5 text-left shadow-2xs relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="block text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">
                  Total Interactions
                </span>
                <FiActivity className="text-gray-400 dark:text-gray-500 text-base" />
              </div>
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1 block">
                {formatFollowersDetail(user.engagements)}
              </span>
              <span className="text-[10px] text-gray-400 mt-1 block font-medium">Total comments + likes count</span>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
