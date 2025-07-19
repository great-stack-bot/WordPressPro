import Header from "@/components/header";
import Hero from "@/components/hero";
import FeaturedPosts from "@/components/featured-posts";
import CategoriesSection from "@/components/categories-section";
import Newsletter from "@/components/newsletter";
import Comments from "@/components/comments";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
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
