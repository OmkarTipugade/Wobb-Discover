import { describe, it, expect } from "vitest";
import { extractProfiles, filterProfiles, getPlatformLabel } from "./dataHelpers";
import type { UserProfileSummary } from "@/types";

describe("dataHelpers utils", () => {
  describe("getPlatformLabel", () => {
    it("should return the correct label for each platform", () => {
      expect(getPlatformLabel("instagram")).toBe("Instagram");
      expect(getPlatformLabel("youtube")).toBe("YouTube");
      expect(getPlatformLabel("tiktok")).toBe("TikTok");
    });
  });

  describe("extractProfiles", () => {
    it("should extract profiles and guarantee non-empty username fallback", () => {
      const youtubeProfiles = extractProfiles("youtube");
      
      expect(youtubeProfiles.length).toBeGreaterThan(0);
      
      // Every profile must have username, fullname, followers, etc.
      youtubeProfiles.forEach((profile) => {
        expect(profile.user_id).toBeDefined();
        expect(profile.fullname).toBeDefined();
        expect(typeof profile.username).toBe("string");
        expect(profile.username.length).toBeGreaterThan(0);
      });

      // Assert special fallback case for VladandNiki who lacks username in raw json
      const vlad = youtubeProfiles.find((p) => p.user_id === "UCvlE5gTbOvjiolFlEm-c_Ow");
      expect(vlad).toBeDefined();
      expect(vlad?.username).toBe("VladandNiki"); // fallback to handle
    });
  });

  describe("filterProfiles", () => {
    const mockProfiles: UserProfileSummary[] = [
      {
        user_id: "1",
        username: "mrbeast",
        fullname: "Jimmy Donaldson",
        followers: 1000000,
        url: "",
        picture: "",
        is_verified: true,
      },
      {
        user_id: "2",
        username: "tseries",
        fullname: "T-Series Music",
        followers: 2000000,
        url: "",
        picture: "",
        is_verified: true,
      },
    ];

    it("should return all profiles if query is empty", () => {
      expect(filterProfiles(mockProfiles, "")).toEqual(mockProfiles);
    });

    it("should filter case-insensitively by username", () => {
      const result = filterProfiles(mockProfiles, "BEAST");
      expect(result.length).toBe(1);
      expect(result[0].username).toBe("mrbeast");
    });

    it("should filter case-insensitively by fullname", () => {
      const result = filterProfiles(mockProfiles, "donaldson");
      expect(result.length).toBe(1);
      expect(result[0].username).toBe("mrbeast");
    });

    it("should match by partial strings", () => {
      const result = filterProfiles(mockProfiles, "series");
      expect(result.length).toBe(1);
      expect(result[0].username).toBe("tseries");
    });

    it("should return empty array if no match is found", () => {
      const result = filterProfiles(mockProfiles, "xyz");
      expect(result.length).toBe(0);
    });
  });
});
