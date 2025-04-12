
import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { HelpCircle, Search, FileText, MessageCircle, BookOpen, CheckCircle, ExternalLink, ArrowLeft, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

// Define article types
type Article = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  category: string;
  tags: string[];
};

// Sample article data
const helpArticles: Article[] = [
  {
    id: "connecting-accounts",
    title: "How do I connect my financial accounts?",
    shortDescription: "Learn how to securely connect your financial accounts to the platform.",
    content: `
      <h2>Connecting Your Financial Accounts</h2>
      <p>You can connect your accounts through our secure integration system by following these steps:</p>
      <ol>
        <li>Navigate to Settings > Integrations</li>
        <li>Select your financial institution from the list of available providers</li>
        <li>Follow the secure prompts to authenticate with your provider</li>
        <li>Choose which accounts you'd like to connect</li>
        <li>Review permissions and confirm the connection</li>
      </ol>
      <p>Once connected, your account data will begin syncing automatically. This process may take a few minutes to complete.</p>
      <h3>Troubleshooting Connection Issues</h3>
      <p>If you encounter any issues when connecting your accounts:</p>
      <ul>
        <li>Check that you're using the correct login credentials for your financial institution</li>
        <li>Ensure that your financial institution's services are not experiencing downtime</li>
        <li>Try reconnecting after clearing your browser cache</li>
        <li>Contact our support team if problems persist</li>
      </ul>
    `,
    category: "Getting Started",
    tags: ["accounts", "setup", "integrations"]
  },
  {
    id: "data-security",
    title: "Is my financial data secure?",
    shortDescription: "Information about our security practices and data protection measures.",
    content: `
      <h2>Our Security Practices</h2>
      <p>Security is our top priority. Here's how we protect your data:</p>
      <h3>Bank-Level Encryption</h3>
      <p>We use 256-bit encryption to protect all data transfers between your browser and our servers. This is the same level of encryption used by major financial institutions worldwide.</p>
      <h3>Credential Protection</h3>
      <p>We never store your login credentials. When you connect your accounts, your credentials are securely passed to your financial institution through encrypted channels.</p>
      <h3>Compliance and Certification</h3>
      <p>Our platform is SOC 2 Type II certified, which means we've been independently audited and verified to meet rigorous security standards. We undergo regular security audits to ensure we maintain the highest standards of data protection.</p>
      <h3>Data Access Controls</h3>
      <p>We implement strict access controls and monitoring to ensure that only authorized personnel can access system components containing customer information, and all access is logged and monitored.</p>
    `,
    category: "Security",
    tags: ["security", "encryption", "data protection"]
  },
  {
    id: "custom-reports",
    title: "How do I create custom reports?",
    shortDescription: "Step-by-step guide to creating customized financial reports.",
    content: `
      <h2>Creating Custom Reports</h2>
      <p>Custom reports can be created from the Reporting section by following these steps:</p>
      <ol>
        <li>Navigate to the Reporting section in your dashboard</li>
        <li>Click on "New Report" button in the top right corner</li>
        <li>Select the type of report you want to create</li>
        <li>Choose the data points you want to include in your report</li>
        <li>Configure visualization options (charts, tables, etc.)</li>
        <li>Set filters to focus on specific data if needed</li>
        <li>Name your report and save it</li>
      </ol>
      <h3>Scheduling Automated Reports</h3>
      <p>You can also schedule automated report delivery:</p>
      <ol>
        <li>Open a saved report or create a new one</li>
        <li>Click on "Schedule" in the report actions menu</li>
        <li>Set your preferred frequency (daily, weekly, monthly, etc.)</li>
        <li>Add recipients who should receive the report</li>
        <li>Choose the delivery format (PDF, Excel, etc.)</li>
        <li>Save your schedule settings</li>
      </ol>
    `,
    category: "Platform Features",
    tags: ["reporting", "analytics", "data"]
  },
  {
    id: "team-access",
    title: "Can I invite team members to access the platform?",
    shortDescription: "Learn how to add team members and manage user permissions.",
    content: `
      <h2>Managing Team Access</h2>
      <p>Yes, you can invite team members through the User Management section. Here's how:</p>
      <ol>
        <li>Go to Settings > User Management</li>
        <li>Click on "Invite User" button</li>
        <li>Enter the email address of the person you want to invite</li>
        <li>Select the appropriate role for this user</li>
        <li>Set permissions to control access to sensitive information</li>
        <li>Click "Send Invitation"</li>
      </ol>
      <p>The invited user will receive an email invitation with instructions to set up their account.</p>
      <h3>User Roles and Permissions</h3>
      <p>We offer several predefined roles:</p>
      <ul>
        <li><strong>Administrator:</strong> Full access to all functions including user management</li>
        <li><strong>Manager:</strong> Access to most functions but cannot manage users or billing</li>
        <li><strong>Analyst:</strong> Can view and create reports but has limited editing capabilities</li>
        <li><strong>Viewer:</strong> Read-only access to specified sections</li>
      </ul>
      <p>You can also create custom roles with specific permissions tailored to your organization's needs.</p>
    `,
    category: "Account & Billing",
    tags: ["team", "users", "permissions", "access"]
  },
  {
    id: "portfolio-management",
    title: "How do I track my investment portfolio?",
    shortDescription: "Guide to monitoring and managing your investment portfolio.",
    content: `
      <h2>Portfolio Tracking and Management</h2>
      <p>Our platform offers comprehensive portfolio tracking capabilities:</p>
      <h3>Setting Up Your Portfolio</h3>
      <ol>
        <li>Connect your investment accounts or manually add positions</li>
        <li>Go to the Portfolio Management section</li>
        <li>Configure your preferred view (list, allocation chart, performance)</li>
        <li>Set benchmarks for performance comparison</li>
      </ol>
      <h3>Key Portfolio Features</h3>
      <ul>
        <li><strong>Real-time Updates:</strong> See current values and daily changes</li>
        <li><strong>Asset Allocation:</strong> Visualize your portfolio diversification</li>
        <li><strong>Performance Tracking:</strong> Monitor returns across different time periods</li>
        <li><strong>Risk Analytics:</strong> Understand your portfolio's risk profile</li>
        <li><strong>Scenario Testing:</strong> See how market events might affect your holdings</li>
      </ul>
    `,
    category: "Platform Features",
    tags: ["investments", "portfolio", "tracking"]
  },
  {
    id: "subscription-management",
    title: "How do I change my subscription plan?",
    shortDescription: "Instructions for upgrading, downgrading, or canceling your subscription.",
    content: `
      <h2>Managing Your Subscription</h2>
      <p>You can easily change your subscription plan by following these steps:</p>
      <h3>Upgrading or Downgrading</h3>
      <ol>
        <li>Go to Settings > Billing & Subscription</li>
        <li>Click "Change Plan" button</li>
        <li>Review available plans and select your preferred option</li>
        <li>Confirm your selection</li>
      </ol>
      <p>When upgrading, you'll be charged the prorated difference for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle.</p>
      <h3>Canceling Your Subscription</h3>
      <ol>
        <li>Go to Settings > Billing & Subscription</li>
        <li>Click "Cancel Subscription" at the bottom of the page</li>
        <li>Complete the short cancellation survey</li>
        <li>Confirm cancellation</li>
      </ol>
      <p>You'll continue to have access to your current plan until the end of your billing period.</p>
    `,
    category: "Account & Billing",
    tags: ["billing", "subscription", "payment"]
  }
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articleFeedback, setArticleFeedback] = useState<Record<string, boolean | null>>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Filter articles based on search query
  const filteredArticles = searchQuery 
    ? helpArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    : helpArticles;
  
  // Group articles by category
  const articlesByCategory = filteredArticles.reduce<Record<string, Article[]>>((acc, article) => {
    if (!acc[article.category]) {
      acc[article.category] = [];
    }
    acc[article.category].push(article);
    return acc;
  }, {});
  
  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Show article content
  const viewArticle = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo(0, 0);
  };
  
  // Go back to article listing
  const goBack = () => {
    setSelectedArticle(null);
  };

  // Handle article feedback
  const handleArticleFeedback = (articleId: string, isHelpful: boolean) => {
    setArticleFeedback(prev => ({
      ...prev,
      [articleId]: isHelpful
    }));

    toast({
      title: isHelpful ? "Thank you for your feedback!" : "We'll try to improve this article",
      description: isHelpful 
        ? "We're glad this article was helpful." 
        : "Thank you for letting us know. We'll work on making this article more helpful.",
      duration: 3000
    });
  };

  // Handle chat support function
  const startChat = () => {
    toast({
      title: "Chat initiated",
      description: "A support agent will be with you shortly.",
      duration: 3000
    });
    // In a real app, this would open a chat window or redirect to a chat interface
  };

  // Handle support ticket submission
  const submitTicket = () => {
    navigate("/contact");
  };

  // Handle downloading a guide
  const downloadGuide = () => {
    toast({
      title: "Download started",
      description: "Your guide is being downloaded.",
      duration: 3000
    });
    // In a real app, this would trigger a file download
    // For demo purposes, let's simulate a download with a timeout
    setTimeout(() => {
      // This creates a text file for demo purposes
      const element = document.createElement("a");
      const file = new Blob(["This is a sample user guide from WealthHorizon."], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = "WealthHorizon-UserGuide.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 500);
  };
  
  return (
    <PageTemplate
      title="Help Center"
      description="Find answers to common questions and get support using WealthHorizon."
      icon={HelpCircle}
    >
      <div className="space-y-12">
        {!selectedArticle ? (
          <>
            <section className="relative">
              <div className="bg-indigo-50 rounded-xl p-8">
                <div className="max-w-xl">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">How can we help you today?</h2>
                  <p className="text-gray-600 mb-6">
                    Search our knowledge base for quick answers or browse through our help articles.
                  </p>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      placeholder="Search for help articles..." 
                      className="pl-10" 
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
              </div>
            </section>
            
            {searchQuery ? (
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Search Results</h2>
                {filteredArticles.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredArticles.map(article => (
                      <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => viewArticle(article)}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{article.title}</CardTitle>
                          <CardDescription>{article.shortDescription}</CardDescription>
                        </CardHeader>
                        <CardFooter className="pt-2 text-sm text-gray-500">
                          Category: {article.category} • {article.tags.join(', ')}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-lg text-gray-700 mb-2">No results found</p>
                    <p className="text-gray-500">Try adjusting your search or browse our categories below</p>
                  </div>
                )}
              </section>
            ) : (
              <>
                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Popular Topics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                          <FileText size={20} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Getting Started</h3>
                      </div>
                      <ul className="space-y-3 mb-4">
                        {articlesByCategory["Getting Started"]?.slice(0, 3).map(article => (
                          <li key={article.id} className="flex items-start">
                            <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                            <button 
                              className="text-gray-600 text-left hover:text-indigo-600 transition-colors"
                              onClick={() => viewArticle(article)}
                            >
                              {article.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => setSearchQuery("Getting Started")}
                      >
                        View All Articles
                      </Button>
                    </div>
                    
                    <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                          <BookOpen size={20} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Platform Features</h3>
                      </div>
                      <ul className="space-y-3 mb-4">
                        {articlesByCategory["Platform Features"]?.slice(0, 3).map(article => (
                          <li key={article.id} className="flex items-start">
                            <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                            <button 
                              className="text-gray-600 text-left hover:text-indigo-600 transition-colors"
                              onClick={() => viewArticle(article)}
                            >
                              {article.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => setSearchQuery("Platform Features")}
                      >
                        View All Articles
                      </Button>
                    </div>
                    
                    <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                          <MessageCircle size={20} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Account & Billing</h3>
                      </div>
                      <ul className="space-y-3 mb-4">
                        {articlesByCategory["Account & Billing"]?.slice(0, 3).map(article => (
                          <li key={article.id} className="flex items-start">
                            <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                            <button 
                              className="text-gray-600 text-left hover:text-indigo-600 transition-colors"
                              onClick={() => viewArticle(article)}
                            >
                              {article.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => setSearchQuery("Account & Billing")}
                      >
                        View All Articles
                      </Button>
                    </div>
                  </div>
                </section>
                
                <Separator />
                
                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {helpArticles.slice(0, 4).map(article => (
                      <div 
                        key={article.id} 
                        className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => viewArticle(article)}
                      >
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">{article.title}</h3>
                        <p className="text-gray-600">{article.shortDescription}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
            
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-indigo-600 rounded-xl p-8 text-white">
                <div className="flex items-center mb-4">
                  <MessageCircle size={24} className="mr-3" />
                  <h2 className="text-xl font-semibold text-white">Chat with Support</h2>
                </div>
                <p className="mb-6">
                  Get immediate assistance from our team of wealth management and technical experts through our chat support.
                </p>
                <Button 
                  className="bg-white text-indigo-600 hover:bg-gray-100"
                  onClick={startChat}
                >
                  Start a Chat
                </Button>
              </div>
              
              <div className="bg-indigo-600 rounded-xl p-8 text-white">
                <div className="flex items-center mb-4">
                  <FileText size={24} className="mr-3" />
                  <h2 className="text-xl font-semibold text-white">Contact Support</h2>
                </div>
                <p className="mb-6">
                  Need additional help? Submit a support ticket and our team will get back to you as soon as possible.
                </p>
                <Button 
                  className="bg-white text-indigo-600 hover:bg-gray-100"
                  onClick={submitTicket}
                >
                  Submit a Ticket
                </Button>
              </div>
            </section>
            
            <section className="bg-gray-50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4 px-5" 
                  onClick={() => navigate("/api-docs")}
                >
                  <div className="flex items-center cursor-pointer">
                    <BookOpen size={20} className="mr-3 text-indigo-600" />
                    <span>API Documentation</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4 px-5" 
                  onClick={downloadGuide}
                >
                  <div className="flex items-center cursor-pointer">
                    <Download size={20} className="mr-3 text-indigo-600" />
                    <span>User Guides</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4 px-5" 
                  onClick={() => window.open("https://www.youtube.com/channel/example", "_blank")}
                >
                  <div className="flex items-center cursor-pointer">
                    <ExternalLink size={20} className="mr-3 text-indigo-600" />
                    <span>Video Tutorials</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4 px-5" 
                  onClick={() => navigate("/community")}
                >
                  <div className="flex items-center cursor-pointer">
                    <MessageCircle size={20} className="mr-3 text-indigo-600" />
                    <span>Community Forum</span>
                  </div>
                </Button>
              </div>
            </section>
          </>
        ) : (
          <section>
            <Button variant="outline" className="mb-6" onClick={goBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Help Center
            </Button>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{selectedArticle.title}</CardTitle>
                <CardDescription>
                  <span className="mr-3">Category: {selectedArticle.category}</span>
                  <span>Tags: {selectedArticle.tags.join(", ")}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="prose max-w-none" 
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                />
              </CardContent>
              <CardFooter className="flex justify-between flex-wrap">
                <div className="text-sm text-gray-500">
                  Was this article helpful?
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`ml-2 ${articleFeedback[selectedArticle.id] === true ? 'bg-green-50 border-green-200' : ''}`} 
                    onClick={() => handleArticleFeedback(selectedArticle.id, true)}
                    disabled={articleFeedback[selectedArticle.id] !== undefined}
                  >
                    Yes
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`ml-2 ${articleFeedback[selectedArticle.id] === false ? 'bg-red-50 border-red-200' : ''}`} 
                    onClick={() => handleArticleFeedback(selectedArticle.id, false)}
                    disabled={articleFeedback[selectedArticle.id] !== undefined}
                  >
                    No
                  </Button>
                </div>
                <Button variant="outline" onClick={goBack}>
                  Back to Help Center
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {helpArticles
                  .filter(article => 
                    article.id !== selectedArticle.id && 
                    (article.category === selectedArticle.category || 
                    article.tags.some(tag => selectedArticle.tags.includes(tag)))
                  )
                  .slice(0, 2)
                  .map(article => (
                    <Card 
                      key={article.id} 
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => viewArticle(article)}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{article.title}</CardTitle>
                        <CardDescription>{article.shortDescription}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </PageTemplate>
  );
};

export default HelpCenter;
