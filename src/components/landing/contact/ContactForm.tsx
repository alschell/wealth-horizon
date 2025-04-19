import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/animation";
import TranslatedText from "@/components/ui/translated-text";

interface ContactFormInputs {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = data => console.log(data);

  return (
    <form className="space-y-6 text-left">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          <TranslatedText>Your Name</TranslatedText>
        </label>
        <div className="mt-1">
          <Input
            type="text"
            id="name"
            {...register("name", { required: "Your name is required" })}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          <TranslatedText>Your Email</TranslatedText>
        </label>
        <div className="mt-1">
          <Input
            type="email"
            id="email"
            {...register("email", {
              required: "Your email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          <TranslatedText>Your Message</TranslatedText>
        </label>
        <div className="mt-1">
          <Textarea
            id="message"
            rows={4}
            {...register("message", { required: "A message is required" })}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
          {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
        </div>
      </div>

      <div>
        <Button type="submit" className="w-full">
          <TranslatedText>Send Message</TranslatedText>
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
