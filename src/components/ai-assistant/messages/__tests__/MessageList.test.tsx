
import React from "react";
import { render, screen } from "@testing-library/react";
import MessageList from "../MessageList";
import { MessageType } from "../../types";

// Mock the scrollIntoView method
Element.prototype.scrollIntoView = jest.fn();

describe("MessageList Component", () => {
  const mockHandleAction = jest.fn();
  
  const mockMessages: MessageType[] = [
    {
      id: "msg-1",
      type: "system",
      text: "Welcome message",
      timestamp: new Date(),
    },
    {
      id: "msg-2",
      type: "user",
      text: "User question",
      timestamp: new Date(),
    },
    {
      id: "msg-3",
      type: "recommendation",
      text: "Recommendation message",
      timestamp: new Date(),
      category: "risk",
      actionable: true,
    },
  ];
  
  test("renders all messages in the list", () => {
    render(<MessageList messages={mockMessages} handleActionClick={mockHandleAction} />);
    
    expect(screen.getByText("Welcome message")).toBeInTheDocument();
    expect(screen.getByText("User question")).toBeInTheDocument();
    expect(screen.getByText("Recommendation message")).toBeInTheDocument();
  });
  
  test("scrolls to the bottom when messages change", () => {
    render(<MessageList messages={mockMessages} handleActionClick={mockHandleAction} />);
    
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });
  
  test("renders empty list when no messages are provided", () => {
    render(<MessageList messages={[]} handleActionClick={mockHandleAction} />);
    
    // Only the messageEndRef div should be present
    const scrollArea = screen.getByRole("region");
    expect(scrollArea).toBeInTheDocument();
    
    // No message content should be present
    expect(screen.queryByText("Welcome message")).not.toBeInTheDocument();
    expect(screen.queryByText("User question")).not.toBeInTheDocument();
    expect(screen.queryByText("Recommendation message")).not.toBeInTheDocument();
  });
});
