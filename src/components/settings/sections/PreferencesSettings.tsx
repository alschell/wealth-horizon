
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Globe, Calendar, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useTranslation, LANGUAGES } from "@/context/TranslationContext";
import { useCurrency } from "@/hooks/use-currency";
import { CURRENCIES } from "@/utils/constants/currencies";

const dateFormats = [
  { id: "MM/DD/YYYY", label: "MM/DD/YYYY (US)" },
  { id: "DD/MM/YYYY", label: "DD/MM/YYYY (EU)" },
  { id: "YYYY-MM-DD", label: "YYYY-MM-DD (ISO)" },
  { id: "YYYY/MM/DD", label: "YYYY/MM/DD (JP)" },
];

// Full list of time zones
const timeZones = [
  { id: "UTC", label: "UTC (Coordinated Universal Time)" },
  
  // North America
  { id: "America/New_York", label: "US Eastern Time (ET)" },
  { id: "America/Chicago", label: "US Central Time (CT)" },
  { id: "America/Denver", label: "US Mountain Time (MT)" },
  { id: "America/Los_Angeles", label: "US Pacific Time (PT)" },
  { id: "America/Anchorage", label: "Alaska Time" },
  { id: "America/Adak", label: "Hawaii-Aleutian Time" },
  { id: "America/Phoenix", label: "Arizona (No DST)" },
  { id: "America/Toronto", label: "Eastern Time - Toronto" },
  { id: "America/Vancouver", label: "Pacific Time - Vancouver" },
  { id: "America/Edmonton", label: "Mountain Time - Edmonton" },
  { id: "America/Winnipeg", label: "Central Time - Winnipeg" },
  { id: "America/Halifax", label: "Atlantic Time - Halifax" },
  { id: "America/St_Johns", label: "Newfoundland Time - St. John's" },
  { id: "America/Mexico_City", label: "Mexico City Time" },
  
  // South America
  { id: "America/Sao_Paulo", label: "São Paulo Time" },
  { id: "America/Buenos_Aires", label: "Argentina Time" },
  { id: "America/Santiago", label: "Chile Time" },
  { id: "America/Bogota", label: "Colombia Time" },
  { id: "America/Lima", label: "Peru Time" },
  
  // Europe
  { id: "Europe/London", label: "UK Time (GMT/BST)" },
  { id: "Europe/Paris", label: "Central European Time (CET)" },
  { id: "Europe/Berlin", label: "Berlin Time" },
  { id: "Europe/Athens", label: "Eastern European Time" },
  { id: "Europe/Moscow", label: "Moscow Time" },
  { id: "Europe/Madrid", label: "Spain Time" },
  { id: "Europe/Rome", label: "Italy Time" },
  { id: "Europe/Amsterdam", label: "Netherlands Time" },
  { id: "Europe/Stockholm", label: "Sweden Time" },
  { id: "Europe/Vienna", label: "Austria Time" },
  { id: "Europe/Warsaw", label: "Poland Time" },
  { id: "Europe/Kiev", label: "Ukraine Time" },
  { id: "Europe/Budapest", label: "Hungary Time" },
  { id: "Europe/Zurich", label: "Switzerland Time" },
  { id: "Europe/Brussels", label: "Belgium Time" },
  { id: "Europe/Lisbon", label: "Portugal Time" },
  { id: "Europe/Helsinki", label: "Finland Time" },
  { id: "Europe/Prague", label: "Czech Republic Time" },
  
  // Asia
  { id: "Asia/Tokyo", label: "Japan Time (JST)" },
  { id: "Asia/Shanghai", label: "China Time (CST)" },
  { id: "Asia/Singapore", label: "Singapore Time (SGT)" },
  { id: "Asia/Seoul", label: "Korea Time (KST)" },
  { id: "Asia/Hong_Kong", label: "Hong Kong Time" },
  { id: "Asia/Taipei", label: "Taiwan Time" },
  { id: "Asia/Bangkok", label: "Thailand Time" },
  { id: "Asia/Jakarta", label: "Indonesia Time (WIB)" },
  { id: "Asia/Kuala_Lumpur", label: "Malaysia Time" },
  { id: "Asia/Manila", label: "Philippines Time" },
  { id: "Asia/Kolkata", label: "India Time (IST)" },
  { id: "Asia/Ho_Chi_Minh", label: "Vietnam Time" },
  { id: "Asia/Karachi", label: "Pakistan Time" },
  { id: "Asia/Dubai", label: "United Arab Emirates Time" },
  { id: "Asia/Tehran", label: "Iran Time" },
  { id: "Asia/Jerusalem", label: "Israel Time" },
  { id: "Asia/Baghdad", label: "Iraq Time" },
  { id: "Asia/Riyadh", label: "Saudi Arabia Time" },
  
  // Oceania
  { id: "Australia/Sydney", label: "Australian Eastern Time (AEST)" },
  { id: "Australia/Melbourne", label: "Melbourne Time" },
  { id: "Australia/Brisbane", label: "Brisbane Time (No DST)" },
  { id: "Australia/Adelaide", label: "Adelaide Time" },
  { id: "Australia/Perth", label: "Perth Time" },
  { id: "Australia/Darwin", label: "Darwin Time" },
  { id: "Pacific/Auckland", label: "New Zealand Time" },
  { id: "Pacific/Fiji", label: "Fiji Time" },
  { id: "Pacific/Guam", label: "Guam Time" },
  { id: "Pacific/Honolulu", label: "Hawaii Time" },
  
  // Africa
  { id: "Africa/Cairo", label: "Egypt Time" },
  { id: "Africa/Johannesburg", label: "South Africa Time" },
  { id: "Africa/Lagos", label: "Nigeria Time" },
  { id: "Africa/Nairobi", label: "East Africa Time" },
  { id: "Africa/Casablanca", label: "Morocco Time" },
  { id: "Africa/Tunis", label: "Tunisia Time" },
];

const preferencesFormSchema = z.object({
  language: z.string(),
  dateFormat: z.string(),
  timeZone: z.string(),
  baseCurrency: z.string(),
  numberFormat: z.enum(["standard", "compact"]),
});

type PreferencesFormValues = z.infer<typeof preferencesFormSchema>;

const PreferencesSettings = () => {
  const { currentLanguage, setLanguage } = useTranslation();
  const { activeCurrency, setActiveCurrency, currencies } = useCurrency();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get saved preferences from localStorage or use defaults
  const getDefaultValues = (): PreferencesFormValues => {
    return {
      language: localStorage.getItem("preferredLanguage") || currentLanguage || "en",
      dateFormat: localStorage.getItem("dateFormat") || "MM/DD/YYYY",
      timeZone: localStorage.getItem("timeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
      baseCurrency: localStorage.getItem("baseCurrency") || activeCurrency.code || "USD",
      numberFormat: (localStorage.getItem("numberFormat") as "standard" | "compact") || "standard",
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
      localStorage.setItem("baseCurrency", data.baseCurrency);
      localStorage.setItem("numberFormat", data.numberFormat);
      
      // Update language in context if changed
      if (data.language !== currentLanguage) {
        await setLanguage(data.language as any);
      }
      
      // Update currency if changed
      if (data.baseCurrency !== activeCurrency.code) {
        const newCurrency = currencies.find(c => c.code === data.baseCurrency) || currencies[0];
        setActiveCurrency(newCurrency);
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
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Preferences</h2>
      <p className="text-gray-500">Customize your language, date format, and time zone settings</p>
      
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
            name="baseCurrency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Base Currency</FormLabel>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select base currency" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px] overflow-y-auto">
                        {CURRENCIES.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name} {currency.symbol && `(${currency.symbol})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
                <FormDescription>
                  Select your preferred currency for displaying asset values
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberFormat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number Format</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select number format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard (1,234,567.89)</SelectItem>
                        <SelectItem value="compact">Compact (1.2M)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
                <FormDescription>
                  Choose how numbers are displayed across the application
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
                      <SelectContent className="max-h-[300px] overflow-y-auto">
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
    </div>
  );
};

export default PreferencesSettings;
