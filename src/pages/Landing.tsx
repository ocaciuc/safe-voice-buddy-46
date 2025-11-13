import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.9)',
        }}
      />
      
      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center animate-fade-in">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 text-foreground">
            SafeVoice
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-foreground/80 mb-4 font-light leading-relaxed">
          Your gentle companion for
        </p>
        <p className="text-2xl md:text-3xl font-semibold mb-12 text-primary">
          emotional clarity and comfort
        </p>

        {/* Value Props */}
        <div className="mb-12 space-y-4 text-foreground/70">
          <p className="text-lg">
            A safe space to express, reflect, and feel heard
          </p>
          <p className="text-lg">
            No judgment. No rush. Just genuine understanding.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => navigate("/setup")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-2xl shadow-soft-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Begin Your Journey
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/login")}
            className="border-2 border-primary/30 hover:border-primary hover:bg-primary/5 text-foreground px-8 py-6 text-lg rounded-2xl transition-all duration-300"
          >
            Sign In
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-positive animate-breathing" />
            <span>Private & Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-positive animate-breathing" />
            <span>Always Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-positive animate-breathing" />
            <span>Judgment Free</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
