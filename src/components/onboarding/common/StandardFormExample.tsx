import React from 'react';
import { useStandardForm } from '@/hooks/useStandardForm';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const StandardFormExample = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    validateForm
  } = useStandardForm<ContactFormData>({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.name) errors.name = 'Name is required';
      if (!values.email) errors.email = 'Email is required';
      return errors;
    },
    onSubmit: async (values) => {
      console.log('Form values:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      alert('Form submitted successfully!');
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          className={`border rounded px-3 py-2 w-full ${errors.name && touched.name ? 'border-red-500' : ''}`}
        />
        {errors.name && touched.name && <p className="text-red-500">{errors.name}</p>}

        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          className={`border rounded px-3 py-2 w-full ${errors.email && touched.email ? 'border-red-500' : ''}`}
        />
        {errors.email && touched.email && <p className="text-red-500">{errors.email}</p>}

        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          placeholder="Message"
          className="border rounded px-3 py-2 w-full"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </form>
  );
};
