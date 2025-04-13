
/**
 * Social media links interface for team members
 */
export interface SocialLinks {
  /** LinkedIn profile URL */
  linkedin?: string;
  /** Twitter/X profile URL */
  twitter?: string;
  /** GitHub profile URL */
  github?: string;
}

/**
 * Base interface for team members with common properties
 */
interface BaseTeamMember {
  /** Unique identifier for the team member */
  id: string;
  /** Full name of the team member */
  name: string;
  /** Job title or position of the team member */
  title: string;
  /** Short biography or description */
  bio: string;
  /** Profile image path or URL */
  image: string;
  /** Social media links for the team member */
  linkedin?: string;
  /** Twitter/X profile handle */
  twitter?: string;
  /** GitHub profile handle */
  github?: string;
}

/**
 * Leadership team member with department information
 */
export interface TeamMember extends BaseTeamMember {
  /** Department or team the member belongs to */
  department: string;
}

/**
 * Advisory board member with company affiliation
 */
export interface Advisor extends BaseTeamMember {
  /** Company or organization the advisor is affiliated with */
  company: string;
}

/**
 * Leadership team members data
 */
export const leadershipTeam: ReadonlyArray<TeamMember> = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Chief Executive Officer",
    department: "Executive",
    bio: "Sarah has over 20 years of experience in financial technology and wealth management.",
    image: "/assets/team/sarah-johnson.jpg",
    linkedin: "https://linkedin.com/in/sarah-johnson",
    twitter: "https://twitter.com/sarahjohnson"
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Chief Technology Officer",
    department: "Technology",
    bio: "Michael leads our engineering team and oversees all technology strategy and implementation.",
    image: "/assets/team/michael-chen.jpg",
    linkedin: "https://linkedin.com/in/michael-chen",
    github: "https://github.com/michaelchen"
  },
  {
    id: "3",
    name: "Jessica Rodriguez",
    title: "Chief Investment Officer",
    department: "Investment",
    bio: "Jessica brings 15 years of experience in portfolio management and investment strategy.",
    image: "/assets/team/jessica-rodriguez.jpg",
    linkedin: "https://linkedin.com/in/jessica-rodriguez"
  },
  {
    id: "4",
    name: "David Thompson",
    title: "Chief Financial Officer",
    department: "Finance",
    bio: "David oversees all financial operations and strategy for the company.",
    image: "/assets/team/david-thompson.jpg",
    linkedin: "https://linkedin.com/in/david-thompson",
    twitter: "https://twitter.com/davidthompson"
  },
  {
    id: "5",
    name: "Lisa Wang",
    title: "Head of Client Relations",
    department: "Client Services",
    bio: "Lisa leads our client success team ensuring excellent service delivery.",
    image: "/assets/team/lisa-wang.jpg",
    linkedin: "https://linkedin.com/in/lisa-wang"
  },
  {
    id: "6",
    name: "Robert Patel",
    title: "Head of Product",
    department: "Product",
    bio: "Robert drives our product vision and roadmap to deliver exceptional user experiences.",
    image: "/assets/team/robert-patel.jpg",
    linkedin: "https://linkedin.com/in/robert-patel",
    github: "https://github.com/robertpatel"
  }
];

/**
 * Advisory board members data
 */
export const advisoryBoard: ReadonlyArray<Advisor> = [
  {
    id: "a1",
    name: "Dr. Emily Baker",
    title: "Financial Technology Advisor",
    company: "Stanford University",
    bio: "Dr. Baker is a leading researcher in financial technology and blockchain applications.",
    image: "/assets/team/emily-baker.jpg",
    linkedin: "https://linkedin.com/in/emily-baker",
    twitter: "https://twitter.com/emilybaker"
  },
  {
    id: "a2",
    name: "James Wilson",
    title: "Investment Strategist",
    company: "Global Wealth Partners",
    bio: "James brings decades of experience in wealth management for high-net-worth individuals.",
    image: "/assets/team/james-wilson.jpg",
    linkedin: "https://linkedin.com/in/james-wilson"
  },
  {
    id: "a3",
    name: "Angela Martinez",
    title: "Regulatory Expert",
    company: "Financial Compliance Associates",
    bio: "Angela specializes in regulatory compliance for financial technology platforms.",
    image: "/assets/team/angela-martinez.jpg",
    linkedin: "https://linkedin.com/in/angela-martinez",
    twitter: "https://twitter.com/angelamartinez"
  },
  {
    id: "a4",
    name: "Thomas Lee",
    title: "Technology Innovator",
    company: "Future Tech Ventures",
    bio: "Thomas is a serial entrepreneur who has founded multiple successful fintech startups.",
    image: "/assets/team/thomas-lee.jpg",
    linkedin: "https://linkedin.com/in/thomas-lee",
    github: "https://github.com/thomaslee"
  },
  {
    id: "a5",
    name: "Patricia Okonkwo",
    title: "Client Experience Strategist",
    company: "Elite Services Group",
    bio: "Patricia specializes in creating exceptional digital experiences for financial services clients.",
    image: "/assets/team/patricia-okonkwo.jpg",
    linkedin: "https://linkedin.com/in/patricia-okonkwo"
  }
];
