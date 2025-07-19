import { Twitter, Github, Linkedin, Youtube, Sparkles, Heart, Mail, ExternalLink, Code, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-gradient-to-br from-background via-muted/30 to-background dark:from-background dark:via-muted/10 dark:to-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -inset-1 gradient-bg rounded-xl opacity-20 blur"></div>
              </div>
              <div>
                <span className="font-bold text-2xl gradient-text">WP Dev Tips</span>
                <p className="text-sm text-muted-foreground">Expert WordPress Insights</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              Empowering WordPress developers with cutting-edge tutorials, insider tips, and industry best practices. 
              Join our community of passionate developers building the future of WordPress.
            </p>
            
            {/* Newsletter CTA */}
            <div className="bg-muted/50 rounded-xl p-4 mb-6 border border-border">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h5 className="font-semibold mb-1">Stay in the loop</h5>
                  <p className="text-sm text-muted-foreground mb-3">Get weekly WordPress insights</p>
                  <Button 
                    size="sm" 
                    onClick={() => scrollToSection('newsletter')}
                    className="w-full gradient-bg text-white hover:shadow-md transition-all duration-300"
                  >
                    Subscribe Now
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Follow us:</span>
              <div className="flex gap-2">
                {[
                  { Icon: Twitter, href: "#", label: "Twitter" },
                  { Icon: Github, href: "#", label: "GitHub" },
                  { Icon: Linkedin, href: "#", label: "LinkedIn" },
                  { Icon: Youtube, href: "#", label: "YouTube" }
                ].map(({ Icon, href, label }) => (
                  <Button
                    key={label}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  >
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                      <Icon className="w-4 h-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", action: () => scrollToSection('home') },
                { label: "Featured Articles", action: () => scrollToSection('featured') },
                { label: "All Tutorials", action: () => scrollToSection('categories') },
                { label: "Newsletter", action: () => scrollToSection('newsletter') },
                { label: "About Us", href: "#" },
                { label: "Contact", href: "#" }
              ].map(({ label, action, href }) => (
                <li key={label}>
                  {action ? (
                    <Button
                      variant="ghost"
                      onClick={action}
                      className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors duration-200 justify-start"
                    >
                      {label}
                    </Button>
                  ) : (
                    <a href={href} className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Categories
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Theme Development", count: "45+" },
                { name: "Plugin Development", count: "38+" },
                { name: "Performance", count: "29+" },
                { name: "Security", count: "22+" },
                { name: "REST API", count: "18+" }
              ].map(({ name, count }) => (
                <li key={name}>
                  <a href="#" className="flex items-center justify-between group">
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                      {name}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {count}
                    </Badge>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-primary" />
              Resources
            </h4>
            <ul className="space-y-3">
              {[
                { name: "WordPress Codex", href: "https://codex.wordpress.org" },
                { name: "Developer Handbook", href: "https://developer.wordpress.org" },
                { name: "Code Reference", href: "https://developer.wordpress.org/reference" },
                { name: "REST API Docs", href: "https://developer.wordpress.org/rest-api" },
                { name: "Plugin Handbook", href: "https://developer.wordpress.org/plugins" }
              ].map(({ name, href }) => (
                <li key={name}>
                  <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2 group"
                  >
                    {name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">15,000+</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Users className="w-4 h-4" />
              Active Developers
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">300+</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <BookOpen className="w-4 h-4" />
              Published Articles
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">50+</div>
            <div className="text-sm text-muted-foreground">Countries Reached</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">95%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>&copy; {currentYear} WP Dev Tips. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center gap-1">
              Built with <Heart className="w-4 h-4 text-red-500 fill-current" /> for the WordPress community
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
