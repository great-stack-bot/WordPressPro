import { useState, useEffect } from "react";
import { Search, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchDialog } from "@/components/search-dialog";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 dark:bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -inset-1 gradient-bg rounded-xl opacity-20 group-hover:opacity-30 transition-opacity blur"></div>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl gradient-text">WP Dev Tips</span>
                <p className="text-xs text-muted-foreground">Expert WordPress Insights</p>
              </div>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Button
              variant="ghost"
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium px-4"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('featured')}
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium px-4"
            >
              Tutorials
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('categories')}
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium px-4"
            >
              Tips
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('newsletter')}
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium px-4"
            >
              Resources
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('footer')}
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium px-4"
            >
              About
            </Button>
          </div>
          
          {/* Search & Theme Toggle */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-foreground border-border hover:border-primary/50 transition-all duration-200"
            >
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Search articles...</span>
              <span className="lg:hidden">Search</span>
              <kbd className="pointer-events-none hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="sm:hidden"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="space-y-1">
              <Button
                variant="ghost"
                onClick={() => scrollToSection('home')}
                className="w-full justify-start text-foreground hover:text-primary transition-colors duration-200"
              >
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('featured')}
                className="w-full justify-start text-foreground hover:text-primary transition-colors duration-200"
              >
                Tutorials
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('categories')}
                className="w-full justify-start text-foreground hover:text-primary transition-colors duration-200"
              >
                Tips
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('newsletter')}
                className="w-full justify-start text-foreground hover:text-primary transition-colors duration-200"
              >
                Resources
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('footer')}
                className="w-full justify-start text-foreground hover:text-primary transition-colors duration-200"
              >
                About
              </Button>
            </div>
          </div>
        )}

        <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      </nav>
    </header>
  );
}
