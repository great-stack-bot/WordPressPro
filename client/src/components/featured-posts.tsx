import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, ArrowRight, BookOpen } from "lucide-react";
import type { Post } from "@shared/schema";

export default function FeaturedPosts() {
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ["/api/posts/featured"],
  });

  if (isLoading) {
    return (
      <section id="featured" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Articles</h2>
            <p className="text-lg text-muted-foreground">Latest insights and tutorials to level up your WordPress skills</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse border-border">
                <div className="h-48 bg-muted rounded-t-xl"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded mb-3"></div>
                  <div className="h-6 bg-muted rounded mb-3"></div>
                  <div className="h-16 bg-muted rounded mb-4"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded mb-1"></div>
                      <div className="h-3 bg-muted rounded"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="featured" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Featured Articles</h2>
            <div className="inline-flex items-center gap-2 text-destructive">
              <BookOpen className="w-5 h-5" />
              <p>Failed to load featured posts. Please try again later.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="outline" className="mb-4 inline-flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Featured Content
          </Badge>
          <h2 className="text-3xl font-bold mb-4">Latest WordPress Insights</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked tutorials and expert tips to accelerate your WordPress development journey
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post, index) => (
            <Card 
              key={post.id} 
              className={`group bg-card border-border rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border-gradient animate-slide-up stagger-${index + 1}`}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge 
                    variant="secondary"
                    className={`text-xs font-medium px-3 py-1 rounded-full border ${
                      post.category === 'Theme Development' ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' :
                      post.category === 'Plugin Development' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' :
                      post.category === 'Performance' ? 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' :
                      post.category === 'Security' ? 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800' :
                      'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                    }`}
                  >
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
                
                <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 line-clamp-3 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.authorAvatar} 
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full ring-2 ring-background shadow-md"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 text-muted-foreground" />
                        <p className="font-medium text-sm">{post.authorName}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{post.publishDate}</p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="group/btn text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-200 font-medium px-4 py-2 rounded-lg"
                  >
                    Read More 
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12 animate-fade-in">
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-3 rounded-xl border-2 border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
