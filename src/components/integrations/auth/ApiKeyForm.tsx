
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { IntegrationType, ApiKeyFormData } from "../types";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ApiKeyFormProps {
  integration: IntegrationType;
  onSubmit: (data: ApiKeyFormData) => void;
}

const formSchema = z.object({
  apiKey: z.string().min(5, "API key must be at least 5 characters"),
});

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ integration, onSubmit }) => {
  const [showKey, setShowKey] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      apiKey: values.apiKey,
      service: integration.id,
    });
    
    form.reset();
    
    toast({
      title: "API Key Saved",
      description: `Successfully connected to ${integration.name}`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{integration.apiKeyName || "API Key"}</FormLabel>
              <div className="flex">
                <FormControl>
                  <div className="relative flex-1">
                    <Input
                      {...field}
                      placeholder="Enter your API key"
                      type={showKey ? "text" : "password"}
                      className="pr-10"
                    />
                    <div 
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" 
                      onClick={() => setShowKey(!showKey)}
                    >
                      {showKey ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                </FormControl>
              </div>
              <FormDescription>
                Enter your API key from the {integration.name} developer console
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Connect {integration.name}</Button>
      </form>
    </Form>
  );
};

export default ApiKeyForm;
