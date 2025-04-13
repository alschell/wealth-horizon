
import React from "react";
import { Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const MediaInquirySection: React.FC = () => {
  return (
    <section className="bg-gray-50 rounded-xl p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Media Inquiries</h2>
      <p className="text-gray-600 mb-6">
        For press inquiries, interview requests, or media resources, please contact our communications team at <a href="mailto:media@wealthhorizon.ai" className="text-indigo-600 hover:underline">media@wealthhorizon.ai</a>.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="flex items-center gap-2">
          <Download size={16} /> Download Press Kit
        </Button>
        <Button variant="outline" className="flex items-center gap-2" asChild>
          <a href="mailto:media@wealthhorizon.ai">
            <Mail size={16} /> Contact Media Relations
          </a>
        </Button>
      </div>
    </section>
  );
};

export default MediaInquirySection;
