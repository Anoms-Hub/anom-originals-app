import { Facebook, Twitter, Linkedin, MessageCircle, Share2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  variant?: "horizontal" | "vertical" | "compact";
  showLabels?: boolean;
}

export default function ShareButtons({
  url = typeof window !== "undefined" ? window.location.href : "https://anomartsy.xyz",
  title = "Anom Originals - Turn Your Personality Into Art",
  description = "Custom digital art, graphic design, and AI-assisted creative direction. Transform your personality into vibrant visual experiences.",
  variant = "horizontal",
  showLabels = true,
}: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:text-blue-600",
      bgColor: "hover:bg-blue-50",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=anomoriginals`,
      color: "hover:text-sky-500",
      bgColor: "hover:bg-sky-50",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:text-blue-700",
      bgColor: "hover:bg-blue-50",
    },
    {
      name: "Reddit",
      icon: MessageCircle,
      url: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      color: "hover:text-orange-500",
      bgColor: "hover:bg-orange-50",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: "hover:text-gray-600",
      bgColor: "hover:bg-gray-100",
    },
  ];

  const containerClass =
    variant === "vertical"
      ? "flex flex-col gap-2"
      : variant === "compact"
        ? "flex gap-1"
        : "flex gap-3";

  const buttonClass =
    variant === "compact"
      ? "h-8 w-8 p-0"
      : "h-10 w-10 p-0";

  return (
    <div className={containerClass}>
      {shareLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${link.name}`}
            onClick={(e) => {
              // For email, let the default behavior work
              if (link.name === "Email") return;
              
              e.preventDefault();
              // Open share window
              const width = 600;
              const height = 400;
              const left = (window.innerWidth - width) / 2;
              const top = (window.innerHeight - height) / 2;
              window.open(
                link.url,
                `share-${link.name}`,
                `width=${width},height=${height},left=${left},top=${top}`
              );
            }}
          >
            <Button
              variant="ghost"
              size="icon"
              className={`${buttonClass} ${link.color} ${link.bgColor} transition-all duration-200`}
              aria-label={`Share on ${link.name}`}
            >
              <Icon className={variant === "compact" ? "h-4 w-4" : "h-5 w-5"} />
            </Button>
          </a>
        );
      })}
    </div>
  );
}

/**
 * Usage Examples:
 * 
 * // Horizontal layout with labels (default)
 * <ShareButtons />
 * 
 * // Vertical layout for sidebars
 * <ShareButtons variant="vertical" />
 * 
 * // Compact layout for footers
 * <ShareButtons variant="compact" />
 * 
 * // Custom URL and title
 * <ShareButtons 
 *   url="https://anomartsy.xyz/gallery"
 *   title="Check out my portfolio!"
 *   description="Amazing digital art and designs"
 * />
 */
