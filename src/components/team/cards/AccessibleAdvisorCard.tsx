
import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Github } from "lucide-react";
import { Advisor } from "../teamData";
import { 
  generateAccessibilityProps, 
  handleKeyboardNavigation 
} from "../utils/accessibilityUtils";

interface AdvisorCardProps {
  advisor: Advisor;
  index: number;
}

// Animation variants for card
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.3,
    }
  }),
  hover: {
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.2
    }
  }
};

/**
 * Enhanced advisor card with improved accessibility
 * Displays an advisor's profile with accessibility attributes
 */
const AccessibleAdvisorCard = forwardRef<HTMLDivElement, AdvisorCardProps>(
  ({ advisor, index }, ref) => {
    // Generate unique IDs for accessibility
    const cardId = `advisor-${advisor.id}`;
    const nameId = `advisor-name-${advisor.id}`;
    const titleId = `advisor-title-${advisor.id}`;
    const bioId = `advisor-bio-${advisor.id}`;
    
    // Get accessibility props
    const cardProps = generateAccessibilityProps('card', {
      id: cardId,
      label: `Advisor: ${advisor.name}, ${advisor.title} at ${advisor.company}`
    });
    
    // Handle card keyboard interaction
    const handleCardKeyPress = (event: React.KeyboardEvent) => {
      handleKeyboardNavigation(event, () => {
        // Expand card details or trigger modal, if implemented
        console.log(`Card activated for ${advisor.name}`);
      });
    };
    
    // Handle social link keyboard interaction
    const handleSocialKeyPress = (
      event: React.KeyboardEvent, 
      platform: string, 
      url?: string
    ) => {
      if (!url) return;
      
      handleKeyboardNavigation(event, () => {
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    };
    
    return (
      <motion.div
        ref={ref}
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
        {...cardProps}
        onKeyPress={handleCardKeyPress}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/3">
            <img 
              src={advisor.image} 
              alt={`${advisor.name}, ${advisor.title} at ${advisor.company}`}
              className="object-cover w-full h-full"
              loading="lazy" // Lazily load images for performance
            />
          </div>
          
          <div className="p-6 sm:w-2/3">
            <h3 
              id={nameId}
              className="text-xl font-semibold text-gray-800 mb-1"
            >
              {advisor.name}
            </h3>
            
            <p 
              id={titleId}
              className="text-indigo-600 font-medium mb-1"
            >
              {advisor.title}
            </p>
            
            <p 
              className="text-gray-500 text-sm mb-3"
            >
              {advisor.company}
            </p>
            
            <p 
              id={bioId}
              className="text-gray-600 text-sm mb-4"
            >
              {advisor.bio}
            </p>
            
            {/* Social links with improved accessibility */}
            <div 
              className="flex space-x-4 mt-4"
              aria-label={`${advisor.name}'s social media profiles`}
            >
              {advisor.linkedin && (
                <a 
                  href={advisor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label={`${advisor.name}'s LinkedIn profile`}
                  onKeyPress={(e) => handleSocialKeyPress(e, 'LinkedIn', advisor.linkedin)}
                >
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </a>
              )}
              
              {advisor.twitter && (
                <a 
                  href={advisor.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label={`${advisor.name}'s Twitter profile`}
                  onKeyPress={(e) => handleSocialKeyPress(e, 'Twitter', advisor.twitter)}
                >
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </a>
              )}
              
              {advisor.github && (
                <a 
                  href={advisor.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-800 transition-colors"
                  aria-label={`${advisor.name}'s GitHub profile`}
                  onKeyPress={(e) => handleSocialKeyPress(e, 'GitHub', advisor.github)}
                >
                  <Github size={20} />
                  <span className="sr-only">GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

AccessibleAdvisorCard.displayName = "AccessibleAdvisorCard";

export default React.memo(AccessibleAdvisorCard);
