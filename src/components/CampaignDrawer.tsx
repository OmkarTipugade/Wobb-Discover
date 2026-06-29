import { useCampaignStore } from "@/store/campaignStore";
import { formatFollowers } from "@/utils/formatters";

export function CampaignDrawer() {
  const { selectedProfiles, isDrawerOpen, setDrawerOpen, removeProfile, clearList } =
    useCampaignStore();

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["User ID,Username,Full Name,Followers"].concat(
        selectedProfiles.map(p => `"${p.user_id}","${p.username}","${p.fullname}",${p.followers}`)
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `wobb_campaign_list_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/45 dark:bg-black/60 backdrop-blur-xs z-40 transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Side Panel Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-zinc-950 border-l border-gray-200/80 dark:border-zinc-800/80 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-zinc-800/60 bg-gray-50/50 dark:bg-zinc-900/10">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Campaign Shortlist</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {selectedProfiles.length} {selectedProfiles.length === 1 ? "influencer" : "influencers"} shortlisted
            </p>
          </div>
          <div className="flex items-center gap-2">
            {selectedProfiles.length > 0 && (
              <button
                onClick={clearList}
                className="text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 font-semibold px-2 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
              aria-label="Close drawer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Profiles Section */}
        <div className="flex-1 overflow-y-auto p-5">
          {selectedProfiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 dark:text-gray-500">
              <div className="w-16 h-16 flex items-center justify-center bg-gray-50 dark:bg-zinc-900/50 rounded-full mb-4 text-2xl border border-gray-100 dark:border-zinc-800">
                📋
              </div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Your shortlist is empty</p>
              <p className="text-xs mt-1 max-w-xs px-4">
                Click the "+" icon on creator profiles to build your outreach campaign.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {selectedProfiles.map((profile) => (
                <li
                  key={profile.user_id}
                  className="flex items-center gap-3.5 p-3.5 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-xl hover:border-violet-500/20 dark:hover:border-violet-500/20 transition-all duration-200 group"
                >
                  <img
                    src={profile.picture}
                    alt={`${profile.fullname} avatar`}
                    className="w-11 h-11 rounded-full object-cover border border-gray-100 dark:border-zinc-800 group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                      {profile.fullname}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate">
                      @{profile.username} · <span className="font-semibold text-violet-600 dark:text-violet-400">{formatFollowers(profile.followers)}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => removeProfile(profile.user_id)}
                    className="p-1 text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg cursor-pointer transition-colors"
                    aria-label={`Remove ${profile.fullname}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Shortlist Footer Section */}
        {selectedProfiles.length > 0 && (
          <div className="p-5 border-t border-gray-100 dark:border-zinc-800/60 bg-gray-50/50 dark:bg-zinc-900/10">
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl cursor-pointer shadow-md shadow-violet-600/10 hover:shadow-lg hover:shadow-violet-600/20 transition-all duration-200"
            >
              <span>📥</span>
              <span>Export Shortlist (CSV)</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
