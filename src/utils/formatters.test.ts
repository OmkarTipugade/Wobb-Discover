import { describe, it, expect } from "vitest";
import { formatFollowers, formatEngagementRate } from "./formatters";

describe("formatters utils", () => {
  describe("formatFollowers", () => {
    it("should format values in millions correctly with one decimal place", () => {
      expect(formatFollowers(324000000)).toBe("324.0M");
      expect(formatFollowers(1500000)).toBe("1.5M");
    });

    it("should format values in thousands correctly with one decimal place", () => {
      expect(formatFollowers(120000)).toBe("120.0K");
      expect(formatFollowers(1500)).toBe("1.5K");
    });

    it("should display exact count for values less than 1000", () => {
      expect(formatFollowers(999)).toBe("999");
      expect(formatFollowers(0)).toBe("0");
    });
  });

  describe("formatEngagementRate", () => {
    it("should format decimal engagement rate to percentage correctly", () => {
      expect(formatEngagementRate(0.0182619)).toBe("1.83%");
      expect(formatEngagementRate(0.000125)).toBe("0.01%");
      expect(formatEngagementRate(0.05)).toBe("5.00%");
    });

    it("should return N/A for undefined rate", () => {
      expect(formatEngagementRate(undefined)).toBe("N/A");
    });
  });
});
