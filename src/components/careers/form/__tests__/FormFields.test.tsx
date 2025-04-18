
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormField } from "../FormFields";

describe("FormField Component", () => {
  const defaultProps = {
    id: "test-field",
    label: "Test Field",
    value: "",
    onChange: jest.fn(),
  };
  
  test("renders with label and input", () => {
    render(<FormField {...defaultProps} />);
    
    expect(screen.getByLabelText(/Test Field/)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  
  test("renders required indicator when required is true", () => {
    render(<FormField {...defaultProps} required={true} />);
    
    const label = screen.getByText("Test Field");
    expect(label.nextSibling).toHaveTextContent("*");
  });
  
  test("does not render required indicator when required is false", () => {
    render(<FormField {...defaultProps} required={false} />);
    
    const labelElement = screen.getByText("Test Field");
    const parentElement = labelElement.parentElement;
    expect(parentElement?.textContent).not.toContain("*");
  });
  
  test("displays error message when error is provided", () => {
    const errorMessage = "This field is required";
    render(<FormField {...defaultProps} error={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
  
  test("calls onChange handler when input value changes", () => {
    render(<FormField {...defaultProps} />);
    
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test value" } });
    
    expect(defaultProps.onChange).toHaveBeenCalled();
  });
  
  test("sets aria-invalid when error is provided", () => {
    render(<FormField {...defaultProps} error="Error message" />);
    
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
  
  test("sets aria-describedby only when error exists", () => {
    render(<FormField {...defaultProps} error="Error message" />);
    
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-describedby", "test-field-error");
  });
  
  test("does not set aria-describedby when no error exists", () => {
    render(<FormField {...defaultProps} />);
    
    const input = screen.getByRole("textbox");
    expect(input).not.toHaveAttribute("aria-describedby");
  });
  
  test("applies correct disabled state", () => {
    render(<FormField {...defaultProps} disabled={true} />);
    
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });
});
