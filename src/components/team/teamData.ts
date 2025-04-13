
/**
 * Team data for the company leadership and advisory board
 */

export interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
}

export interface Advisor {
  id: number;
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export const leadershipTeam: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Chief Executive Officer",
    bio: "Sarah has over 20 years of experience in wealth management and financial technology. Prior to founding WealthHorizon, she was a Senior Partner at McKinsey's Financial Services practice.",
    image: "/assets/team/sarah-johnson.jpg",
    linkedin: "https://linkedin.com/in/sarah-johnson",
    twitter: "https://twitter.com/sarahjohnson"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Chief Technology Officer",
    bio: "Michael brings 15 years of experience building financial technology platforms. He previously led engineering teams at Goldman Sachs and was CTO at FinTech startup WealthFront.",
    image: "/assets/team/michael-chen.jpg",
    linkedin: "https://linkedin.com/in/michael-chen"
  },
  {
    id: 3,
    name: "David Rodriguez",
    title: "Chief Financial Officer",
    bio: "David has extensive experience in financial operations and strategy. Before joining WealthHorizon, he served as CFO at leading wealth management firms and investment banks.",
    image: "/assets/team/david-rodriguez.jpg",
    linkedin: "https://linkedin.com/in/david-rodriguez"
  },
  {
    id: 4,
    name: "Amanda Patel",
    title: "Chief Product Officer",
    bio: "Amanda leads product strategy and development at WealthHorizon. She brings experience from product leadership roles at Morgan Stanley and BlackRock.",
    image: "/assets/team/amanda-patel.jpg",
    linkedin: "https://linkedin.com/in/amanda-patel",
    twitter: "https://twitter.com/amandapatel"
  }
];

export const advisoryBoard: Advisor[] = [
  {
    id: 1,
    name: "Jonathan Blake",
    title: "Former CEO",
    company: "Global Asset Management",
    bio: "Jonathan brings four decades of experience in asset management and family office services, having led one of the world's largest wealth management firms.",
    image: "/assets/team/jonathan-blake.jpg",
    linkedin: "https://linkedin.com/in/jonathan-blake"
  },
  {
    id: 2,
    name: "Eliza Wong",
    title: "Managing Partner",
    company: "Horizon Ventures",
    bio: "Eliza has extensive experience in venture capital and private equity. She advises WealthHorizon on strategic partnerships and growth opportunities.",
    image: "/assets/team/eliza-wong.jpg",
    linkedin: "https://linkedin.com/in/eliza-wong"
  },
  {
    id: 3,
    name: "Robert Franklin",
    title: "Professor of Finance",
    company: "Stanford University",
    bio: "Dr. Franklin is a leading academic in wealth management theory and practice. He brings cutting-edge research insights to WealthHorizon's strategy.",
    image: "/assets/team/robert-franklin.jpg",
    linkedin: "https://linkedin.com/in/robert-franklin"
  }
];
