
import React, { memo } from 'react';
import TeamMemberImage from '../TeamMemberImage';
import SocialLinks from '../SocialLinks';
import { motion } from 'framer-motion';
import { TeamMember } from '../teamData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface TeamMemberCardProps {
  member: TeamMember;
  index?: number;
  className?: string;
}

/**
 * Reusable component for rendering a team member card
 * Features animations, accessibility, and responsive design
 */
const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ 
  member,
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
      data-testid="team-member-card"
    >
      <Card className="h-full flex flex-col overflow-hidden">
        <CardHeader className="p-4 pb-2">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
              <div className="h-48 w-48 mx-auto md:mx-0 rounded-lg overflow-hidden bg-gray-100">
                <TeamMemberImage 
                  image={member.image} 
                  name={member.name}
                  fallbackIconSize={60}
                />
              </div>
              
              <div className="flex justify-center md:justify-start mt-3">
                <SocialLinks 
                  links={{
                    linkedin: member.linkedin,
                    twitter: member.twitter,
                    github: member.github
                  }}
                  aria-label={`${member.name}'s social profiles`}
                />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-indigo-600 mb-3">{member.title}</p>
              {member.department && (
                <p className="text-gray-500 mb-3">Department: {member.department}</p>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-2 flex-grow">
          <p className="text-gray-600">{member.bio}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/**
 * Memoized version of TeamMemberCard to prevent unnecessary re-renders
 */
export default memo(TeamMemberCard);
