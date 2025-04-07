
import React from "react";
import { render, screen } from "@testing-library/react";
import MinifiedAssistant from "../MinifiedAssistant";
import { MessageType } from "../types";

describe("MinifiedAssistant Component", () => {
  const mockSetInput = jest.fn();
  const mockHandleSubmit = jest.fn();
  
  const mockMessages: MessageType[] = [
    {
      id: "rec-1",
      type: "recommendation",
      text: "Your Tesla position has increased by 15% in the last week. Consider taking some profits.",
      timestamp: new Date(),
      category: "opportunity",
      actionable: true,
    },
    {
      id: "rec-2",
      type: "recommendation",
      text: "Market volatility is increasing. Your portfolio has higher than usual exposure to technology stocks.",
      timestamp: new Date(),
      category: "risk",
      actionable: true,
    },
    {
      id: "rec-3",
      type: "recommendation",
      text: "You have $1.5M in uninvested cash. Consider allocating to fixed income to improve yield.",
      timestamp: new Date(),
      category: "cash",
      actionable: true,
    },
  ];
  
  test("renders default recommendation message when no messages provided", () => {
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
  
  test("renders most recent actionable recommendation when messages provided", () => {
    render(
      <MinifiedAssistant 
        input="Test input" 
        setInput={mockSetInput} 
        handleSubmit={mockHandleSubmit}
        messages={mockMessages}
      />
    );
    
    // It should display the cash recommendation since it's the last one in the array
    expect(screen.getByText("Cash Management")).toBeInTheDocument();
    expect(screen.getByText("You have $1.5M in uninvested cash. Consider allocating to fixed income to improve yield.")).toBeInTheDocument();
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

  test("renders risk alert with appropriate icon", () => {
    const riskMessages: MessageType[] = [
      {
        id: "risk-1",
        type: "recommendation",
        text: "Market volatility is increasing. Consider reducing risk exposure.",
        timestamp: new Date(),
        category: "risk",
        actionable: true,
      }
    ];

    render(
      <MinifiedAssistant 
        input="Test input" 
        setInput={mockSetInput} 
        handleSubmit={mockHandleSubmit}
        messages={riskMessages}
      />
    );
    
    expect(screen.getByText("Risk Alert")).toBeInTheDocument();
  });

  test("renders cash management with appropriate icon", () => {
    const cashMessages: MessageType[] = [
      {
        id: "cash-1",
        type: "recommendation",
        text: "You have excess cash. Consider investment opportunities.",
        timestamp: new Date(),
        category: "cash",
        actionable: true,
      }
    ];

    render(
      <MinifiedAssistant 
        input="Test input" 
        setInput={mockSetInput} 
        handleSubmit={mockHandleSubmit}
        messages={cashMessages}
      />
    );
    
    expect(screen.getByText("Cash Management")).toBeInTheDocument();
  });
});
