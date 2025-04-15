
import React from 'react';
import { z } from 'zod';
import { useForm } from '@/hooks/form/useForm';
import { FormField, StandardForm } from '@/components/form/StandardForm';

// Define form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Infer TypeScript type from schema
type FormValues = z.infer<typeof formSchema>;

export function FormExample() {
  // Initialize form with our unified hook
  const form = useForm<FormValues>({
    schema: formSchema,
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmit: async (data) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
    },
    successMessage: 'Your message has been sent!',
    errorMessage: 'There was an error sending your message',
    resetAfterSubmit: true,
  });
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <StandardForm
        onSubmit={form.handleSubmit}
        isSubmitting={form.isSubmitting}
        formTitle="Contact Us"
        formDescription="Fill out the form below to get in touch with us."
        submitLabel="Send Message"
      >
        <FormField
          name="name"
          label="Your Name"
          required
          error={form.formState.errors.name?.message}
          {...form.register('name')}
        />
        
        <FormField
          name="email"
          label="Email Address"
          type="email"
          required
          error={form.formState.errors.email?.message}
          {...form.register('email')}
        />
        
        <FormField
          name="message"
          label="Message"
          type="textarea"
          required
          error={form.formState.errors.message?.message}
          {...form.register('message')}
        />
      </StandardForm>
      
      {form.isSuccess && (
        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded">
          Your message has been sent successfully!
        </div>
      )}
    </div>
  );
}

export default FormExample;
