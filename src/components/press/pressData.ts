
/**
 * Press and Media data
 * Centralized data for press releases and media coverage
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

export const pressReleases: PressRelease[] = [
  {
    id: 1,
    title: "WealthHorizon Launches Advanced Portfolio Management Platform",
    date: "June 15, 2023",
    summary: "WealthHorizon today announced the launch of its advanced portfolio management platform designed specifically for family offices and high-net-worth individuals.",
    link: "/press/wealthhorizon-launches-advanced-portfolio-management-platform"
  },
  {
    id: 2,
    title: "WealthHorizon Secures $50M in Series B Funding",
    date: "March 8, 2023",
    summary: "WealthHorizon announced today that it has secured $50 million in Series B funding to accelerate growth and expand its wealth management technology offerings.",
    link: "/press/wealthhorizon-secures-50m-in-series-b-funding"
  },
  {
    id: 3,
    title: "WealthHorizon Partners with Leading Financial Institutions",
    date: "January 22, 2023",
    summary: "WealthHorizon is pleased to announce strategic partnerships with five leading financial institutions to enhance its wealth management ecosystem.",
    link: "/press/wealthhorizon-partners-with-leading-financial-institutions"
  }
];

export const mediaFeatures: MediaFeature[] = [
  {
    id: 1,
    title: "How WealthHorizon is Transforming Wealth Management Technology",
    publication: "FinTech Insider",
    date: "July 10, 2023",
    link: "https://fintechinsider.com/wealthhorizon-transforming-wealth-management",
    image: "/assets/media/fintech-insider.jpg"
  },
  {
    id: 2,
    title: "The Future of Family Office Technology: An Interview with WealthHorizon CEO",
    publication: "Wealth Management Today",
    date: "May 18, 2023",
    link: "https://wealthmanagementtoday.com/wealthhorizon-ceo-interview",
    image: "/assets/media/wealth-management-today.jpg"
  },
  {
    id: 3,
    title: "WealthHorizon Named in Top 10 WealthTech Companies to Watch",
    publication: "Forbes",
    date: "April 5, 2023",
    link: "https://forbes.com/top-wealthtech-companies-to-watch-2023",
    image: "/assets/media/forbes-feature.jpg"
  },
  {
    id: 4,
    title: "How AI is Reshaping Wealth Management: WealthHorizon Case Study",
    publication: "The Financial Times",
    date: "February 12, 2023",
    link: "https://ft.com/content/wealthhorizon-ai-wealth-management",
    image: "/assets/media/financial-times.jpg"
  }
];
