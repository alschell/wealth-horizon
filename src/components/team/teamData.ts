
/**
 * Team members data definitions and data
 */

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string; // Added github property
}

export interface TeamMember extends SocialLinks {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
  department?: string; // Added optional department property
}

export interface Advisor extends SocialLinks {
  id: number;
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
}

// Leadership team data
export const leadershipTeam: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Chief Executive Officer",
    bio: "Sarah has over 20 years of experience in wealth management and financial technology. Previously, she was the COO at FinTech Innovations and led product strategy at Global Wealth Partners.",
    image: "/assets/team/sarah-johnson.jpg",
    linkedin: "https://linkedin.com/in/sarah-johnson"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Chief Technology Officer",
    bio: "Michael brings 15 years of engineering leadership from top technology companies. He previously built scalable financial systems at PayTech and led engineering teams at DataSystems Inc.",
    image: "/assets/team/michael-chen.jpg",
    linkedin: "https://linkedin.com/in/michael-chen",
    twitter: "https://twitter.com/michaelchentech"
  },
  {
    id: 3,
    name: "David Rodriguez",
    title: "Chief Investment Officer",
    bio: "David has spent 18 years managing investments for ultra-high-net-worth individuals and family offices. He previously served as Managing Director at Global Capital Partners.",
    image: "/assets/team/david-rodriguez.jpg",
    linkedin: "https://linkedin.com/in/david-rodriguez"
  },
  {
    id: 4,
    name: "Emily Takahashi",
    title: "Chief Product Officer",
    bio: "Emily has led product development for financial platforms for over 12 years. She previously headed product at WealthFront Solutions and was a product strategist at BlackRock.",
    image: "/assets/team/emily-takahashi.jpg",
    linkedin: "https://linkedin.com/in/emily-takahashi",
    twitter: "https://twitter.com/emilytakahashi"
  }
];

// Advisory board data
export const advisoryBoard: Advisor[] = [
  {
    id: 1,
    name: "Dr. Robert Freeman",
    title: "Financial Technology Advisor",
    company: "MIT FinTech Lab",
    bio: "Dr. Freeman is a leading researcher in financial technology and algorithmic trading systems. He advises multiple fintech startups and has published extensively on digital transformation in finance.",
    image: "/assets/team/robert-freeman.jpg",
    linkedin: "https://linkedin.com/in/dr-robert-freeman"
  },
  {
    id: 2,
    name: "Jane Martinez",
    title: "Former Commissioner",
    company: "SEC",
    bio: "Jane served as a Commissioner at the SEC for 8 years, where she specialized in regulatory frameworks for emerging financial technologies and investor protection initiatives.",
    image: "/assets/team/jane-martinez.jpg",
    linkedin: "https://linkedin.com/in/jane-martinez"
  },
  {
    id: 3,
    name: "Thomas Wu",
    title: "Managing Partner",
    company: "Global Ventures",
    bio: "Thomas has invested in over 40 financial technology companies, with 7 successful exits. He specializes in wealth management technologies and financial infrastructure investments.",
    image: "/assets/team/thomas-wu.jpg",
    linkedin: "https://linkedin.com/in/thomas-wu"
  }
];
