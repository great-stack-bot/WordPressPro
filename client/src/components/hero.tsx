import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Star, Zap } from "lucide-react";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="animate-fade-in mb-6">
            <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
              <TrendingUp className="w-4 h-4" />
              #1 WordPress Development Resource
            </Badge>
          </div>

          {/* Main Heading */}
          <div className="animate-slide-up">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-balance">
              Master <span className="gradient-text">WordPress Development</span>
              <br className="hidden lg:block" />
              with Expert <span className="gradient-text-alt">Tips & Insights</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="animate-slide-up stagger-1">
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed text-balance">
              Discover advanced techniques, best practices, and insider secrets to build exceptional WordPress websites. 
              From theme development to plugin creation, performance optimization to security hardening.
            </p>
          </div>

          {/* Stats */}
          <div className="animate-slide-up stagger-2 flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">15,000+</span> developers
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">4.9/5</span> rating
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">300+</span> tutorials
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="animate-slide-up stagger-3 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => scrollToSection('featured')}
              className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-colored"
            >
              Explore Tutorials
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('newsletter')}
              className="border-2 border-primary/20 text-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            >
              Join Newsletter
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="animate-fade-in stagger-4 mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">Trusted by developers at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {["WordPress.com", "WP Engine", "Kinsta", "SiteGround", "Bluehost"].map((company, index) => (
                <div key={company} className="text-muted-foreground font-medium text-lg">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Background Decoration */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20">
        <div className="w-80 h-80 gradient-bg opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20">
        <div className="w-96 h-96 gradient-bg-alt opacity-10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
        <div className="w-[800px] h-[800px] gradient-bg opacity-5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
