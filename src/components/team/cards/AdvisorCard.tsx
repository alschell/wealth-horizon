
import React, { memo } from 'react';
import TeamMemberImage from '../TeamMemberImage';
import SocialLinks from '../SocialLinks';
import { motion } from 'framer-motion';
import { Advisor } from '../teamData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface AdvisorCardProps {
  advisor: Advisor;
  index?: number;
  className?: string;
}

/**
 * Reusable component for rendering an advisor card
 * Features animations, accessibility, and responsive design
 */
const AdvisorCard: React.FC<AdvisorCardProps> = ({ 
  advisor,
  index = 0,
  className = ''
}) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1
      }
    }
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 20 }}
      layout
      className={className}
      data-testid="advisor-card"
    >
      <Card className="h-full flex flex-col overflow-hidden">
        <CardHeader className="flex flex-col items-center p-4 pb-2">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-3">
            <TeamMemberImage 
              image={advisor.image} 
              name={advisor.name} 
              fallbackIconSize={48}
            />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            {advisor.name}
          </h3>
          
          <p className="text-gray-600 text-center">
            {advisor.title}, {advisor.company}
          </p>
          
          <div className="mt-2">
            <SocialLinks 
              links={{
                linkedin: advisor.linkedin,
                twitter: advisor.twitter,
                github: advisor.github
              }}
              aria-label={`${advisor.name}'s social profiles`}
            />
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-2 flex-grow">
          <p className="text-gray-600 text-sm">
            {advisor.bio}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/**
 * Memoized version of AdvisorCard to prevent unnecessary re-renders
 */
export default memo(AdvisorCard);
