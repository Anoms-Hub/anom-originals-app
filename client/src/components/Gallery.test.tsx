import { describe, it, expect } from "vitest";
import { galleryItems, categoryLabels, getCategoryColor, getCategoryBorderColor } from "@/data/galleryData";

describe("Gallery Data", () => {
  it("should have gallery items with all required fields", () => {
    galleryItems.forEach((item) => {
      expect(item.id).toBeDefined();
      expect(item.title).toBeDefined();
      expect(item.description).toBeDefined();
      expect(item.imageUrl).toBeDefined();
      expect(item.category).toBeDefined();
      expect(item.tags).toBeDefined();
      expect(Array.isArray(item.tags)).toBe(true);
    });
  });

  it("should have items in all 4 categories", () => {
    const categories = new Set(galleryItems.map((item) => item.category));
    expect(categories.has("backgrounds")).toBe(true);
    expect(categories.has("emotes")).toBe(true);
    expect(categories.has("mood-collection")).toBe(true);
    expect(categories.has("profile-pictures")).toBe(true);
  });

  it("should have at least 3 items per category", () => {
    const categoryCounts = {
      backgrounds: 0,
      emotes: 0,
      "mood-collection": 0,
      "profile-pictures": 0,
    };

    galleryItems.forEach((item) => {
      categoryCounts[item.category as keyof typeof categoryCounts]++;
    });

    Object.values(categoryCounts).forEach((count) => {
      expect(count).toBeGreaterThanOrEqual(3);
    });
  });

  it("should have valid category labels", () => {
    expect(categoryLabels.backgrounds).toBe("Background Images");
    expect(categoryLabels.emotes).toBe("Emotes & Merchandise");
    expect(categoryLabels["mood-collection"]).toBe("Anom Mood Collection");
    expect(categoryLabels["profile-pictures"]).toBe("Profile Pictures & Identity");
  });

  it("should return valid color classes for categories", () => {
    const categories = ["backgrounds", "emotes", "mood-collection", "profile-pictures"] as const;
    
    categories.forEach((category) => {
      const color = getCategoryColor(category);
      expect(color).toBeTruthy();
      expect(typeof color).toBe("string");
      expect(color.includes("glow") || color.includes("text")).toBe(true);
    });
  });

  it("should return valid border colors for categories", () => {
    const categories = ["backgrounds", "emotes", "mood-collection", "profile-pictures"] as const;
    
    categories.forEach((category) => {
      const borderColor = getCategoryBorderColor(category);
      expect(borderColor).toBeTruthy();
      expect(typeof borderColor).toBe("string");
      expect(borderColor.includes("border")).toBe(true);
    });
  });

  it("should have unique item IDs", () => {
    const ids = galleryItems.map((item) => item.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should have valid image URLs", () => {
    galleryItems.forEach((item) => {
      expect(item.imageUrl).toMatch(/^https?:\/\//);
    });
  });

  it("should have shop URLs for all items", () => {
    galleryItems.forEach((item) => {
      expect(item.shopUrl).toBeDefined();
      expect(item.shopUrl).toMatch(/^https?:\/\//);
    });
  });

  it("should have descriptive titles and descriptions", () => {
    galleryItems.forEach((item) => {
      expect(item.title.length).toBeGreaterThan(5);
      expect(item.description.length).toBeGreaterThan(10);
    });
  });

  it("should have at least 2 tags per item", () => {
    galleryItems.forEach((item) => {
      expect(item.tags.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("should have consistent category distribution", () => {
    // At least 25% of items should be in each category
    const categoryCounts = {
      backgrounds: 0,
      emotes: 0,
      "mood-collection": 0,
      "profile-pictures": 0,
    };

    galleryItems.forEach((item) => {
      categoryCounts[item.category as keyof typeof categoryCounts]++;
    });

    const totalItems = galleryItems.length;
    const minPerCategory = Math.floor(totalItems * 0.2); // At least 20%

    Object.values(categoryCounts).forEach((count) => {
      expect(count).toBeGreaterThanOrEqual(minPerCategory);
    });
  });
});
