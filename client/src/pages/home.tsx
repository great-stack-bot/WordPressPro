import Header from "@/components/header";
import Hero from "@/components/hero";
import FeaturedPosts from "@/components/featured-posts";
import CategoriesSection from "@/components/categories-section";
import Newsletter from "@/components/newsletter";
import Comments from "@/components/comments";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { ReadingProgress } from "@/components/reading-progress";
import { SEOHead } from "@/components/seo-head";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead />
      <ReadingProgress />
      <Header />
      <Hero />
      <FeaturedPosts />
      <CategoriesSection />
      <Newsletter />
      <Comments />
      <Footer />
      <BackToTop />
    </div>
  );
}
