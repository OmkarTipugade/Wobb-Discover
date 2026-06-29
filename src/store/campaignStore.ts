import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary } from "@/types";

interface CampaignState {
  // State
  selectedProfiles: UserProfileSummary[];
  isDrawerOpen: boolean;

  // Actions
  toggleDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
  addProfile: (profile: UserProfileSummary) => void;
  removeProfile: (userId: string) => void;
  clearList: () => void;
  isProfileSelected: (userId: string) => boolean;
}

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set, get) => ({
      selectedProfiles: [],
      isDrawerOpen: false,

      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      setDrawerOpen: (open: boolean) => set({ isDrawerOpen: open }),

      addProfile: (profile: UserProfileSummary) =>
        set((state) => {
          const alreadyExists = state.selectedProfiles.some(
            (p) => p.user_id === profile.user_id
          );
          if (alreadyExists) return state;
          return { selectedProfiles: [...state.selectedProfiles, profile] };
        }),

      removeProfile: (userId: string) =>
        set((state) => ({
          selectedProfiles: state.selectedProfiles.filter(
            (p) => p.user_id !== userId
          ),
        })),

      clearList: () => set({ selectedProfiles: [] }),

      isProfileSelected: (userId: string) =>
        get().selectedProfiles.some((p) => p.user_id === userId),
    }),
    {
      name: "wobb-campaign-store",
      // Only persist the profile list, not transient UI state like drawer open/close
      partialize: (state) => ({
        selectedProfiles: state.selectedProfiles,
      }),
    }
  )
);
