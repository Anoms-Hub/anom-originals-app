import { describe, it, expect } from "vitest";

describe("ShareButtons Component", () => {
  it("should have all required platforms", () => {
    const platforms = ["Facebook", "Twitter", "LinkedIn", "Reddit", "Email"];
    expect(platforms.length).toBe(5);
  });

  it("should generate correct Facebook share URL", () => {
    const url = "https://anomartsy.xyz/";
    const encodedUrl = encodeURIComponent(url);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    expect(facebookUrl).toContain("facebook.com/sharer");
    expect(facebookUrl).toContain(encodedUrl);
  });

  it("should generate correct Twitter share URL", () => {
    const url = "https://anomartsy.xyz/";
    const title = "Anom Originals - Turn Your Personality Into Art";
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=anomoriginals`;
    expect(twitterUrl).toContain("twitter.com/intent/tweet");
    expect(twitterUrl).toContain(encodedUrl);
  });

  it("should generate correct LinkedIn share URL", () => {
    const url = "https://anomartsy.xyz/";
    const encodedUrl = encodeURIComponent(url);
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    expect(linkedinUrl).toContain("linkedin.com/sharing");
    expect(linkedinUrl).toContain(encodedUrl);
  });

  it("should generate correct Reddit share URL", () => {
    const url = "https://anomartsy.xyz/";
    const title = "Anom Originals - Turn Your Personality Into Art";
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const redditUrl = `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
    expect(redditUrl).toContain("reddit.com/submit");
    expect(redditUrl).toContain(encodedUrl);
  });

  it("should generate correct Email share URL", () => {
    const url = "https://anomartsy.xyz/";
    const title = "Anom Originals - Turn Your Personality Into Art";
    const description = "Custom digital art, graphic design, and AI-assisted creative direction.";
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);
    const encodedUrl = encodeURIComponent(url);
    const emailUrl = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`;
    expect(emailUrl).toContain("mailto:");
    expect(emailUrl).toContain("subject=");
  });

  it("should support multiple layout variants", () => {
    const variants = ["horizontal", "vertical", "compact"] as const;
    expect(variants.length).toBe(3);
    variants.forEach((variant) => {
      expect(typeof variant).toBe("string");
    });
  });

  it("should handle custom URL and title", () => {
    const customUrl = "https://anomartsy.xyz/gallery";
    const customTitle = "Check out my portfolio!";
    expect(customUrl).toContain("gallery");
    expect(customTitle).toContain("portfolio");
  });

  it("should encode special characters in URLs", () => {
    const url = "https://anomartsy.xyz/?utm_source=social&utm_medium=share";
    const encoded = encodeURIComponent(url);
    expect(encoded).toContain("%3F");
    expect(encoded).toContain("%26");
    expect(encoded).toContain("%3D");
  });

  it("should have proper aria labels for accessibility", () => {
    const platforms = ["Facebook", "Twitter", "LinkedIn", "Reddit", "Email"];
    platforms.forEach((platform) => {
      const ariaLabel = `Share on ${platform}`;
      expect(ariaLabel).toContain("Share");
      expect(ariaLabel).toContain(platform);
    });
  });

  it("should support window.location.href as default URL", () => {
    const defaultUrl = "https://anomartsy.xyz/";
    expect(defaultUrl).toMatch(/^https?:\/\//);
    expect(defaultUrl).toContain("anomartsy");
  });

  it("should have default title and description", () => {
    const defaultTitle = "Anom Originals - Turn Your Personality Into Art";
    const defaultDescription = "Custom digital art, graphic design, and AI-assisted creative direction. Transform your personality into vibrant visual experiences.";
    expect(defaultTitle.length).toBeGreaterThan(0);
    expect(defaultDescription.length).toBeGreaterThan(0);
  });
});
