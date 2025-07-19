import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

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
    <section id="newsletter" className="py-16 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Latest Tips</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get weekly WordPress development insights, tutorials, and industry news delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-4 focus:ring-blue-300 outline-none text-gray-900"
                required
                disabled={subscribeMutation.isPending}
              />
              <Button 
                type="submit" 
                disabled={subscribeMutation.isPending}
                className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors duration-200 whitespace-nowrap disabled:opacity-50"
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
            <p className="text-sm text-blue-100 mt-4">
              No spam, unsubscribe at any time. Privacy policy applies.
            </p>
          </form>
          
          {/* Newsletter Stats */}
          <div className="flex justify-center items-center gap-8 mt-8 text-blue-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">12,500+</div>
              <div className="text-sm">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">200+</div>
              <div className="text-sm">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.9★</div>
              <div className="text-sm">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
