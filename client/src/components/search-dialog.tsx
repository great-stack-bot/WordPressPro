import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Clock, BookOpen, Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Post } from "@shared/schema";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");

  const { data: searchResults, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts/search", { q: query }],
    enabled: query.length > 2,
  });

  const handleResultClick = (post: Post) => {
    onOpenChange(false);
    setQuery("");
    // In a real app, you'd navigate to the post detail page
    console.log("Navigate to post:", post.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Articles
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles, tutorials, and tips..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 text-base"
              autoFocus
            />
          </div>

          <div className="max-h-96 overflow-y-auto">
            {query.length <= 2 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Type at least 3 characters to search</p>
              </div>
            ) : isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg animate-pulse">
                    <div className="w-16 h-12 bg-muted rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResults && searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((post) => (
                  <Button
                    key={post.id}
                    variant="ghost"
                    className="w-full h-auto p-3 justify-start text-left hover:bg-accent/50 transition-colors"
                    onClick={() => handleResultClick(post)}
                  >
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-16 h-12 object-cover rounded mr-3 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm mb-1 line-clamp-1">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <Tag className="h-3 w-3" />
                        <span>{post.category}</span>
                        <Clock className="h-3 w-3 ml-2" />
                        <span>{post.readTime}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No articles found for "{query}"</p>
                <p className="text-sm mt-2">Try different keywords or browse our categories</p>
              </div>
            )}
          </div>

          {query.length <= 2 && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3 text-sm">Popular searches</h4>
              <div className="flex flex-wrap gap-2">
                {["WordPress hooks", "Custom post types", "Performance", "Security", "REST API"].map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setQuery(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}