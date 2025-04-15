
import React from 'react';
import { z } from 'zod';
import { ValidatedForm } from '@/components/ui/validated-form';
import { ValidatedField } from '@/components/ui/validated-field';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { withErrorHandling } from '@/hooks/useErrorBoundary';

// Define the form schema using Zod
const userFormSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  age: z.coerce.number().int().positive().min(18, "Must be at least 18 years old"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  bio: z.string().max(200, "Bio cannot exceed 200 characters").optional(),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms" })
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

// Type inference from the schema
type UserFormData = z.infer<typeof userFormSchema>;

const ValidationDemo: React.FC = () => {
  const defaultValues: UserFormData = {
    fullName: '',
    email: '',
    age: 18,
    password: '',
    confirmPassword: '',
    bio: '',
    acceptTerms: false  // This is fine, it's a default value that will be validated
  };

  const handleSubmit = async (data: UserFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form submitted:', data);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Form Validation Demo</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>User Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <ValidatedForm
            schema={userFormSchema}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            submitLabel="Register"
            successMessage="Registration successful!"
            errorMessage="Registration failed. Please try again."
          >
            {({ values, handleChange, handleBlur, getFieldError, hasFieldError }) => (
              <>
                <ValidatedField
                  name="fullName"
                  label="Full Name"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getFieldError('fullName')}
                  required
                />
                
                <ValidatedField
                  name="email"
                  label="Email Address"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getFieldError('email')}
                  required
                />
                
                <ValidatedField
                  name="age"
                  label="Age"
                  type="number"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getFieldError('age')}
                  required
                  min={1}
                />
                
                <ValidatedField
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getFieldError('password')}
                  required
                />
                
                <ValidatedField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getFieldError('confirmPassword')}
                  required
                />
                
                <ValidatedField
                  name="bio"
                  label="Bio"
                  type="textarea"
                  value={values.bio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getFieldError('bio')}
                  placeholder="Tell us about yourself"
                />
                
                <ValidatedField
                  name="acceptTerms"
                  type="checkbox"
                  checkboxLabel="I accept the terms and conditions"
                  value={values.acceptTerms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={getFieldError('acceptTerms')}
                />
              </>
            )}
          </ValidatedForm>
        </CardContent>
      </Card>
    </div>
  );
};

// Fixed: Use the withErrorHandling HOC correctly with appropriate options
export default withErrorHandling(ValidationDemo, {
  fallbackMessage: 'Could not load the validation demo'
});
