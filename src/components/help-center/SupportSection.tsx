
import React from "react";
import { MessageCircle, FileText, BookOpen, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/hooks/use-notifications";
import { TranslatedText } from "@/components/ui/translated-text";

export const SupportSection: React.FC = () => {
  const navigate = useNavigate();
  const { showSuccess } = useNotifications();

  // Handle chat support function
  const startChat = () => {
    showSuccess(
      "Chat initiated",
      "A support agent will be with you shortly."
    );
    // In a real app, this would open a chat window or redirect to a chat interface
  };

  // Handle support ticket submission
  const submitTicket = () => {
    navigate("/support-ticket");
  };

  // Handle downloading a guide
  const downloadGuide = () => {
    navigate("/user-guides");
  };

  // YouTube channel URL
  const youtubeChannelUrl = "https://www.youtube.com/@wealthhorizonai";

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="bg-indigo-600 rounded-xl p-8 text-white">
          <div className="flex items-center mb-4">
            <MessageCircle size={24} className="mr-3" />
            <h2 className="text-xl font-semibold text-white">
              <TranslatedText>Chat with Support</TranslatedText>
            </h2>
          </div>
          <p className="mb-6">
            <TranslatedText>
              Get immediate assistance from our team of wealth management and technical experts through our chat support.
            </TranslatedText>
          </p>
          <Button 
            className="bg-white text-indigo-600 hover:bg-gray-100"
            onClick={startChat}
          >
            <TranslatedText>Start a Chat</TranslatedText>
          </Button>
        </div>
        
        <div className="bg-indigo-600 rounded-xl p-8 text-white">
          <div className="flex items-center mb-4">
            <FileText size={24} className="mr-3" />
            <h2 className="text-xl font-semibold text-white">
              <TranslatedText>Contact Support</TranslatedText>
            </h2>
          </div>
          <p className="mb-6">
            <TranslatedText>
              Need additional help? Submit a support ticket and our team will get back to you as soon as possible.
            </TranslatedText>
          </p>
          <Button 
            className="bg-white text-indigo-600 hover:bg-gray-100"
            onClick={submitTicket}
          >
            <TranslatedText>Submit a Ticket</TranslatedText>
          </Button>
        </div>
      </section>
      
      <section className="bg-gray-50 rounded-xl p-8 mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          <TranslatedText>Additional Resources</TranslatedText>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Button 
            variant="outline" 
            className="justify-start h-auto py-4 px-5" 
            onClick={() => navigate("/api-docs")}
          >
            <div className="flex items-center cursor-pointer">
              <BookOpen size={20} className="mr-3 text-indigo-600" />
              <span><TranslatedText>API Documentation</TranslatedText></span>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="justify-start h-auto py-4 px-5" 
            onClick={downloadGuide}
          >
            <div className="flex items-center cursor-pointer">
              <Download size={20} className="mr-3 text-indigo-600" />
              <span><TranslatedText>User Guides</TranslatedText></span>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="justify-start h-auto py-4 px-5" 
            onClick={() => window.open(youtubeChannelUrl, "_blank")}
          >
            <div className="flex items-center cursor-pointer">
              <ExternalLink size={20} className="mr-3 text-indigo-600" />
              <span><TranslatedText>Video Tutorials</TranslatedText></span>
            </div>
          </Button>
          <Button 
            variant="outline" 
            className="justify-start h-auto py-4 px-5" 
            onClick={() => navigate("/community-forum")}
          >
            <div className="flex items-center cursor-pointer">
              <MessageCircle size={20} className="mr-3 text-indigo-600" />
              <span><TranslatedText>Community Forum</TranslatedText></span>
            </div>
          </Button>
        </div>
      </section>
    </>
  );
};
