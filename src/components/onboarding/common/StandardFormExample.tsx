
import React from 'react';
import { useStandardForm } from '@/hooks/useStandardForm';
import { StandardForm } from '@/components/ui/standard-form';
import FormField from '@/components/ui/form-field';
import { validateRequired, validateEmail, validatePhone } from '@/utils/formValidation';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const StandardFormExample: React.FC = () => {
  // Define validation rules
  const validationRules = {
    name: (value: string) => validateRequired(value, 'Name'),
    email: validateEmail,
    phone: validatePhone,
    message: (value: string) => validateRequired(value, 'Message')
  };
  
  // Use our standardized form hook
  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = useStandardForm<ContactFormData>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    },
    validationRules,
    onSubmit: async (data) => {
      // In a real app, submit to an API
      console.log('Submitting form data:', data);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    successMessage: 'Your message has been sent successfully!',
    resetAfterSubmit: true
  });
  
  return (
    <StandardForm
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      formTitle="Contact Us"
      formDescription="Fill out the form below to get in touch with our team."
    >
      <FormField
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
        required
      />
      
      <FormField
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        required
      />
      
      <FormField
        name="phone"
        label="Phone"
        value={formData.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.phone}
      />
      
      <FormField
        name="message"
        label="Message"
        type="textarea"
        value={formData.message}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.message}
        required
      />
    </StandardForm>
  );
};

export default StandardFormExample;
