
import React from "react";
import { render, screen } from "@testing-library/react";
import AIAssistant from "../AIAssistant";
import * as UseAIAssistantHook from "../hooks/useAIAssistant";

// Mock router
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("AIAssistant Component", () => {
  // Mock the hook
  const mockAIAssistant = {
    input: "Test input",
    setInput: jest.fn(),
    messages: [
      {
        id: "welcome",
        type: "system" as const,
        text: "Welcome to your AI Financial Assistant.",
        timestamp: new Date(),
      },
      {
        id: "rec-1",
        type: "recommendation" as const,
        text: "Your Tesla position has increased by 15%.",
        timestamp: new Date(),
        category: "opportunity" as const,
        actionable: true,
      },
    ],
    handleActionClick: jest.fn(),
    handleSubmit: jest.fn(),
  };
  
  beforeEach(() => {
    jest.spyOn(UseAIAssistantHook, "useAIAssistant").mockImplementation(() => mockAIAssistant);
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  test("renders minified assistant when minified is true", () => {
    render(<AIAssistant minified={true} />);
    
    // In minified mode, only the recent recommendation should be visible
    expect(screen.getByText("Tesla position up 15% this week. Consider taking profits.")).toBeInTheDocument();
    
    // Welcome message should not be visible in minified mode
    expect(screen.queryByText("Welcome to your AI Financial Assistant.")).not.toBeInTheDocument();
  });
  
  test("renders full assistant with header when showHeader is true", () => {
    render(<AIAssistant minified={false} showHeader={true} />);
    
    // Header should be visible
    expect(screen.getByText("AI Financial Assistant")).toBeInTheDocument();
    
    // Both messages should be visible
    expect(screen.getByText("Welcome to your AI Financial Assistant.")).toBeInTheDocument();
    expect(screen.getByText("Your Tesla position has increased by 15%.")).toBeInTheDocument();
  });
  
  test("renders full assistant without header by default", () => {
    render(<AIAssistant />);
    
    // Header should not be visible
    expect(screen.queryByText("AI Financial Assistant")).not.toBeInTheDocument();
    
    // Both messages should be visible
    expect(screen.getByText("Welcome to your AI Financial Assistant.")).toBeInTheDocument();
    expect(screen.getByText("Your Tesla position has increased by 15%.")).toBeInTheDocument();
  });
});
