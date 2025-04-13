
/**
 * Press related data definitions and data
 */

export interface PressRelease {
  id: number;
  title: string;
  date: string;
  summary: string;
  link: string;
}

export interface MediaFeature {
  id: number;
  title: string;
  publication: string;
  date: string;
  link: string;
  image: string;
}

// Press releases data
export const pressReleases: PressRelease[] = [
  {
    id: 1,
    title: "WealthHorizon Announces Series B Funding Round of $50 Million",
    date: "March 15, 2025",
    summary: "Funding to accelerate product development and international expansion to serve family offices globally.",
    link: "/press/announcements/series-b-funding"
  },
  {
    id: 2,
    title: "WealthHorizon Launches AI-Powered Portfolio Analytics",
    date: "February 10, 2025",
    summary: "New features include predictive analytics and scenario planning tools for complex multi-asset portfolios.",
    link: "/press/product/ai-analytics-launch"
  },
  {
    id: 3,
    title: "WealthHorizon Partners with Leading Global Banks",
    date: "January 22, 2025",
    summary: "Strategic partnerships will enable seamless integration with major financial institutions worldwide.",
    link: "/press/partnerships/global-banks"
  }
];

// Media coverage data
export const mediaFeatures: MediaFeature[] = [
  {
    id: 1,
    title: "How WealthHorizon is Transforming Family Office Management",
    publication: "Financial Times",
    date: "March 20, 2025",
    link: "https://ft.com/articles/wealthhorizon-family-office",
    image: "/assets/press/financial-times.jpg"
  },
  {
    id: 2,
    title: "The Future of Wealth Tech: WealthHorizon's Innovative Approach",
    publication: "Forbes",
    date: "February 15, 2025",
    link: "https://forbes.com/wealth-tech-wealthhorizon",
    image: "/assets/press/forbes.jpg"
  },
  {
    id: 3,
    title: "WealthHorizon Named Among Top 10 FinTech Startups to Watch",
    publication: "TechCrunch",
    date: "January 28, 2025",
    link: "https://techcrunch.com/2025/01/28/top-fintech-startups",
    image: "/assets/press/techcrunch.jpg"
  },
  {
    id: 4,
    title: "How AI is Reshaping Wealth Management: WealthHorizon Case Study",
    publication: "Bloomberg",
    date: "January 10, 2025",
    link: "https://bloomberg.com/wealth-ai-wealthhorizon",
    image: "/assets/press/bloomberg.jpg"
  }
];
