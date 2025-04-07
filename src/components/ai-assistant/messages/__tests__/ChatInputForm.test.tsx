
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ChatInputForm from "../ChatInputForm";

describe("ChatInputForm Component", () => {
  const mockSetInput = jest.fn();
  const mockHandleSubmit = jest.fn();
  
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });
  
  test("renders input field and submit button", () => {
    render(
      <ChatInputForm 
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
  
  test("calls setInput when input value changes", () => {
    render(
      <ChatInputForm 
        input="" 
        setInput={mockSetInput} 
        handleSubmit={mockHandleSubmit} 
      />
    );
    
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "New message" } });
    
    expect(mockSetInput).toHaveBeenCalledTimes(1);
    expect(mockSetInput).toHaveBeenCalledWith("New message");
  });
  
  test("calls handleSubmit when form is submitted", () => {
    render(
      <ChatInputForm 
        input="Test message" 
        setInput={mockSetInput} 
        handleSubmit={mockHandleSubmit} 
      />
    );
    
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
  
  test("shows full placeholder on larger screens", () => {
    // Mock window.innerWidth for desktop
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));
    
    render(
      <ChatInputForm 
        input="" 
        setInput={mockSetInput} 
        handleSubmit={mockHandleSubmit} 
      />
    );
    
    const inputElement = screen.getByPlaceholderText("Ask anything about your portfolio or the market...");
    expect(inputElement).toBeInTheDocument();
  });
  
  test("shows shortened placeholder on smaller screens", () => {
    // Mock window.innerWidth for mobile
    global.innerWidth = 320;
    global.dispatchEvent(new Event('resize'));
    
    render(
      <ChatInputForm 
        input="" 
        setInput={mockSetInput} 
        handleSubmit={mockHandleSubmit} 
      />
    );
    
    const inputElement = screen.getByPlaceholderText("Ask your AI assistant...");
    expect(inputElement).toBeInTheDocument();
  });
});
