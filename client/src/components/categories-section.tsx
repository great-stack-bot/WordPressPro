import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Post } from "@shared/schema";

const categories = [
  { id: "all", name: "All Posts", filter: "" },
  { id: "themes", name: "Themes", filter: "Theme Development" },
  { id: "plugins", name: "Plugins", filter: "Plugin Development" },
  { id: "performance", name: "Performance", filter: "Performance" },
  { id: "security", name: "Security", filter: "Security" },
  { id: "api", name: "REST API", filter: "REST API" },
];

export default function CategoriesSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const { data: allPosts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const filteredPosts = allPosts?.filter(post => {
    if (activeCategory === "all") return true;
    const category = categories.find(cat => cat.id === activeCategory);
    return category && post.category === category.filter;
  }) || [];

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  if (isLoading) {
    return (
      <section id="categories" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-lg text-gray-600">Find the perfect tutorials for your development needs</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <div key={category.id} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-40 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-5 bg-gray-200 rounded mb-2"></div>
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="categories" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          <p className="text-lg text-gray-600">Find the perfect tutorials for your development needs</p>
        </div>
        
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-40 object-cover"
              />
              <CardContent className="p-6">
                <Badge 
                  variant="secondary"
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full mb-3 inline-block ${
                    post.category === 'Theme Development' ? 'bg-blue-100 text-blue-800' :
                    post.category === 'Plugin Development' ? 'bg-emerald-100 text-emerald-800' :
                    post.category === 'Performance' ? 'bg-amber-100 text-amber-800' :
                    post.category === 'Security' ? 'bg-red-100 text-red-800' :
                    'bg-purple-100 text-purple-800'
                  }`}
                >
                  {post.category}
                </Badge>
                <h3 className="font-semibold text-lg text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.publishDate}</span>
                  <span>{post.readTime}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts found for this category.</p>
          </div>
        )}
        
        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
            Load More Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
