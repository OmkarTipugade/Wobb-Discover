import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import type { UserProfileSummary } from "@/types";

// Mock localStorage for Zustand persist middleware in Node environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Define global.window and global.localStorage to satisfy Zustand persist checks
Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  writable: true,
});

Object.defineProperty(globalThis, "window", {
  value: {
    localStorage: localStorageMock,
  },
  writable: true,
});

// Import dynamically to avoid ES6 hoisting before localStorage/window is defined
let useCampaignStore: any;

describe("campaignStore", () => {
  beforeAll(async () => {
    const module = await import("./campaignStore");
    useCampaignStore = module.useCampaignStore;
  });

  beforeEach(() => {
    useCampaignStore.getState().clearList();
    useCampaignStore.getState().setDrawerOpen(false);
  });

  const mockProfile: UserProfileSummary = {
    user_id: "test-user-1",
    username: "testcreator",
    fullname: "Test Creator",
    followers: 500000,
    url: "https://example.com/test",
    picture: "https://example.com/pic.jpg",
    is_verified: true,
  };

  it("should initialize with empty selectedProfiles and drawer closed", () => {
    const state = useCampaignStore.getState();
    expect(state.selectedProfiles).toEqual([]);
    expect(state.isDrawerOpen).toBe(false);
  });

  it("should toggle the drawer open state", () => {
    const store = useCampaignStore.getState();
    expect(store.isDrawerOpen).toBe(false);
    
    store.toggleDrawer();
    expect(useCampaignStore.getState().isDrawerOpen).toBe(true);

    store.toggleDrawer();
    expect(useCampaignStore.getState().isDrawerOpen).toBe(false);
  });

  it("should add a profile to selectedProfiles", () => {
    const store = useCampaignStore.getState();
    store.addProfile(mockProfile);

    const updatedState = useCampaignStore.getState();
    expect(updatedState.selectedProfiles).toHaveLength(1);
    expect(updatedState.selectedProfiles[0]).toEqual(mockProfile);
    expect(updatedState.isProfileSelected(mockProfile.user_id)).toBe(true);
  });

  it("should prevent duplicate profiles from being added", () => {
    const store = useCampaignStore.getState();
    store.addProfile(mockProfile);
    store.addProfile(mockProfile); // duplicate

    const updatedState = useCampaignStore.getState();
    expect(updatedState.selectedProfiles).toHaveLength(1);
  });

  it("should remove a profile by user_id", () => {
    const store = useCampaignStore.getState();
    store.addProfile(mockProfile);
    expect(useCampaignStore.getState().selectedProfiles).toHaveLength(1);

    store.removeProfile(mockProfile.user_id);
    expect(useCampaignStore.getState().selectedProfiles).toHaveLength(0);
    expect(useCampaignStore.getState().isProfileSelected(mockProfile.user_id)).toBe(false);
  });

  it("should clear all selected profiles", () => {
    const store = useCampaignStore.getState();
    store.addProfile(mockProfile);
    store.addProfile({ ...mockProfile, user_id: "test-user-2" });
    expect(useCampaignStore.getState().selectedProfiles).toHaveLength(2);

    store.clearList();
    expect(useCampaignStore.getState().selectedProfiles).toHaveLength(0);
  });
});
