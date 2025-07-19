import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Users, BookOpen, TrendingUp, Shield, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/subscribe", { email });
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for joining our newsletter. You'll receive the latest WordPress development tips weekly.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      const message = error.message.includes("409") 
        ? "This email is already subscribed to our newsletter."
        : "Failed to subscribe. Please try again.";
      
      toast({
        title: "Subscription failed",
        description: message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      subscribeMutation.mutate(email);
    }
  };

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 dark:from-primary/80 dark:via-primary/70 dark:to-primary/60 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center text-white">
          {/* Header */}
          <div className="animate-fade-in mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Mail className="w-4 h-4" />
              Weekly Newsletter
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Never Miss a <span className="text-yellow-300">WordPress Insight</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of developers getting weekly curated content, exclusive tutorials, 
              and the latest WordPress development trends delivered to your inbox.
            </p>
          </div>

          {/* Benefits */}
          <div className="animate-slide-up grid md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <BookOpen className="w-6 h-6 text-yellow-300 flex-shrink-0" />
              <div className="text-left">
                <h4 className="font-semibold">Weekly Tutorials</h4>
                <p className="text-sm text-white/80">Expert-written guides</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <TrendingUp className="w-6 h-6 text-yellow-300 flex-shrink-0" />
              <div className="text-left">
                <h4 className="font-semibold">Industry News</h4>
                <p className="text-sm text-white/80">Latest WordPress updates</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Shield className="w-6 h-6 text-yellow-300 flex-shrink-0" />
              <div className="text-left">
                <h4 className="font-semibold">Exclusive Content</h4>
                <p className="text-sm text-white/80">Subscriber-only resources</p>
              </div>
            </div>
          </div>
          
          {/* Subscription Form */}
          <div className="animate-slide-up stagger-1 max-w-lg mx-auto mb-8">
            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <Input 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white text-gray-900 border-0 rounded-xl focus:ring-2 focus:ring-yellow-300 outline-none placeholder:text-gray-500"
                    required
                    disabled={subscribeMutation.isPending}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={subscribeMutation.isPending}
                  size="lg"
                  className="bg-yellow-300 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-200 transition-all duration-300 whitespace-nowrap disabled:opacity-50 hover:scale-105"
                >
                  {subscribeMutation.isPending ? "Subscribing..." : "Subscribe Free"}
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-white/80">
                <CheckCircle className="w-4 h-4" />
                <span>No spam, unsubscribe anytime. Privacy protected.</span>
              </div>
            </form>
          </div>
          
          {/* Social Proof Stats */}
          <div className="animate-slide-up stagger-2 grid grid-cols-2 md:grid-cols-4 gap-6 text-white/90">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Users className="w-5 h-5 text-yellow-300" />
              </div>
              <div className="text-3xl font-bold text-white">15,000+</div>
              <div className="text-sm">Active Subscribers</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <BookOpen className="w-5 h-5 text-yellow-300" />
              </div>
              <div className="text-3xl font-bold text-white">300+</div>
              <div className="text-sm">Published Articles</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <TrendingUp className="w-5 h-5 text-yellow-300" />
              </div>
              <div className="text-3xl font-bold text-white">4.9★</div>
              <div className="text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Mail className="w-5 h-5 text-yellow-300" />
              </div>
              <div className="text-3xl font-bold text-white">95%</div>
              <div className="text-sm">Open Rate</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
    </section>
  );
}
