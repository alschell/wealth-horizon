
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MessageItem from "../MessageItem";
import { MessageType } from "../../types";

describe("MessageItem Component", () => {
  const mockHandleAction = jest.fn();
  
  const userMessage: MessageType = {
    id: "test-1",
    type: "user",
    text: "Test user message",
    timestamp: new Date(),
  };
  
  const systemMessage: MessageType = {
    id: "test-2",
    type: "system",
    text: "Test system message",
    timestamp: new Date(),
  };
  
  const recommendationMessage: MessageType = {
    id: "test-3",
    type: "recommendation",
    text: "Test recommendation message",
    timestamp: new Date(),
    category: "opportunity",
    actionable: true,
  };
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  test("renders user message correctly", () => {
    render(<MessageItem message={userMessage} handleActionClick={mockHandleAction} />);
    
    expect(screen.getByText("Test user message")).toBeInTheDocument();
    expect(screen.getByText(userMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))).toBeInTheDocument();
    
    // User messages should have a specific styling class
    const messageContainer = screen.getByText("Test user message").closest("div");
    expect(messageContainer?.className).toContain("bg-primary");
  });
  
  test("renders system message correctly", () => {
    render(<MessageItem message={systemMessage} handleActionClick={mockHandleAction} />);
    
    expect(screen.getByText("Test system message")).toBeInTheDocument();
    expect(screen.getByText(systemMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))).toBeInTheDocument();
    
    // System messages should have a specific styling class
    const messageContainer = screen.getByText("Test system message").closest("div");
    expect(messageContainer?.className).toContain("bg-gray-100");
  });
  
  test("renders recommendation message correctly with category icon", () => {
    render(<MessageItem message={recommendationMessage} handleActionClick={mockHandleAction} />);
    
    expect(screen.getByText("Test recommendation message")).toBeInTheDocument();
    expect(screen.getByText("Opportunity")).toBeInTheDocument();
    
    // Recommendation messages should have a specific styling class
    const messageContainer = screen.getByText("Test recommendation message").closest("div");
    expect(messageContainer?.className).toContain("bg-gray-50");
  });
  
  test("action button calls handleActionClick when clicked", () => {
    render(<MessageItem message={recommendationMessage} handleActionClick={mockHandleAction} />);
    
    const actionButton = screen.getByText("Take Action");
    fireEvent.click(actionButton);
    
    expect(mockHandleAction).toHaveBeenCalledTimes(1);
    expect(mockHandleAction).toHaveBeenCalledWith(recommendationMessage);
  });
  
  test("action button is not rendered for non-actionable messages", () => {
    const nonActionableMessage: MessageType = {
      ...recommendationMessage,
      actionable: false,
    };
    
    render(<MessageItem message={nonActionableMessage} handleActionClick={mockHandleAction} />);
    
    expect(screen.queryByText("Take Action")).not.toBeInTheDocument();
  });
});
