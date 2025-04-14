
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const NewsletterSubscription: React.FC = () => {
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscriberEmail) {
      toast({
        title: "Subscription successful!",
        description: `You've been subscribed to our newsletter with ${subscriberEmail}`,
      });
      setSubscriberEmail("");
    } else {
      toast({
        title: "Email required",
        description: "Please enter your email address to subscribe",
        variant: "destructive"
      });
    }
  };

  return (
    <section className="bg-indigo-50 rounded-xl p-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Subscribe to our newsletter</h2>
          <p className="text-gray-600">Get the latest insights and analysis delivered to your inbox.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Input 
            placeholder="Enter your email" 
            type="email"
            value={subscriberEmail}
            onChange={(e) => setSubscriberEmail(e.target.value)}
            className="w-full sm:w-64"
          />
          <Button className="flex items-center gap-2" onClick={handleSubscribe}>
            Subscribe Now <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};
