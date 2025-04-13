
import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Github } from "lucide-react";
import { TeamMember } from "../teamData";
import { 
  generateAccessibilityProps, 
  handleKeyboardNavigation 
} from "../utils/accessibilityUtils";

interface TeamMemberCardProps {
  member: TeamMember;
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
 * Enhanced team member card with improved accessibility
 * Displays a team member's profile with accessibility attributes
 */
const AccessibleTeamMemberCard = forwardRef<HTMLDivElement, TeamMemberCardProps>(
  ({ member, index }, ref) => {
    // Generate unique IDs for accessibility
    const cardId = `team-member-${member.id}`;
    const nameId = `team-member-name-${member.id}`;
    const titleId = `team-member-title-${member.id}`;
    const bioId = `team-member-bio-${member.id}`;
    
    // Get accessibility props
    const cardProps = generateAccessibilityProps('card', {
      id: cardId,
      label: `Team member: ${member.name}, ${member.title}`
    });
    
    // Handle card keyboard interaction
    const handleCardKeyPress = (event: React.KeyboardEvent) => {
      handleKeyboardNavigation(event, () => {
        // Expand card details or trigger modal, if implemented
        console.log(`Card activated for ${member.name}`);
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
        <div className="aspect-w-1 aspect-h-1">
          <img 
            src={member.image} 
            alt={`${member.name}, ${member.title}`}
            className="object-cover w-full h-full"
            loading="lazy" // Lazily load images for performance
          />
        </div>
        
        <div className="p-6">
          <h3 
            id={nameId}
            className="text-xl font-semibold text-gray-800 mb-1"
          >
            {member.name}
          </h3>
          
          <p 
            id={titleId}
            className="text-indigo-600 font-medium mb-1"
          >
            {member.title}
          </p>
          
          <p 
            className="text-gray-500 text-sm mb-3"
          >
            {member.department}
          </p>
          
          <p 
            id={bioId}
            className="text-gray-600 text-sm mb-4"
          >
            {member.bio}
          </p>
          
          {/* Social links with improved accessibility */}
          <div 
            className="flex space-x-4 mt-4"
            aria-label={`${member.name}'s social media profiles`}
          >
            {member.linkedin && (
              <a 
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
                aria-label={`${member.name}'s LinkedIn profile`}
                onKeyPress={(e) => handleSocialKeyPress(e, 'LinkedIn', member.linkedin)}
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            )}
            
            {member.twitter && (
              <a 
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label={`${member.name}'s Twitter profile`}
                onKeyPress={(e) => handleSocialKeyPress(e, 'Twitter', member.twitter)}
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            )}
            
            {member.github && (
              <a 
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-800 transition-colors"
                aria-label={`${member.name}'s GitHub profile`}
                onKeyPress={(e) => handleSocialKeyPress(e, 'GitHub', member.github)}
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);

AccessibleTeamMemberCard.displayName = "AccessibleTeamMemberCard";

export default React.memo(AccessibleTeamMemberCard);
