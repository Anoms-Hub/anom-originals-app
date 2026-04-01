import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, ExternalLink, Heart } from "lucide-react";
import { useState } from "react";
import { getLoginUrl } from "@/const";

/**
 * Design Philosophy: Cyberpunk Neon Maximalism
 * - Dark backgrounds (#0a0a0a) with vibrant neon accents (cyan, magenta, yellow)
 * - Bold, geometric typography (Orbitron for headings, Roboto for body)
 * - Asymmetric layouts with diagonal cuts and angular sections
 * - Glowing effects, animated gradients, and digital noise overlays
 */

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission
    alert(`Thank you for your message, ${formData.name}! We'll get back to you soon.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/brand-logo-neon-W6MihokBJoyzEdHvJgRytT.webp"
              alt="Anom Originals"
              className="h-8 w-8 md:h-10 md:w-10 animate-pulse-glow"
            />
            <span className="font-display text-base md:text-lg glow-cyan">ANOM</span>
          </div>
          <div className="flex gap-3 md:gap-6 items-center">
            <a href="#services" className="hidden sm:inline text-xs md:text-sm hover:text-primary transition">
              Services
            </a>
            <a href="#portfolio" className="hidden sm:inline text-xs md:text-sm hover:text-primary transition">
              Portfolio
            </a>
            <a href="#contact" className="hidden sm:inline text-xs md:text-sm hover:text-primary transition">
              Contact
            </a>
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Hi, {user.name}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={logout}
                  className="border-secondary text-secondary hover:bg-secondary/10"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/80"
                onClick={() => (window.location.href = getLoginUrl())}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 noise-bg"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/hero-neon-background-ihZuHdjParQyQXXt8KNC4Q.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.4,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />

        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slide-in-left">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 leading-tight">
                <span className="glow-cyan">TURN</span> YOUR{" "}
                <span className="glow-magenta">PERSONALITY</span> INTO{" "}
                <span className="glow-yellow">ART</span>
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                I create custom digital art, graphic designs, and AI-assisted creative direction
                that transform your mood, personality, and story into vibrant visual experiences.
                Welcome to Anom Originals—where creativity meets identity.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/80 neon-border text-sm md:text-base">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary/10 text-sm md:text-base"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="animate-slide-in-right hidden lg:block">
              <div className="relative h-96 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-transparent rounded-lg neon-border animate-pulse-glow" />
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/brand-logo-neon-W6MihokBJoyzEdHvJgRytT.webp"
                  alt="Anom Logo"
                  className="h-48 w-48 animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-20 border-t border-border">
        <div className="container px-4 md:px-6">
          <div className="mb-12 md:mb-16 text-center">
            <h2 className="font-display text-2xl md:text-4xl mb-3 md:mb-4 glow-cyan">SERVICES</h2>
            <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto px-2">
              Explore the creative solutions I offer to bring your vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Digital Art Card */}
            <Card className="bg-card border-border hover:border-primary transition group cursor-pointer overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/service-digital-art-Qsa7HGcLibSyrXcTrmCDXb.webp"
                  alt="Digital Art"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl mb-3 glow-cyan">DIGITAL ART</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Custom digital illustrations and artwork that capture your unique style and
                  personality with vibrant neon aesthetics.
                </p>
                <div className="flex items-center gap-2 text-primary text-sm font-mono">
                  Explore <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </Card>

            {/* Graphic Design Card */}
            <Card className="bg-card border-border hover:border-secondary transition group cursor-pointer overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/service-graphic-design-njpJAFFCLKwcedtdbogttA.webp"
                  alt="Graphic Design"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl mb-3 glow-magenta">GRAPHIC DESIGN</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Professional branding, layouts, and design assets that make your message stand
                  out with bold, creative direction.
                </p>
                <div className="flex items-center gap-2 text-secondary text-sm font-mono">
                  Explore <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </Card>

            {/* Merchandise Card */}
            <Card className="bg-card border-border hover:border-yellow-500 transition group cursor-pointer overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/service-merchandise-2Ma2Hb3TGhNdMBgTDPB6ts.webp"
                  alt="Merchandise"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl mb-3 glow-yellow">MERCHANDISE</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Custom apparel and products featuring your unique designs. From t-shirts to
                  hoodies, wear your creativity.
                </p>
                <div className="flex items-center gap-2 text-yellow-500 text-sm font-mono">
                  Shop Now <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="portfolio" className="py-12 md:py-20 border-t border-border bg-card/30">
        <div className="container px-4 md:px-6">
          <div className="mb-12 md:mb-16 text-center">
            <h2 className="font-display text-2xl md:text-4xl mb-3 md:mb-4 glow-magenta">COMMUNITY LOVE</h2>
            <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto px-2">
              What people are saying about Anom Originals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                name: "Alex K.",
                text: "The digital art is absolutely stunning! Captured my personality perfectly.",
                rating: 5,
              },
              {
                name: "Jordan M.",
                text: "Professional, creative, and delivers on time. Highly recommend!",
                rating: 5,
              },
              {
                name: "Casey R.",
                text: "The neon aesthetic is fire. This is exactly what I was looking for.",
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="bg-background border-border p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Heart
                      key={i}
                      className="h-4 w-4 fill-secondary text-secondary"
                    />
                  ))}
                </div>
                <p className="text-sm mb-4 text-muted-foreground">
                  "{testimonial.text}"
                </p>
                <p className="font-display text-sm glow-cyan">{testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 border-t border-border">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 md:mb-12 text-center">
              <h2 className="font-display text-2xl md:text-4xl mb-3 md:mb-4 glow-cyan">LET'S COLLABORATE</h2>
              <p className="text-xs md:text-sm text-muted-foreground px-2">
                Have a project in mind? Reach out and let's create something amazing together.
              </p>
            </div>

            <Card className="bg-card border-border p-4 md:p-8 neon-border">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Your name"
                    className="bg-input border-border focus:border-primary focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="your@email.com"
                    className="bg-input border-border focus:border-primary focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Tell me about your project..."
                    className="bg-input border-border focus:border-primary focus:ring-primary min-h-32"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/80 font-display glow-cyan"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  SEND MESSAGE
                </Button>
              </form>
            </Card>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-sm text-muted-foreground mb-3 font-display">EMAIL</p>
                <a
                  href="mailto:helloanomoriginals@gmail.com"
                  className="font-mono text-sm text-primary hover:glow-cyan transition break-all"
                >
                  helloanomoriginals@gmail.com
                </a>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-3 font-display">FOLLOW</p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <a href="https://www.facebook.com/anom247" target="_blank" rel="noopener noreferrer" className="text-primary hover:glow-cyan transition text-sm">
                    Facebook
                  </a>
                  <a href="#" className="text-primary hover:text-secondary transition text-sm">
                    Instagram
                  </a>
                  <a href="https://www.youtube.com/@anomoriginals" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition text-sm">
                    YouTube
                  </a>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-3 font-display">SHOP</p>
                <a
                  href="https://anomoriginals.myspreadshop.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-primary hover:glow-magenta transition"
                >
                  Spreadshop Store
                </a>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-3 font-display">SUBSCRIBE</p>
                <a
                  href="https://anomoriginals.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-primary hover:text-secondary transition"
                >
                  Substack Newsletter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 md:py-8 bg-card/30">
        <div className="container px-4 md:px-6 text-center text-xs md:text-sm text-muted-foreground">
          <p>
            © 2026 Anom Originals. Crafted with{" "}
            <span className="text-secondary">❤</span> and neon vibes.
          </p>
        </div>
      </footer>
    </div>
  );
}
