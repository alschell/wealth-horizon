
import { renderHook, act } from "@testing-library/react-hooks";
import { useToast } from "@/hooks/use-toast";
import { useAIAssistant } from "../useAIAssistant";

// Mock the toast hook
jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(),
}));

describe("useAIAssistant Hook", () => {
  const mockToast = { toast: jest.fn() };
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue(mockToast);
    
    // Mock setTimeout to execute immediately
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    jest.useRealTimers();
  });
  
  test("initializes with correct default values", () => {
    const { result } = renderHook(() => useAIAssistant());
    
    expect(result.current.input).toBe("");
    expect(result.current.messages.length).toBe(4); // Should have initial messages
    expect(typeof result.current.handleActionClick).toBe("function");
    expect(typeof result.current.handleSubmit).toBe("function");
  });
  
  test("handleActionClick shows toast for opportunity category", () => {
    const { result } = renderHook(() => useAIAssistant());
    
    const opportunityMessage = {
      id: "test-1",
      type: "recommendation" as const,
      text: "Tesla recommendation",
      timestamp: new Date(),
      category: "opportunity" as const,
      actionable: true,
    };
    
    act(() => {
      result.current.handleActionClick(opportunityMessage);
    });
    
    expect(mockToast.toast).toHaveBeenCalledWith({
      title: "Action Initiated",
      description: "Opening trade interface to execute Tesla transaction",
    });
  });
  
  test("handleActionClick shows toast for cash category", () => {
    const { result } = renderHook(() => useAIAssistant());
    
    const cashMessage = {
      id: "test-2",
      type: "recommendation" as const,
      text: "Cash management recommendation",
      timestamp: new Date(),
      category: "cash" as const,
      actionable: true,
    };
    
    act(() => {
      result.current.handleActionClick(cashMessage);
    });
    
    expect(mockToast.toast).toHaveBeenCalledWith({
      title: "Cash Management",
      description: "Opening cash allocation interface",
    });
  });

  test("handleActionClick shows toast for risk category", () => {
    const { result } = renderHook(() => useAIAssistant());
    
    const riskMessage = {
      id: "test-3",
      type: "recommendation" as const,
      text: "Risk management recommendation",
      timestamp: new Date(),
      category: "risk" as const,
      actionable: true,
    };
    
    act(() => {
      result.current.handleActionClick(riskMessage);
    });
    
    expect(mockToast.toast).toHaveBeenCalledWith({
      title: "Risk Management",
      description: "Opening risk assessment dashboard",
    });
  });

  test("handleActionClick shows toast for market category", () => {
    const { result } = renderHook(() => useAIAssistant());
    
    const marketMessage = {
      id: "test-4",
      type: "recommendation" as const,
      text: "Market analysis recommendation",
      timestamp: new Date(),
      category: "market" as const,
      actionable: true,
    };
    
    act(() => {
      result.current.handleActionClick(marketMessage);
    });
    
    expect(mockToast.toast).toHaveBeenCalledWith({
      title: "Market Analysis",
      description: "Opening detailed market analysis view",
    });
  });

  test("handleActionClick shows toast for advice category", () => {
    const { result } = renderHook(() => useAIAssistant());
    
    const adviceMessage = {
      id: "test-5",
      type: "recommendation" as const,
      text: "Financial advice recommendation",
      timestamp: new Date(),
      category: "advice" as const,
      actionable: true,
    };
    
    act(() => {
      result.current.handleActionClick(adviceMessage);
    });
    
    expect(mockToast.toast).toHaveBeenCalledWith({
      title: "Financial Advice",
      description: "Preparing personalized financial recommendations",
    });
  });
  
  test("handleSubmit adds user message and generates AI response", () => {
    const { result } = renderHook(() => useAIAssistant());
    
    const mockEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent;
    
    act(() => {
      result.current.setInput("buy Tesla");
      result.current.handleSubmit(mockEvent);
    });
    
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(result.current.input).toBe(""); // Input should be cleared
    
    // The new user message should be added
    const lastMessage = result.current.messages[result.current.messages.length - 1];
    expect(lastMessage.type).toBe("user");
    expect(lastMessage.text).toBe("buy Tesla");
    
    // AI response should be generated after timeout
    act(() => {
      jest.runAllTimers(); // Fast-forward time to trigger the setTimeout callback
    });
    
    // Now check if the AI response was added
    const aiResponse = result.current.messages[result.current.messages.length - 1];
    expect(aiResponse.type).toBe("system");
    expect(aiResponse.category).toBe("action");
    expect(aiResponse.actionable).toBe(true);
  });

  test("generates market-related responses", () => {
    const { result } = renderHook(() => useAIAssistant());
    
    const mockEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent;
    
    act(() => {
      result.current.setInput("What's the current market summary?");
      result.current.handleSubmit(mockEvent);
    });
    
    // AI response should be generated after timeout
    act(() => {
      jest.runAllTimers();
    });
    
    // Check the AI response for market query
    const aiResponse = result.current.messages[result.current.messages.length - 1];
    expect(aiResponse.type).toBe("system");
    expect(aiResponse.category).toBe("market");
    expect(aiResponse.text).toContain("Market Summary");
  });

  test("generates portfolio-related responses", () => {
    const { result } = renderHook(() => useAIAssistant());
    
    const mockEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent;
    
    act(() => {
      result.current.setInput("How is my portfolio performing?");
      result.current.handleSubmit(mockEvent);
    });
    
    // AI response should be generated after timeout
    act(() => {
      jest.runAllTimers();
    });
    
    // Check the AI response for portfolio query
    const aiResponse = result.current.messages[result.current.messages.length - 1];
    expect(aiResponse.type).toBe("system");
    expect(aiResponse.text).toContain("Portfolio Performance");
  });
  
  test("handleSubmit does nothing if input is empty", () => {
    const { result } = renderHook(() => useAIAssistant());
    
    const initialMessagesCount = result.current.messages.length;
    const mockEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent;
    
    act(() => {
      result.current.setInput("");
      result.current.handleSubmit(mockEvent);
    });
    
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(result.current.messages.length).toBe(initialMessagesCount); // No new message added
  });
});
