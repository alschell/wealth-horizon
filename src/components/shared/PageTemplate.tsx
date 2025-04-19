import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FadeIn } from "@/components/ui/animation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LucideIcon } from "lucide-react";

interface PageTemplateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  children 
}) => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12 max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="mb-8">
            <Link to="/" className="text-indigo-600 hover:underline mb-4 inline-block text-left">
              &larr; Back to Home
            </Link>
            
            <div className="flex items-start gap-3 mb-2">
              {Icon && <Icon className="h-7 w-7 text-indigo-600" />}
              <h1 className="text-3xl font-bold text-gray-900 text-left">{title}</h1>
            </div>
            
            <p className="text-gray-600 max-w-full text-left whitespace-normal text-base leading-relaxed">
              {description}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-8">
            {children || (
              <div className="py-12 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Coming Soon</h2>
                <p className="text-gray-600 max-w-lg mx-auto mb-8">
                  We're currently developing this page to provide you with more information and resources.
                  Check back soon for updates.
                </p>
                <Separator className="my-8" />
                <div className="flex justify-center gap-4">
                  <Button asChild variant="outline">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/">Return Home</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default PageTemplate;
