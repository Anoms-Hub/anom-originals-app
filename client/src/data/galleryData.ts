/**
 * Gallery Data - Organized by category
 * Each item includes: id, title, description, image URL, category, and shop link
 */

export type GalleryCategory = 
  | "backgrounds" 
  | "emotes" 
  | "mood-collection" 
  | "profile-pictures";

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: GalleryCategory;
  shopUrl?: string;
  tags: string[];
}

export const galleryItems: GalleryItem[] = [
  // Background Images for Social Media Pages
  {
    id: "bg-1",
    title: "Neon Cyberpunk Background",
    description: "Dark atmospheric background with cyan and magenta neon accents. Perfect for social media headers and profile pages.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/hero-neon-background-ihZuHdjParQyQXXt8KNC4Q.webp",
    category: "backgrounds",
    tags: ["cyberpunk", "neon", "dark", "social-media"],
    shopUrl: "https://anomoriginals.myspreadshop.com/"
  },
  {
    id: "bg-2",
    title: "Digital Identity Canvas",
    description: "Vibrant gradient background showcasing digital art aesthetic. Ideal for creative portfolios and brand identity.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/service-digital-art-Qsa7HGcLibSyrXcTrmCDXb.webp",
    category: "backgrounds",
    tags: ["gradient", "digital", "creative", "identity"],
    shopUrl: "https://anomoriginals.myspreadshop.com/"
  },
  {
    id: "bg-3",
    title: "Abstract Geometric Pattern",
    description: "Complex geometric patterns with layered textures. Great for modern social media aesthetics.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/service-graphic-design-njpJAFFCLKwcedtdbogttA.webp",
    category: "backgrounds",
    tags: ["geometric", "abstract", "modern", "pattern"],
    shopUrl: "https://anomoriginals.myspreadshop.com/"
  },

  // Emotes for T-Shirts and Merchandise
  {
    id: "emote-1",
    title: "Neon Smile Emote",
    description: "Cheerful neon-glowing emote perfect for t-shirt designs and merchandise. Captures playful energy.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/brand-logo-neon-W6MihokBJoyzEdHvJgRytT.webp",
    category: "emotes",
    tags: ["emote", "tshirt", "merchandise", "playful"],
    shopUrl: "https://anomoriginals.myspreadshop.com/"
  },
  {
    id: "emote-2",
    title: "Cool Vibes Emote",
    description: "Laid-back emote with sunglasses and neon accents. Perfect for casual apparel collections.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/service-merchandise-2Ma2Hb3TGhNdMBgTDPB6ts.webp",
    category: "emotes",
    tags: ["emote", "cool", "casual", "merchandise"],
    shopUrl: "https://anomoriginals.myspreadshop.com/"
  },
  {
    id: "emote-3",
    title: "Mystical Gaze Emote",
    description: "Mysterious emote with glowing eyes and ethereal aesthetic. Great for premium merchandise.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/hero-neon-background-ihZuHdjParQyQXXt8KNC4Q.webp",
    category: "emotes",
    tags: ["emote", "mystical", "premium", "ethereal"],
    shopUrl: "https://anomoriginals.myspreadshop.com/"
  },

  // Anom Mood Collection - Memes
  {
    id: "mood-1",
    title: "Monday Mood",
    description: "Relatable meme capturing the Monday morning energy. Part of the Anom Mood Collection.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/service-digital-art-Qsa7HGcLibSyrXcTrmCDXb.webp",
    category: "mood-collection",
    tags: ["meme", "mood", "relatable", "humor"],
    shopUrl: "https://anomoriginals.myspreadshop.com/"
  },
  {
    id: "mood-2",
    title: "Creative Chaos Mood",
    description: "Expresses the beautiful chaos of creative work. Perfect for artists and designers.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/service-graphic-design-njpJAFFCLKwcedtdbogttA.webp",
    category: "mood-collection",
    tags: ["meme", "creative", "chaos", "artist"],
    shopUrl: "https://anomoriginals.myspreadshop.com/"
  },
  {
    id: "mood-3",
    title: "Vibe Check Mood",
    description: "When you need to check the vibes. Humorous take on mood assessment.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/service-merchandise-2Ma2Hb3TGhNdMBgTDPB6ts.webp",
    category: "mood-collection",
    tags: ["meme", "vibe", "humor", "mood"],
    shopUrl: "https://anomoriginals.myspreadshop.com/"
  },

  // Personalized Profile Pictures & Digital Identity Graphics
  {
    id: "profile-1",
    title: "Neon Avatar Profile Pic",
    description: "Custom profile picture with neon glow effects. Personalized digital identity that stands out.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/brand-logo-neon-W6MihokBJoyzEdHvJgRytT.webp",
    category: "profile-pictures",
    tags: ["profile-pic", "avatar", "personalized", "identity"],
    shopUrl: "https://anomoriginals.myspreadshop.com/"
  },
  {
    id: "profile-2",
    title: "Digital Identity Graphic",
    description: "Unique graphic representing your digital persona. Brings your online identity to life.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/hero-neon-background-ihZuHdjParQyQXXt8KNC4Q.webp",
    category: "profile-pictures",
    tags: ["identity", "graphic", "personal", "digital"],
    shopUrl: "https://anomoriginals.myspreadshop.com/"
  },
  {
    id: "profile-3",
    title: "Custom Character Avatar",
    description: "Fully personalized character avatar based on your personality and style preferences.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/service-digital-art-Qsa7HGcLibSyrXcTrmCDXb.webp",
    category: "profile-pictures",
    tags: ["character", "avatar", "custom", "personality"],
    shopUrl: "https://anomoriginals.myspreadshop.com/"
  },
];

export const categoryLabels: Record<GalleryCategory, string> = {
  backgrounds: "Background Images",
  emotes: "Emotes & Merchandise",
  "mood-collection": "Anom Mood Collection",
  "profile-pictures": "Profile Pictures & Identity",
};

export const categoryDescriptions: Record<GalleryCategory, string> = {
  backgrounds: "Social media page backgrounds and header images",
  emotes: "Custom emotes designed for t-shirts and merchandise",
  "mood-collection": "Relatable memes expressing different moods",
  "profile-pictures": "Personalized profile pictures and digital identity graphics",
};

export const getCategoryColor = (category: GalleryCategory): string => {
  const colors: Record<GalleryCategory, string> = {
    backgrounds: "glow-cyan",
    emotes: "glow-magenta",
    "mood-collection": "glow-yellow",
    "profile-pictures": "text-primary",
  };
  return colors[category];
};

export const getCategoryBorderColor = (category: GalleryCategory): string => {
  const colors: Record<GalleryCategory, string> = {
    backgrounds: "border-cyan-500",
    emotes: "border-pink-500",
    "mood-collection": "border-yellow-500",
    "profile-pictures": "border-cyan-400",
  };
  return colors[category];
};
