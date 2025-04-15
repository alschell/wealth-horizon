
import React from 'react';
import { render, screen } from '@testing-library/react';
import FormFields from '../FormFields';
import { vi } from 'vitest';

describe('FormFields', () => {
  it('renders a label', () => {
    const onChange = vi.fn();
    
    render(
      <FormFields
        id="testId"
        name="testName"
        label="Test Label"
        value="Test Value"
        onChange={onChange}
      />
    );
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });
  
  it('marks required fields', () => {
    const onChange = vi.fn();
    
    render(
      <FormFields
        required={true}
        id="testId"
        name="testName"
        label="Test Label"
        value="Test Value"
        onChange={onChange}
      />
    );
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });
  
  it('does not show asterisk for non-required fields', () => {
    const onChange = vi.fn();
    
    render(
      <FormFields
        required={false}
        id="testId"
        name="testName"
        label="Test Label"
        value="Test Value"
        onChange={onChange}
      />
    );
    
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });
  
  it('displays an error message when provided', () => {
    const onChange = vi.fn();
    
    render(
      <FormFields
        error="This is an error"
        id="testId"
        name="testName"
        label="Test Label"
        value="Test Value"
        onChange={onChange}
      />
    );
    
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });
  
  it('renders an input field with the correct value', () => {
    const onChange = vi.fn();
    
    render(
      <FormFields
        id="testId"
        name="testName"
        label="Test Label"
        value="Test Value"
        onChange={onChange}
      />
    );
    
    expect(screen.getByDisplayValue('Test Value')).toBeInTheDocument();
  });
  
  it('applies error styles when error is provided', () => {
    const onChange = vi.fn();
    
    render(
      <FormFields
        error="This is an error"
        id="testId"
        name="testName"
        label="Test Label"
        value="Test Value"
        onChange={onChange}
      />
    );
    
    const input = screen.getByDisplayValue('Test Value');
    expect(input).toHaveClass('border-red-500');
  });
});
