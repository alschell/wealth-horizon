
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import { LocalizedText, useLocalizedText } from "@/components/ui/localized-text";
import { useLanguage } from "@/context/LanguageContext";

interface FormValues {
  name: string;
  email: string;
  company: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const { t } = useLocalizedText();
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [, forceUpdate] = useState({});
  
  // Force re-render when language changes
  React.useEffect(() => {
    console.log(`ContactForm detected language change to: ${language}`);
    forceUpdate({});
  }, [language]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      console.log("Form submitted:", data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 h-full shadow-sm border border-gray-200" key={`contact-form-${language}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        <LocalizedText textKey="sendUsMessage" fallback="Send us a message" />
      </h3>
      
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            <LocalizedText textKey="thankYou" fallback="Thank you!" />
          </h4>
          <p className="text-gray-600 text-center max-w-sm">
            <LocalizedText 
              textKey="messageReceived" 
              fallback="Your message has been received. We'll get back to you as soon as possible." 
            />
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              <LocalizedText textKey="fullName" fallback="Full Name" />*
            </label>
            <Input
              id="name"
              {...register("name", { required: t("nameRequired", "Name is required") })}
              placeholder={t("yourName", "Your name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              <LocalizedText textKey="emailAddress" fallback="Email Address" />*
            </label>
            <Input
              id="email"
              type="email"
              {...register("email", { 
                required: t("emailRequired", "Email is required"),
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: t("validEmail", "Please enter a valid email address")
                }
              })}
              placeholder={t("yourEmail", "Your email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              <LocalizedText textKey="company" fallback="Company" />
            </label>
            <Input
              id="company"
              {...register("company")}
              placeholder={t("yourCompany", "Your company")}
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              <LocalizedText textKey="message" fallback="Message" />*
            </label>
            <Textarea
              id="message"
              rows={4}
              {...register("message", { required: t("messageRequired", "Message is required") })}
              placeholder={t("howCanWeHelp", "How can we help you?")}
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <span>
                <LocalizedText textKey="sending" fallback="Sending..." />
              </span>
            ) : (
              <span>
                <LocalizedText textKey="sendMessage" fallback="Send Message" />
              </span>
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
