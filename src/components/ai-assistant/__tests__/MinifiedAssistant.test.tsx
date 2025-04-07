
import React from "react";
import { render, screen } from "@testing-library/react";
import MinifiedAssistant from "../MinifiedAssistant";

describe("MinifiedAssistant Component", () => {
  const mockSetInput = jest.fn();
  const mockHandleSubmit = jest.fn();
  
  test("renders recommendation message", () => {
    render(
      <MinifiedAssistant 
        input="Test input" 
        setInput={mockSetInput} 
        handleSubmit={mockHandleSubmit} 
      />
    );
    
    expect(screen.getByText("Opportunity")).toBeInTheDocument();
    expect(screen.getByText("Tesla position up 15% this week. Consider taking profits.")).toBeInTheDocument();
  });
  
  test("renders chat input form", () => {
    render(
      <MinifiedAssistant 
        input="Test input" 
        setInput={mockSetInput} 
        handleSubmit={mockHandleSubmit} 
      />
    );
    
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("Test input");
    
    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeInTheDocument();
  });
});
