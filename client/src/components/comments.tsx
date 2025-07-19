import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ThumbsUp } from "lucide-react";
import type { Comment } from "@shared/schema";

export default function Comments() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Using post ID 1 for demo purposes
  const postId = 1;

  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ["/api/posts", postId, "comments"],
  });

  const createCommentMutation = useMutation({
    mutationFn: async (commentData: { postId: number; authorName: string; authorEmail: string; content: string }) => {
      return apiRequest("POST", "/api/comments", commentData);
    },
    onSuccess: () => {
      toast({
        title: "Comment posted!",
        description: "Your comment has been submitted successfully.",
      });
      setName("");
      setEmail("");
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["/api/posts", postId, "comments"] });
    },
    onError: () => {
      toast({
        title: "Failed to post comment",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && content.trim()) {
      createCommentMutation.mutate({
        postId,
        authorName: name,
        authorEmail: email,
        content,
      });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Community Discussion</h3>
        
        {/* Comment Form */}
        <Card className="bg-gray-50 mb-8">
          <CardContent className="p-6">
            <h4 className="font-semibold text-lg text-gray-900 mb-4">Join the Conversation</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input 
                  type="text" 
                  placeholder="Your Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={createCommentMutation.isPending}
                />
                <Input 
                  type="email" 
                  placeholder="Your Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={createCommentMutation.isPending}
                />
              </div>
              <Textarea 
                placeholder="Share your thoughts..." 
                rows={4} 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                disabled={createCommentMutation.isPending}
                className="resize-none"
              />
              <Button 
                type="submit" 
                disabled={createCommentMutation.isPending}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                {createCommentMutation.isPending ? "Posting..." : "Post Comment"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Comments List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                        <div className="h-16 bg-gray-200 rounded mb-3"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : comments && comments.length > 0 ? (
            comments.map((comment) => (
              <Card key={comment.id} className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img 
                      src={comment.authorAvatar} 
                      alt={comment.authorName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className="font-medium text-gray-900">{comment.authorName}</h5>
                        <span className="text-sm text-gray-500">{comment.publishDate}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{comment.content}</p>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200">
                          Reply
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {comment.likes || 0}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
