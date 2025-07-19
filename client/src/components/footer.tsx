import { Twitter, Github, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">WP</span>
              </div>
              <span className="font-bold text-xl">WP Dev Tips</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted source for WordPress development insights, tutorials, and best practices.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="GitHub">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="YouTube">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('featured')}
                  className="hover:text-white transition-colors duration-200"
                >
                  All Tutorials
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('footer')}
                  className="hover:text-white transition-colors duration-200"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('footer')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Theme Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Plugin Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Performance</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">REST API</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="https://codex.wordpress.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">WordPress Codex</a></li>
              <li><a href="https://developer.wordpress.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">Developer Handbook</a></li>
              <li><a href="https://developer.wordpress.org/reference" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">Code Reference</a></li>
              <li>
                <button 
                  onClick={() => scrollToSection('newsletter')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Newsletter Archive
                </button>
              </li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Community Forum</a></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2023 WP Dev Tips. All rights reserved. Built with ❤️ for the WordPress community.</p>
        </div>
      </div>
    </footer>
  );
}
