import { useCampaignStore } from "@/store/campaignStore";
import { formatFollowers } from "@/utils/formatters";

export function CampaignDrawer() {
  const { selectedProfiles, isDrawerOpen, setDrawerOpen, removeProfile, clearList } =
    useCampaignStore();

  return (
    <>
      {/* Backdrop overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Campaign List</h2>
            <p className="text-xs text-gray-500">
              {selectedProfiles.length}{" "}
              {selectedProfiles.length === 1 ? "creator" : "creators"} selected
            </p>
          </div>
          <div className="flex items-center gap-2">
            {selectedProfiles.length > 0 && (
              <button
                onClick={clearList}
                className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close drawer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Profile list */}
        <div className="overflow-y-auto h-[calc(100%-73px)] p-4">
          {selectedProfiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <span className="text-4xl mb-3">📋</span>
              <p className="text-sm font-medium">No creators selected</p>
              <p className="text-xs mt-1">
                Browse influencers and add them to your campaign list
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {selectedProfiles.map((profile) => (
                <li
                  key={profile.user_id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={profile.picture}
                    alt={`${profile.fullname} avatar`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      @{profile.username}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {profile.fullname} · {formatFollowers(profile.followers)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeProfile(profile.user_id)}
                    className="shrink-0 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    aria-label={`Remove ${profile.fullname} from list`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
