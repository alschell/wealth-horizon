
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { FileText, FileCheck, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNotifications } from "@/hooks/use-notifications";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  category: z.string(),
  priority: z.string(),
  message: z.string().min(20, "Message must be at least 20 characters"),
  attachments: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SupportTicket = () => {
  const { showSuccess } = useNotifications();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      category: "general",
      priority: "medium",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    showSuccess(
      "Ticket Submitted Successfully",
      "We've received your support ticket and will respond shortly."
    );
    form.reset();
  };

  return (
    <PageTemplate
      title="Support Ticket"
      description="Submit a support ticket and our team will get back to you as soon as possible."
      icon={FileText}
    >
      <div className="space-y-8">
        <Tabs defaultValue="new">
          <TabsList className="mb-8">
            <TabsTrigger value="new">New Ticket</TabsTrigger>
            <TabsTrigger value="existing">Existing Tickets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Brief description of your issue" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">General Inquiry</SelectItem>
                                <SelectItem value="technical">Technical Issue</SelectItem>
                                <SelectItem value="billing">Billing & Subscription</SelectItem>
                                <SelectItem value="account">Account Management</SelectItem>
                                <SelectItem value="feature">Feature Request</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Priority</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please describe your issue in detail..." 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="attachments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Attachments (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              type="file" 
                              multiple 
                              className="cursor-pointer" 
                              onChange={(e) => {
                                field.onChange(e.target.files);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        <Send className="mr-2 h-4 w-4" />
                        Submit Ticket
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="existing" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Tickets</h2>
              <Input placeholder="Search tickets..." className="max-w-sm" />
            </div>
            
            <div className="space-y-4">
              {[
                {
                  id: "TKT-2025-0412",
                  subject: "Account integration with external data source",
                  status: "Open",
                  priority: "Medium",
                  created: "April 11, 2025",
                  lastUpdate: "12 hours ago"
                },
                {
                  id: "TKT-2025-0408",
                  subject: "Trouble generating custom wealth report",
                  status: "In Progress",
                  priority: "High",
                  created: "April 8, 2025",
                  lastUpdate: "2 days ago"
                },
                {
                  id: "TKT-2025-0401",
                  subject: "Feature request: Additional tax optimization tools",
                  status: "Under Review",
                  priority: "Low",
                  created: "April 1, 2025",
                  lastUpdate: "5 days ago"
                },
                {
                  id: "TKT-2025-0315",
                  subject: "API documentation clarification needed",
                  status: "Closed",
                  priority: "Medium",
                  created: "March 15, 2025",
                  lastUpdate: "March 20, 2025"
                }
              ].map((ticket, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-medium text-lg">{ticket.subject}</h3>
                        <p className="text-sm text-gray-500">Ticket ID: {ticket.id}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          ticket.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                          ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          ticket.status === 'Under Review' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {ticket.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          ticket.priority === 'Low' ? 'bg-gray-100 text-gray-800' :
                          ticket.priority === 'Medium' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {ticket.priority}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FileCheck className="h-4 w-4" />
                        <span>Created: {ticket.created}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>Last updated: {ticket.lastUpdate}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {ticket.status !== 'Closed' && (
                        <Button size="sm">
                          Add Response
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
};

export default SupportTicket;
