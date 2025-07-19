import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

export function SEOHead({
  title = "WP Dev Tips - Expert WordPress Development Insights & Tutorials",
  description = "Discover advanced WordPress development techniques, best practices, and insider secrets. From theme development to plugin creation, performance optimization to security hardening - master WordPress development with expert tips.",
  keywords = [
    "WordPress development", "WordPress tutorials", "WordPress themes", "WordPress plugins",
    "WordPress performance", "WordPress security", "WordPress REST API", "WordPress hooks",
    "WordPress development tips", "WordPress best practices", "WordPress developer guide"
  ],
  image = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630",
  url = window.location.href,
  type = "website"
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('author', 'WP Dev Tips');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'WP Dev Tips', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:site', '@wpdevtips');
    updateMetaTag('twitter:creator', '@wpdevtips');

    // Additional SEO tags
    updateMetaTag('theme-color', '#8b5cf6');
    updateMetaTag('msapplication-TileColor', '#8b5cf6');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);

    // JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "WP Dev Tips",
      "url": "https://wpdevtips.dev",
      "description": "Expert WordPress development insights, tutorials, and best practices for developers.",
      "publisher": {
        "@type": "Organization",
        "name": "WP Dev Tips",
        "logo": {
          "@type": "ImageObject",
          "url": "https://wpdevtips.dev/logo.png"
        }
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://wpdevtips.dev/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, image, url, type]);

  return null;
}