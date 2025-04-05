
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormData } from "../types";
import { getInviteUserDialogStore } from "../hooks/useInviteUserDialog";
import { toast } from "@/hooks/use-toast";
import { Mail, UserPlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "member", "viewer"]),
  dataAccess: z.string().min(1, "Data access is required"),
  permissions: z.object({
    dashboard: z.boolean().default(true),
    wealth: z.boolean().default(false),
    trading: z.boolean().default(false),
    marketData: z.boolean().default(false),
    cashflow: z.boolean().default(false),
    analyzeWealth: z.boolean().default(false),
    integrations: z.boolean().default(false),
    settings: z.boolean().default(false),
  })
});

type FormValues = z.infer<typeof formSchema>;

const InviteUserDialog = () => {
  const { isOpen, closeInviteDialog, handleInviteUser } = getInviteUserDialogStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "member",
      dataAccess: "Full Access",
      permissions: {
        dashboard: true,
        wealth: false,
        trading: false,
        marketData: false,
        cashflow: false,
        analyzeWealth: false,
        integrations: false,
        settings: false,
      }
    }
  });

  const onSubmit = (values: FormValues) => {
    handleInviteUser(values as UserFormData);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeInviteDialog}>
      <DialogContent className="max-w-lg max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Invite New User
          </DialogTitle>
          <DialogDescription>
            Send an invitation to a new user to join your family office platform
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(80vh-200px)] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
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
                        <Input 
                          type="email" 
                          placeholder="john@example.com" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs">
                          Base permissions
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dataAccess"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data Access</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select access" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Full Access">Full Access</SelectItem>
                            <SelectItem value="Limited Access">Limited Access</SelectItem>
                            <SelectItem value="Custom Access">Custom Access</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs">
                          Financial data access
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Module Permissions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="permissions.dashboard"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-0.5 leading-none">
                            <FormLabel className="text-sm">Dashboard</FormLabel>
                            <FormDescription className="text-xs">
                              Main dashboard
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="permissions.wealth"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-0.5 leading-none">
                            <FormLabel className="text-sm">Wealth</FormLabel>
                            <FormDescription className="text-xs">
                              Wealth management
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="permissions.trading"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-0.5 leading-none">
                            <FormLabel className="text-sm">Trading</FormLabel>
                            <FormDescription className="text-xs">
                              Execute trades
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="permissions.marketData"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-0.5 leading-none">
                            <FormLabel className="text-sm">Market Data</FormLabel>
                            <FormDescription className="text-xs">
                              Market information
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="permissions.cashflow"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-0.5 leading-none">
                            <FormLabel className="text-sm">Cashflow</FormLabel>
                            <FormDescription className="text-xs">
                              Cash movements
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="permissions.analyzeWealth"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-0.5 leading-none">
                            <FormLabel className="text-sm">Analysis</FormLabel>
                            <FormDescription className="text-xs">
                              Analytics tools
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="permissions.integrations"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-0.5 leading-none">
                            <FormLabel className="text-sm">Integrations</FormLabel>
                            <FormDescription className="text-xs">
                              External services
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="permissions.settings"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-0.5 leading-none">
                            <FormLabel className="text-sm">Settings</FormLabel>
                            <FormDescription className="text-xs">
                              System config
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </ScrollArea>

        <DialogFooter className="mt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={closeInviteDialog}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="gap-2"
            onClick={form.handleSubmit(onSubmit)}
          >
            <Mail className="h-4 w-4" />
            Send Invitation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUserDialog;
