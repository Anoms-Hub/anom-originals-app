import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import {
  galleryItems,
  categoryLabels,
  categoryDescriptions,
  getCategoryColor,
  getCategoryBorderColor,
  type GalleryCategory,
} from "@/data/galleryData";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | "all">("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Filter gallery items
  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  // Get current image index for lightbox navigation
  const currentImageIndex = galleryItems.findIndex(
    (item) => item.id === selectedImage
  );

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setSelectedImage(galleryItems[currentImageIndex - 1].id);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < galleryItems.length - 1) {
      setSelectedImage(galleryItems[currentImageIndex + 1].id);
    }
  };

  const selectedImageData = galleryItems.find((item) => item.id === selectedImage);

  const categories: (GalleryCategory | "all")[] = [
    "all",
    "backgrounds",
    "emotes",
    "mood-collection",
    "profile-pictures",
  ];

  return (
    <section id="gallery" className="py-12 md:py-20 border-t border-border">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="font-display text-2xl md:text-4xl mb-3 md:mb-4 glow-cyan">
            PORTFOLIO
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto px-2">
            Explore my creative work across digital art, emotes, memes, and personalized
            digital identities
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 md:mb-12 flex flex-wrap gap-2 md:gap-3 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`text-xs md:text-sm transition-all ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground neon-border"
                  : "border-border hover:border-primary"
              }`}
            >
              {category === "all"
                ? "All Works"
                : categoryLabels[category as GalleryCategory]}
            </Button>
          ))}
        </div>

        {/* Category Description */}
        {selectedCategory !== "all" && (
          <div className="mb-8 md:mb-12 text-center">
            <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto">
              {categoryDescriptions[selectedCategory as GalleryCategory]}
            </p>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className={`bg-card border overflow-hidden hover:border-primary transition-all group cursor-pointer ${getCategoryBorderColor(
                item.category
              )}`}
              onClick={() => setSelectedImage(item.id)}
            >
              {/* Image Container */}
              <div className="relative h-48 md:h-56 overflow-hidden bg-background/50">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex items-center gap-2 text-primary text-sm font-mono">
                    <span>View</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
                {/* Category Badge */}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-mono bg-background/80 border ${getCategoryBorderColor(item.category)}`}>
                  {categoryLabels[item.category]}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6">
                <h3 className={`font-display text-base md:text-lg mb-2 ${getCategoryColor(
                  item.category
                )}`}>
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-background border border-border rounded text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Shop Link */}
                {item.shopUrl && (
                  <a
                    href={item.shopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs md:text-sm text-primary hover:text-secondary transition font-mono"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Shop <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && selectedImageData && (
        <div
          className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-muted-foreground hover:text-foreground transition"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Image */}
            <div className="relative bg-background border border-border rounded-lg overflow-hidden">
              <img
                src={selectedImageData.imageUrl}
                alt={selectedImageData.title}
                className="w-full h-auto max-h-96 md:max-h-[600px] object-contain"
              />

              {/* Navigation Arrows */}
              {currentImageIndex > 0 && (
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border border-border p-2 rounded transition"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              {currentImageIndex < galleryItems.length - 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border border-border p-2 rounded transition"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-background/80 px-3 py-1 rounded border border-border">
                {currentImageIndex + 1} / {galleryItems.length}
              </div>
            </div>

            {/* Image Info */}
            <div className="mt-6 bg-card border border-border rounded-lg p-4 md:p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className={`font-display text-lg md:text-xl mb-2 ${getCategoryColor(
                    selectedImageData.category
                  )}`}>
                    {selectedImageData.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-4">
                    {selectedImageData.description}
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded font-mono border ${getCategoryBorderColor(selectedImageData.category)}`}>
                  {categoryLabels[selectedImageData.category]}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedImageData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-background border border-border rounded text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Shop Button */}
              {selectedImageData.shopUrl && (
                <a
                  href={selectedImageData.shopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:text-secondary transition bg-background border border-border px-4 py-2 rounded hover:border-primary"
                >
                  View on Spreadshop <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
