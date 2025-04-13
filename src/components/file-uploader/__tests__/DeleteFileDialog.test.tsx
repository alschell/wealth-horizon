
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteFileDialog from "../DeleteFileDialog";

describe("DeleteFileDialog Component", () => {
  const mockOnOpenChange = jest.fn();
  const mockOnConfirm = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test("renders the dialog with default title and description when open", () => {
    render(
      <DeleteFileDialog 
        isOpen={true} 
        onOpenChange={mockOnOpenChange} 
        onConfirm={mockOnConfirm} 
      />
    );
    
    expect(screen.getByText("Confirm File Deletion")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to delete this file? This action cannot be undone.")).toBeInTheDocument();
  });
  
  test("renders with custom title and description when provided", () => {
    const customTitle = "Custom Delete Title";
    const customDescription = "Custom delete description";
    
    render(
      <DeleteFileDialog 
        isOpen={true} 
        onOpenChange={mockOnOpenChange} 
        onConfirm={mockOnConfirm}
        title={customTitle}
        description={customDescription}
      />
    );
    
    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customDescription)).toBeInTheDocument();
  });
  
  test("calls onConfirm when confirm button is clicked", () => {
    render(
      <DeleteFileDialog 
        isOpen={true} 
        onOpenChange={mockOnOpenChange} 
        onConfirm={mockOnConfirm}
      />
    );
    
    const confirmButton = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(confirmButton);
    
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });
  
  test("calls onOpenChange when cancel button is clicked", () => {
    render(
      <DeleteFileDialog 
        isOpen={true} 
        onOpenChange={mockOnOpenChange} 
        onConfirm={mockOnConfirm}
      />
    );
    
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);
    
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });
});
