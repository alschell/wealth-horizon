
import { ChangeEvent } from 'react';

/**
 * Types for input elements that can be handled by form event handlers
 */
export type FormInputElement = 
  | HTMLInputElement 
  | HTMLTextAreaElement 
  | HTMLSelectElement;

/**
 * Change event type for form inputs
 */
export type FormInputChangeEvent = ChangeEvent<FormInputElement>;

/**
 * Function to set form values
 */
export type SetFormValues<T> = (values: T) => void;

/**
 * Function to set form errors
 */
export type SetFormErrors = React.Dispatch<React.SetStateAction<Record<string, string>>>;

/**
 * Function to set form touched fields
 */
export type SetFormTouched = (touched: Record<string, boolean>) => void;

/**
 * Function to clear a field error
 */
export type ClearFieldError<T> = (field: keyof T) => void;

/**
 * Form field change handler
 */
export type FieldChangeHandler = (e: FormInputChangeEvent) => void;

/**
 * Form field blur handler
 */
export type FieldBlurHandler<T> = (field: keyof T) => void;

/**
 * Form submission handler
 */
export type FormSubmitHandler<T> = (data: T) => Promise<void> | void;
