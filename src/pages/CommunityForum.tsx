import React, { useState } from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { MessageCircle, Search, ChevronRight, MessageSquare, Users, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ForumTopic {
  id: number;
  title: string;
  description: string;
  tags: string[];
  replies: number;
  views: number;
  likes: number;
  author: string;
  lastActive: string;
  category: string;
}

const CommunityForum = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const forumTopics: ForumTopic[] = [
    {
      id: 1,
      title: "Best practices for estate planning strategies",
      description: "Looking for advice on how to structure estate planning for high net worth individuals.",
      tags: ["Estate Planning", "Tax Optimization"],
      replies: 24,
      views: 1205,
      likes: 37,
      author: "MichaelF",
      lastActive: "2 hours ago",
      category: "Wealth Management"
    },
    {
      id: 2,
      title: "Market volatility strategies for 2025",
      description: "Discussing hedging techniques in the current volatile market environment.",
      tags: ["Market Analysis", "Risk Management"],
      replies: 18,
      views: 876,
      likes: 29,
      author: "SophiaW",
      lastActive: "6 hours ago",
      category: "Investing"
    },
    {
      id: 3,
      title: "Portfolio rebalancing frequency during high inflation",
      description: "How often should I rebalance my portfolio given the current inflation rates?",
      tags: ["Portfolio Management", "Inflation"],
      replies: 31,
      views: 1432,
      likes: 42,
      author: "RobertK",
      lastActive: "1 day ago",
      category: "Portfolio Management"
    },
    {
      id: 4,
      title: "ESG integration strategies for family offices",
      description: "Looking for approaches to incorporate ESG factors into family office investments.",
      tags: ["ESG", "Family Office"],
      replies: 16,
      views: 738,
      likes: 24,
      author: "EmilyR",
      lastActive: "2 days ago",
      category: "ESG"
    },
    {
      id: 5,
      title: "Tech integration with wealth management processes",
      description: "What tech solutions are people using to streamline wealth management?",
      tags: ["Technology", "Automation"],
      replies: 27,
      views: 1156,
      likes: 33,
      author: "DavidM",
      lastActive: "3 days ago",
      category: "Technology"
    },
  ];
  
  const filteredTopics = searchQuery 
    ? forumTopics.filter(topic => 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        topic.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : forumTopics;

  return (
    <PageTemplate
      title="Community Forum"
      description="Join discussions with other wealth management professionals and enthusiasts."
      icon={MessageCircle}
    >
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search forums..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            Create New Topic
          </Button>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Topics</TabsTrigger>
            <TabsTrigger value="investing">Investing</TabsTrigger>
            <TabsTrigger value="wealth">Wealth Management</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio Management</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {filteredTopics.length > 0 ? (
              filteredTopics.map(topic => (
                <Card key={topic.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className="mb-2">{topic.category}</Badge>
                        <CardTitle className="text-lg flex items-center">
                          {topic.title}
                        </CardTitle>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <CardDescription className="mt-1">{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-2">
                    <div className="flex flex-wrap gap-2">
                      {topic.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="bg-gray-50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="text-sm text-gray-500 pt-0 flex justify-between">
                    <div>
                      Posted by {topic.author} • {topic.lastActive}
                    </div>
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" /> {topic.replies}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" /> {topic.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" /> {topic.likes}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-lg text-gray-700 mb-2">No topics found</p>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="investing" className="space-y-4">
            {filteredTopics.filter(topic => topic.category === "Investing").length > 0 ? (
              filteredTopics.filter(topic => topic.category === "Investing").map(topic => (
                <Card key={topic.id} className="hover:shadow-md transition-shadow">
                  {/* Similar card structure as above */}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className="mb-2">{topic.category}</Badge>
                        <CardTitle className="text-lg flex items-center">
                          {topic.title}
                        </CardTitle>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <CardDescription className="mt-1">{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-2">
                    <div className="flex flex-wrap gap-2">
                      {topic.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="bg-gray-50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="text-sm text-gray-500 pt-0 flex justify-between">
                    <div>
                      Posted by {topic.author} • {topic.lastActive}
                    </div>
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" /> {topic.replies}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" /> {topic.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" /> {topic.likes}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-lg text-gray-700 mb-2">No investing topics found</p>
                <p className="text-gray-500">Be the first to create a topic in this category</p>
              </div>
            )}
          </TabsContent>
          
          {/* Other tab contents would follow the same pattern */}
          <TabsContent value="wealth" className="space-y-4">
            {filteredTopics.filter(topic => topic.category === "Wealth Management").map(topic => (
              <Card key={topic.id} className="hover:shadow-md transition-shadow">
                {/* Card content similar to above */}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="mb-2">{topic.category}</Badge>
                      <CardTitle className="text-lg flex items-center">
                        {topic.title}
                      </CardTitle>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <CardDescription className="mt-1">{topic.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 pb-2">
                  <div className="flex flex-wrap gap-2">
                    {topic.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="bg-gray-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-gray-500 pt-0 flex justify-between">
                  <div>
                    Posted by {topic.author} • {topic.lastActive}
                  </div>
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" /> {topic.replies}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" /> {topic.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" /> {topic.likes}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
        </Tabs>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Active Communities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Wealth Management Professionals",
                members: 12465,
                topics: 3782,
                description: "A community for wealth management professionals to share insights and best practices."
              },
              {
                name: "Investment Strategies",
                members: 9874,
                topics: 2651,
                description: "Discuss and share investment strategies for various market conditions."
              },
              {
                name: "Financial Planning",
                members: 7532,
                topics: 1935,
                description: "Connect with financial planners and advisors to discuss wealth planning strategies."
              }
            ].map((community, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{community.name}</CardTitle>
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <CardDescription>{community.description}</CardDescription>
                </CardHeader>
                <CardFooter className="border-t pt-4 text-sm">
                  <div className="flex justify-between w-full">
                    <span>{community.members.toLocaleString()} members</span>
                    <span>{community.topics.toLocaleString()} topics</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        <Separator />
        
        <section className="text-center py-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Ready to Join the Discussion?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Create an account to start contributing to the community, ask questions, and share your expertise.
          </p>
          <div className="flex justify-center gap-4">
            <Button>
              Sign Up
            </Button>
            <Button variant="outline">
              Learn More
            </Button>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default CommunityForum;
