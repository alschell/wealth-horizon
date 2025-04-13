
import React, { useState } from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BlogList } from "@/components/blog/BlogList";
import { BlogPostView } from "@/components/blog/BlogPost";
import { PopularTopics } from "@/components/blog/PopularTopics";
import { NewsletterSubscription } from "@/components/blog/NewsletterSubscription";
import { BlogPost } from "@/components/blog/types";
import { Helmet } from "react-helmet-async";

// Enhanced blog data with realistic content
const blogPosts = [
  {
    id: 1,
    title: "The Future of Family Office Investment Strategies in a High-Rate Environment",
    excerpt: "Exploring how family offices are adapting their investment approaches to navigate the changing economic landscape of high interest rates and volatile markets.",
    author: "Sarah Chen",
    authorAvatar: "/assets/dashboard-preview.png",
    date: "April 5, 2025",
    category: "Investment Strategy",
    readTime: "6 min read",
    content: `
      <p>The investment landscape for family offices continues to evolve rapidly in 2025. With persistent high interest rates and global market volatility, family offices are being forced to reconsider traditional allocation models and embrace new approaches.</p>
      
      <h2>Adapting to the Higher Rate Environment</h2>
      <p>After years of near-zero interest rates, many family offices had constructed portfolios heavily weighted toward growth assets and alternative investments. The sustained higher rate environment has created opportunities in fixed income that haven't existed for over a decade.</p>
      <p>"We're seeing family offices reallocate 15-20% of their portfolios toward high-quality fixed income," notes David Morgan, Chief Investment Officer at Harrington Family Office. "The ability to lock in 5-6% yields on investment-grade corporate bonds provides both income and stability that wasn't available just a few years ago."</p>
      
      <h2>Private Credit Comes of Age</h2>
      <p>One of the most significant shifts in family office strategy has been the increased allocation to private credit. As traditional banks have pulled back from certain lending activities due to regulatory constraints, family offices have stepped in to fill the void.</p>
      <p>Private lending now accounts for approximately 12% of the average family office portfolio, up from just 5% three years ago. These investments offer yields of 8-12% with greater structural protection than public market alternatives.</p>
      
      <h2>Technology Integration for Better Decision Making</h2>
      <p>Family offices are increasingly leveraging advanced technology to enhance their investment decision-making processes. AI-powered analytics platforms are being used to assess portfolio risk, identify market opportunities, and monitor performance in real-time.</p>
      <p>"The technology we have access to today has transformed how we manage investments," explains Jennifer Wu, technology director at a multi-billion dollar family office. "We can now run sophisticated scenario analyses and stress tests that were previously only available to the largest institutional investors."</p>
      
      <h2>The ESG Evolution Continues</h2>
      <p>Environmental, Social, and Governance (ESG) considerations remain central to family office investment strategies, but the approach has become more nuanced. Rather than broad exclusionary screening, family offices are adopting impact-focused approaches aligned with specific family values.</p>
      <p>Climate technology, sustainable agriculture, and healthcare innovation have emerged as favored themes, with many family offices committing 20-30% of their venture capital allocations to these sectors.</p>
      
      <h2>Looking Ahead</h2>
      <p>As we move through 2025, family offices that excel will be those that can balance traditional wealth preservation with strategic adaptability. The most successful are building custom portfolios that leverage higher rates for income while maintaining exposure to emerging growth trends and private market opportunities.</p>
      <p>The integration of sophisticated technology platforms for portfolio management, risk assessment, and reporting will continue to be a key differentiator, enabling family offices to make more informed decisions in an increasingly complex investment landscape.</p>
    `,
    image: "/assets/dashboard-preview.png"
  },
  {
    id: 2,
    title: "ESG Integration: Beyond the Basics for Family Offices",
    excerpt: "How leading family offices are incorporating sophisticated ESG metrics into their investment decision-making process while generating competitive returns.",
    author: "Michael Roberts",
    authorAvatar: "/assets/dashboard-fallback.png",
    date: "March 28, 2025",
    category: "ESG",
    readTime: "8 min read",
    content: `
      <p>Environmental, Social, and Governance (ESG) factors have evolved from peripheral considerations to central components of investment analysis for family offices. As we progress through 2025, sophisticated family offices are moving beyond basic ESG integration to develop nuanced approaches that align with both values and performance objectives.</p>
      
      <h2>The Maturation of ESG Analytics</h2>
      <p>Early ESG integration often relied on third-party ratings that provided a simplified view of a company's practices. Today's leading family offices are implementing proprietary frameworks that combine multiple data sources with industry-specific materiality assessments.</p>
      <p>"We've moved beyond accepting generic ESG scores," explains Katherine Lee, Chief Investment Officer at Meridian Family Office. "Our investment team has developed sector-specific frameworks that identify which ESG factors are most likely to impact financial performance in each industry."</p>
      
      <h2>Direct Impact Through Private Markets</h2>
      <p>Family offices have a unique advantage in ESG implementation through their access to private market investments. Direct investments in private companies allow for greater influence over business practices and operational improvements.</p>
      <p>Private equity holdings now represent an average of 25% of family office portfolios, with nearly half of these investments incorporating specific impact objectives alongside financial return targets.</p>
      
      <h2>Climate Transition as an Investment Thesis</h2>
      <p>Climate change mitigation has emerged as both a risk management imperative and an investment opportunity for forward-thinking family offices. Beyond divestment from fossil fuels, sophisticated investors are developing comprehensive climate transition strategies.</p>
      <p>"We've committed 15% of our portfolio to climate solutions across public equities, private equity, and venture capital," says Thomas Wilson of the Wilson Family Office. "These investments range from renewable energy infrastructure to emerging technologies in carbon capture and sustainable agriculture."</p>
      
      <h2>Measuring What Matters</h2>
      <p>As ESG integration matures, the focus has shifted from policy implementation to outcome measurement. Family offices are developing sophisticated reporting capabilities that track both financial performance and impact metrics.</p>
      <p>Advanced analytics platforms now enable investors to measure portfolio carbon intensity, diversity metrics, and contribution to the UN Sustainable Development Goals alongside traditional financial returns.</p>
      
      <h2>Challenges and Opportunities Ahead</h2>
      <p>Despite progress, challenges remain in ESG implementation. Data quality and comparability continue to improve but remain inconsistent across markets and asset classes. Regulatory requirements are evolving rapidly, creating compliance considerations alongside investment opportunities.</p>
      <p>For family offices, these challenges also present opportunities to develop distinctive investment approaches that reflect family values while capturing emerging opportunities in the transition to a more sustainable economy.</p>
    `,
    image: "/assets/dashboard-fallback.png"
  },
  {
    id: 3,
    title: "Navigating Regulatory Changes in Global Wealth Management",
    excerpt: "A comprehensive guide to recent regulatory shifts across major jurisdictions and how they impact wealth management operations for family offices.",
    author: "Jessica Wong",
    authorAvatar: "/assets/dashboard-preview.png",
    date: "March 15, 2025",
    category: "Compliance",
    readTime: "5 min read",
    content: `
      <p>The regulatory landscape for wealth management continues to evolve at an accelerating pace. Family offices operating across multiple jurisdictions face particularly complex challenges in maintaining compliance while optimizing structure and strategy. This article provides a comprehensive overview of recent regulatory developments and their implications.</p>
      
      <h2>Global Transparency Initiatives</h2>
      <p>The implementation of the Common Reporting Standard (CRS) and similar transparency initiatives has transformed the global tax landscape. Automatic exchange of information between tax authorities has eliminated traditional offshore strategies based primarily on secrecy.</p>
      <p>"Family offices need to assume that all financial information will be visible to tax authorities globally," advises Jonathan Chen, head of international tax at Park Hansen LLP. "Structures should be designed with the expectation of full transparency from the outset."</p>
      
      <h2>Beneficial Ownership Registries</h2>
      <p>The expansion of beneficial ownership registries across major jurisdictions continues to increase transparency requirements. The EU's expanded beneficial ownership rules now require disclosure of individuals with as little as 5% effective control in certain circumstances.</p>
      <p>While some registries remain private to government authorities, the trend is toward broader access, with several jurisdictions now providing public access to ownership information.</p>
      
      <h2>Family Office Exemptions Under Pressure</h2>
      <p>Several jurisdictions have traditionally provided exemptions from investment advisor registration for single-family offices. These exemptions are increasingly coming under scrutiny and being narrowed in scope.</p>
      <p>"We're advising family offices to prepare for a future where full registration may be required even for single-family entities," notes Sophia Rodriguez, a regulatory compliance specialist. "The compliance infrastructure should be built with these requirements in mind."</p>
      
      <h2>Digital Asset Regulation</h2>
      <p>As family offices increase their exposure to digital assets, navigating the evolving regulatory framework becomes essential. Major jurisdictions have implemented comprehensive cryptocurrency regulations, with requirements for registration, custody solutions, and tax reporting.</p>
      <p>The lack of global standardization creates particular challenges for multi-jurisdictional family offices, with significant variation in treatment across regions.</p>
      
      <h2>Strategic Response to Regulatory Change</h2>
      <p>Leading family offices are responding to these changes by strengthening their compliance infrastructure and integrating regulatory considerations into strategic planning from the outset.</p>
      <p>This includes implementing robust documentation processes, conducting regular compliance reviews, and establishing clear protocols for cross-border activities. Technology solutions for compliance monitoring and reporting have become essential tools rather than optional enhancements.</p>
      
      <h2>Looking Ahead</h2>
      <p>The regulatory environment will continue to evolve, with increased focus on transparency, beneficial ownership, and cross-border information sharing. Family offices that build flexible compliance frameworks and integrate regulatory considerations into their core strategy will be best positioned to navigate this changing landscape effectively.</p>
    `,
    image: "/assets/dashboard-preview.png"
  },
  {
    id: 4,
    title: "Digital Transformation in Family Offices: Beyond the Buzzwords",
    excerpt: "How technology is fundamentally transforming the operations of modern family offices and creating new opportunities for enhanced performance and service.",
    author: "James Wilson",
    authorAvatar: "/assets/dashboard-fallback.png",
    date: "March 10, 2025",
    category: "Technology",
    readTime: "7 min read",
    content: `
      <p>Digital transformation has become a strategic imperative rather than just an operational enhancement for family offices. As technology capabilities expand and client expectations evolve, family offices are reimagining their service models and internal processes through digital innovation.</p>
      
      <h2>The Integrated Technology Ecosystem</h2>
      <p>Leading family offices have moved beyond implementing individual technology solutions to developing integrated digital ecosystems. These platforms connect portfolio management, accounting, tax planning, document management, and client reporting through unified data models and seamless interfaces.</p>
      <p>"The days of siloed systems are over," explains Michael Chen, Chief Technology Officer at Westlake Family Office. "Our technology architecture now ensures that data flows seamlessly between systems, eliminating reconciliation challenges and providing real-time visibility across all aspects of the family's financial affairs."</p>
      
      <h2>Enhanced Client Experience Through Digital Engagement</h2>
      <p>Digital interfaces are transforming how family offices engage with clients, particularly as younger generations become more active in family financial governance. Secure portals and mobile applications provide on-demand access to portfolio information, document repositories, and interactive reporting tools.</p>
      <p>These platforms support collaborative decision-making through shared dashboards, secure communication channels, and digital approval workflows that streamline processes while maintaining appropriate controls.</p>
      
      <h2>Data as a Strategic Asset</h2>
      <p>Advanced analytics capabilities are enabling family offices to derive greater value from their data resources. By combining internal financial information with external market data, family offices gain insights that enhance investment decision-making and risk management.</p>
      <p>"Our data analytics platform has transformed how we understand portfolio performance," notes Jennifer Park of Heritage Family Partners. "We can now drill down into factor exposures, scenario analyses, and correlation patterns that were previously unavailable without specialized resources."</p>
      
      <h2>Process Automation and Efficiency</h2>
      <p>Automation technologies are streamlining operational processes throughout the family office. Robotic process automation (RPA) handles routine tasks such as data aggregation, reconciliation, and report generation, freeing staff to focus on higher-value activities.</p>
      <p>Document management systems with advanced optical character recognition (OCR) capabilities are eliminating manual data entry, while intelligent workflows route information and approval requests automatically based on predefined rules.</p>
      
      <h2>Cybersecurity as Foundation</h2>
      <p>As digital capabilities expand, cybersecurity has become a foundational element of family office operations. Leading organizations are implementing comprehensive security frameworks that encompass technical controls, staff training, vendor management, and incident response planning.</p>
      <p>Regular security assessments, penetration testing, and tabletop exercises ensure that security measures remain effective against evolving threats targeting high-net-worth families.</p>
      
      <h2>The Human Element</h2>
      <p>Despite technological advances, successful digital transformation in family offices ultimately depends on human factors. Staff must be equipped with both technical skills and the ability to translate data into meaningful insights and recommendations.</p>
      <p>The most effective implementations balance technological capabilities with the personal relationships and customized service that remain central to the family office value proposition.</p>
    `,
    image: "/assets/dashboard-fallback.png"
  },
  {
    id: 5,
    title: "Next-Generation Wealth Transfer: Strategies for Success",
    excerpt: "Preparing for successful wealth transfer to the next generation while maintaining family values, harmony, and effective wealth stewardship.",
    author: "Emily Chen",
    authorAvatar: "/assets/dashboard-preview.png",
    date: "February 25, 2025",
    category: "Family Governance",
    readTime: "9 min read",
    content: `
      <p>Successful wealth transfer across generations remains one of the greatest challenges facing high-net-worth families. Beyond the technical aspects of estate planning and tax efficiency, effective transitions require thoughtful preparation of both assets and family members for the responsibilities of wealth stewardship.</p>
      
      <h2>The Evolution of Wealth Transfer Planning</h2>
      <p>Modern approaches to wealth transfer have expanded beyond traditional estate planning to incorporate broader family governance considerations. Leading families are developing comprehensive frameworks that address both financial assets and human capital development.</p>
      <p>"Successful wealth transition requires at least five years of intentional preparation," explains Sarah Johnson, a family governance consultant. "Families who begin the conversation early and approach it as an ongoing process rather than a single event achieve significantly better outcomes."</p>
      
      <h2>Family Governance Structures</h2>
      <p>Formal governance structures provide essential frameworks for decision-making and communication during and after wealth transitions. These may include family councils, investment committees, and regular family meetings with defined processes for discussion and decision-making.</p>
      <p>These structures create opportunities for next-generation involvement while providing guidance and boundaries that help rising family members develop confidence and competence in wealth management.</p>
      
      <h2>Values-Based Planning</h2>
      <p>Shared values provide crucial continuity across generations, even as investment strategies and asset allocations evolve. Leading families are explicitly documenting their values and incorporating them into family constitutions, investment policy statements, and philanthropic guidelines.</p>
      <p>"When families clearly articulate their values and build their wealth structures around those principles, they create resilience across generations," notes Michael Chen, who advises multi-generational families on governance.</p>
      
      <h2>Education and Preparation</h2>
      <p>Comprehensive education programs are essential components of succession planning. These programs include both financial literacy and practical experience in wealth management, often beginning in early adulthood and continuing through progressive responsibility.</p>
      <p>Experiential learning through board participation, venture investment committees, and philanthropic governance provides practical application of concepts in supportive environments.</p>
      
      <h2>Communication and Transparency</h2>
      <p>Open communication remains the foundation of successful transitions. Families achieving the most effective successions typically begin discussions about wealth, its purpose, and its management decades before actual transitions occur.</p>
      <p>This transparency extends to both assets and expectations, with clear communication about the roles and responsibilities that accompany wealth rather than simply its privileges and opportunities.</p>
      
      <h2>Professional Advisory Teams</h2>
      <p>The complexity of modern wealth transition requires specialized expertise across multiple disciplines. Leading families build collaborative advisory teams that include not only technical specialists in tax, estate planning, and investments, but also facilitators, educators, and advisors with expertise in family dynamics.</p>
      <p>These multidisciplinary teams work together to address both the technical and human aspects of wealth transition, creating solutions that reflect each family's unique circumstances and objectives.</p>
    `,
    image: "/assets/dashboard-preview.png"
  },
  {
    id: 6,
    title: "Private Market Investment Trends for Family Offices",
    excerpt: "An analysis of current trends and opportunities in private equity, venture capital, and private debt markets for sophisticated family office investors.",
    author: "David Brown",
    authorAvatar: "/assets/dashboard-fallback.png",
    date: "February 18, 2025",
    category: "Private Markets",
    readTime: "10 min read",
    content: `
      <p>Private market investments have become increasingly central to family office investment strategies, with allocations continuing to grow despite challenging market conditions. This article examines current trends and opportunities across private equity, venture capital, and private credit markets.</p>
      
      <h2>Direct Investment Acceleration</h2>
      <p>Family offices continue to increase their direct investment activities, bypassing traditional fund structures in favor of direct company ownership. This approach has expanded beyond traditional private equity to include growth equity, real estate, and private credit strategies.</p>
      <p>"We're deploying approximately 60% of our private market allocation through direct investments," notes Jonathan Park, CIO of a third-generation family office. "This gives us greater control over investment selection, holding periods, and ultimately, exit timing."</p>
      
      <h2>Sector Specialization</h2>
      <p>Leading family offices are developing sector specializations that leverage their unique knowledge bases, networks, and operational expertise. This focused approach enhances deal flow, improves due diligence capabilities, and increases value-creation opportunities post-investment.</p>
      <p>Healthcare, enterprise technology, financial services, and consumer brands emerge as particularly popular sectors for family office specialization, often reflecting the original source of family wealth.</p>
      
      <h2>Co-Investment Networks</h2>
      <p>Collaborative co-investment networks between complementary family offices have become increasingly formalized. These networks allow participants to access a broader range of opportunities, combine sector expertise, and achieve more favorable economics than traditional fund investments.</p>
      <p>Digital platforms dedicated to family office deal sharing have accelerated this trend, with several networks now facilitating billions in annual transaction volume.</p>
      
      <h2>Private Credit Expansion</h2>
      <p>As interest rates have stabilized at higher levels, family offices have significantly expanded their private credit activities. These strategies offer attractive current yield with strong structural protections compared to public fixed income alternatives.</p>
      <p>Asset-backed lending, specialty finance, and direct lending to middle-market companies represent the most active segments, with typical yields ranging from 8-12% depending on structure and collateralization.</p>
      
      <h2>Venture Capital Recalibration</h2>
      <p>After the valuation adjustments of 2022-2023, family offices are returning to venture capital with more disciplined approaches. Investment programs now typically emphasize companies with clear paths to profitability rather than pure growth stories.</p>
      <p>Early-stage investments are increasingly structured with stronger investor protections, including more comprehensive information rights, governance provisions, and preference structures.</p>
      
      <h2>ESG Integration</h2>
      <p>Environmental, Social, and Governance (ESG) considerations have become integral to private market investment processes. Beyond risk management, family offices are identifying opportunities in climate technology, healthcare access, and financial inclusion that align with both impact objectives and return requirements.</p>
      <p>"We're finding that our ESG-aligned investments are outperforming our broader portfolio," explains Katherine Lee of Summit Family Partners. "Companies addressing major sustainability challenges are creating significant value through business model innovation."</p>
      
      <h2>Operational Value Creation</h2>
      <p>As multiple expansion has become a less reliable driver of private equity returns, family offices are placing greater emphasis on operational improvement as a value creation strategy. Many have built internal operating teams with specific expertise in digitalization, supply chain optimization, and go-to-market strategy.</p>
      <p>These capabilities allow family offices to target overlooked or underperforming companies with specific operational challenges that can be addressed through active ownership.</p>
    `,
    image: "/assets/dashboard-fallback.png"
  },
];

const allCategories = ["All Topics", "Investment Strategy", "Market Analysis", "Wealth Planning", "Regulatory Updates", "Family Governance", "Technology", "ESG", "Private Markets", "Compliance"];

const popularTopics = ["Investment Strategy", "Market Analysis", "Wealth Planning", "Regulatory Updates", "Family Governance", "Technology", "ESG", "Private Markets"];

const Blog = () => {
  const [showBlogPost, setShowBlogPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // View blog post
  const viewBlogPost = (post: BlogPost) => {
    setSelectedPost(post);
    setShowBlogPost(true);
    window.scrollTo(0, 0);
  };
  
  // Back to blog list
  const backToBlogList = () => {
    setShowBlogPost(false);
    setSelectedPost(null);
  };

  return (
    <>
      <Helmet>
        <title>{showBlogPost && selectedPost ? `${selectedPost.title} | Blog` : 'Blog | WealthHorizon'}</title>
        <meta 
          name="description" 
          content={showBlogPost && selectedPost ? selectedPost.excerpt : "Insights, analysis, and updates from WealthHorizon's wealth management experts."}
        />
        <meta name="keywords" content="wealth management, family office, investment strategy, financial planning, technology" />
      </Helmet>
      
      <PageTemplate
        title="Blog"
        description="Insights, analysis, and updates from our wealth management experts."
        icon={FileText}
      >
        <div className="space-y-12">
          {showBlogPost && selectedPost ? (
            <BlogPostView 
              post={selectedPost} 
              allPosts={blogPosts}
              goBack={backToBlogList} 
              viewBlogPost={viewBlogPost}
            />
          ) : (
            <>
              <BlogList
                posts={blogPosts}
                allCategories={allCategories}
                viewBlogPost={viewBlogPost}
              />
              
              <Separator />
              
              <PopularTopics 
                topics={popularTopics}
                handleCategorySelect={() => {
                  setShowBlogPost(false);
                  // Note: We don't directly call handleCategorySelect here anymore
                  // as that's handled within the BlogList component via the hook
                }}
              />
              
              <NewsletterSubscription />
            </>
          )}
        </div>
      </PageTemplate>
    </>
  );
};

export default Blog;
