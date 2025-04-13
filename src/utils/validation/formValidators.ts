
import { z } from 'zod';

// Validation constants
const PASSWORD_MIN_LENGTH = 8;
const NAME_MAX_LENGTH = 100;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_REGEX = /^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const URL_REGEX = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

/**
 * Common validation schemas
 */
export const validators = {
  required: (fieldName: string = 'This field') => 
    z.string().min(1, `${fieldName} is required`),
  
  email: () => 
    z.string().email('Please enter a valid email address'),
  
  password: () => 
    z.string()
      .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  
  name: () => 
    z.string()
      .min(1, 'Name is required')
      .max(NAME_MAX_LENGTH, `Name must be less than ${NAME_MAX_LENGTH} characters`)
      .regex(/^[A-Za-z\s\-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  phone: () => 
    z.string()
      .regex(PHONE_REGEX, 'Please enter a valid phone number'),
  
  url: () => 
    z.string()
      .regex(URL_REGEX, 'Please enter a valid URL'),
  
  number: () => 
    z.string()
      .refine((val) => !isNaN(Number(val)), 'Please enter a valid number'),
  
  integer: () => 
    z.string()
      .refine((val) => !isNaN(Number(val)) && Number.isInteger(Number(val)), 'Please enter a whole number'),
  
  positiveNumber: () => 
    z.string()
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Please enter a positive number'),
  
  date: () => 
    z.string()
      .refine((val) => !isNaN(Date.parse(val)), 'Please enter a valid date'),
  
  futureDate: () => 
    z.string()
      .refine((val) => {
        const date = new Date(val);
        return !isNaN(date.getTime()) && date > new Date();
      }, 'Please enter a future date'),
  
  pastDate: () => 
    z.string()
      .refine((val) => {
        const date = new Date(val);
        return !isNaN(date.getTime()) && date < new Date();
      }, 'Please enter a past date'),
  
  minLength: (min: number) => 
    z.string()
      .min(min, `Must be at least ${min} characters`),
  
  maxLength: (max: number) => 
    z.string()
      .max(max, `Must be at most ${max} characters`),
  
  exactLength: (length: number) => 
    z.string()
      .length(length, `Must be exactly ${length} characters`),
  
  match: (regex: RegExp, message: string) => 
    z.string()
      .regex(regex, message),
  
  enum: <T extends string>(values: readonly [T, ...T[]], message?: string) => 
    z.enum(values, { message }),
  
  minValue: (min: number) => 
    z.number()
      .min(min, `Must be at least ${min}`),
  
  maxValue: (max: number) => 
    z.number()
      .max(max, `Must be at most ${max}`),
  
  valueRange: (min: number, max: number) => 
    z.number()
      .min(min, `Must be at least ${min}`)
      .max(max, `Must be at most ${max}`),
  
  boolean: () => 
    z.boolean(),
  
  array: <T>(schema: z.ZodType<T>) => 
    z.array(schema),
  
  nonEmptyArray: <T>(schema: z.ZodType<T>) => 
    z.array(schema)
      .min(1, 'Must have at least one item'),
  
  maxArray: <T>(schema: z.ZodType<T>, max: number) => 
    z.array(schema)
      .max(max, `Must have at most ${max} items`),
  
  arrayLength: <T>(schema: z.ZodType<T>, length: number) => 
    z.array(schema)
      .length(length, `Must have exactly ${length} items`),
};

/**
 * Create a form schema with common fields
 */
export function createFormSchema<T extends z.ZodRawShape>(extraFields: T) {
  return z.object({
    ...extraFields
  });
}

/**
 * Create a schema for login forms
 */
export function createLoginSchema() {
  return createFormSchema({
    email: validators.email(),
    password: validators.required('Password')
  });
}

/**
 * Create a schema for registration forms
 */
export function createRegistrationSchema() {
  return createFormSchema({
    firstName: validators.name(),
    lastName: validators.name(),
    email: validators.email(),
    password: validators.password(),
    confirmPassword: validators.required('Confirm Password')
  }).refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword']
    }
  );
}

/**
 * Create a schema for common profile forms
 */
export function createProfileSchema() {
  return createFormSchema({
    firstName: validators.name(),
    lastName: validators.name(),
    email: validators.email(),
    phone: validators.phone().optional().or(z.literal('')),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional()
  });
}

/**
 * Create a schema for address forms
 */
export function createAddressSchema() {
  return createFormSchema({
    street: validators.required('Street address'),
    city: validators.required('City'),
    state: validators.required('State'),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
    country: validators.required('Country')
  });
}

// Export type helper for inferring zod schema types
export type InferSchemaType<T extends z.ZodType<any, any, any>> = z.infer<T>;
