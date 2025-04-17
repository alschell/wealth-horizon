
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Globe, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useTranslation, LANGUAGES } from "@/context/TranslationContext";

const dateFormats = [
  { id: "MM/DD/YYYY", label: "MM/DD/YYYY (US)" },
  { id: "DD/MM/YYYY", label: "DD/MM/YYYY (EU)" },
  { id: "YYYY-MM-DD", label: "YYYY-MM-DD (ISO)" },
  { id: "YYYY/MM/DD", label: "YYYY/MM/DD (JP)" },
];

const timeZones = [
  { id: "UTC", label: "UTC" },
  { id: "America/New_York", label: "US Eastern Time (ET)" },
  { id: "America/Chicago", label: "US Central Time (CT)" },
  { id: "America/Denver", label: "US Mountain Time (MT)" },
  { id: "America/Los_Angeles", label: "US Pacific Time (PT)" },
  { id: "Europe/London", label: "UK Time (GMT/BST)" },
  { id: "Europe/Paris", label: "Central European Time (CET)" },
  { id: "Asia/Tokyo", label: "Japan Time (JST)" },
  { id: "Asia/Shanghai", label: "China Time (CST)" },
  { id: "Asia/Singapore", label: "Singapore Time (SGT)" },
  { id: "Australia/Sydney", label: "Australian Eastern Time (AEST)" },
];

const preferencesFormSchema = z.object({
  language: z.string(),
  dateFormat: z.string(),
  timeZone: z.string(),
});

type PreferencesFormValues = z.infer<typeof preferencesFormSchema>;

const PreferencesSettings = () => {
  const { currentLanguage, setLanguage } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get saved preferences from localStorage or use defaults
  const getDefaultValues = (): PreferencesFormValues => {
    return {
      language: localStorage.getItem("preferredLanguage") || currentLanguage || "en",
      dateFormat: localStorage.getItem("dateFormat") || "MM/DD/YYYY",
      timeZone: localStorage.getItem("timeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    };
  };

  const form = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: getDefaultValues(),
  });

  const onSubmit = async (data: PreferencesFormValues) => {
    setIsSubmitting(true);
    try {
      // Save preferences to localStorage
      localStorage.setItem("preferredLanguage", data.language);
      localStorage.setItem("dateFormat", data.dateFormat);
      localStorage.setItem("timeZone", data.timeZone);
      
      // Update language in context if changed
      if (data.language !== currentLanguage) {
        await setLanguage(data.language as any);
      }
      
      toast.success("Preferences saved successfully");
    } catch (error) {
      console.error("Failed to save preferences:", error);
      toast.error("Failed to save preferences");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>
          Customize your language, date format, and time zone settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {LANGUAGES.map((language) => (
                            <SelectItem key={language.code} value={language.code}>
                              {language.name} ({language.nativeName})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormDescription>
                    Choose your preferred language for the interface
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateFormat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Format</FormLabel>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          {dateFormats.map((format) => (
                            <SelectItem key={format.id} value={format.id}>
                              {format.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormDescription>
                    Choose how dates are displayed across the application
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeZone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Zone</FormLabel>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeZones.map((tz) => (
                            <SelectItem key={tz.id} value={tz.id}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormDescription>
                    Choose your preferred time zone for date and time display
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save preferences"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PreferencesSettings;
