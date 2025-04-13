
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ResumeFileUpload } from "../ResumeFileUpload";
import { announceToScreenReader } from "@/utils/a11y";

// Mock the screen reader announcer
jest.mock("@/utils/a11y", () => ({
  announceToScreenReader: jest.fn(),
}));

describe("ResumeFileUpload Component", () => {
  const mockSetResumeFile = jest.fn();
  const mockHandleFileChange = jest.fn();
  const mockFile = new File(["test"], "test.pdf", { type: "application/pdf" });
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test("renders upload area when no file is selected", () => {
    render(
      <ResumeFileUpload
        resumeFile={null}
        setResumeFile={mockSetResumeFile}
        handleFileChange={mockHandleFileChange}
      />
    );
    
    expect(screen.getByText(/Drag and drop your resume or/)).toBeInTheDocument();
    expect(screen.getByText(/browse files/)).toBeInTheDocument();
    expect(screen.getByText(/PDF, DOC, or DOCX files up to 5MB/)).toBeInTheDocument();
  });
  
  test("renders file information when file is selected", () => {
    render(
      <ResumeFileUpload
        resumeFile={mockFile}
        setResumeFile={mockSetResumeFile}
        handleFileChange={mockHandleFileChange}
      />
    );
    
    expect(screen.getByText("test.pdf")).toBeInTheDocument();
    expect(screen.getByLabelText(/Remove resume file/)).toBeInTheDocument();
  });
  
  test("calls handleFileChange when file input changes", () => {
    render(
      <ResumeFileUpload
        resumeFile={null}
        setResumeFile={mockSetResumeFile}
        handleFileChange={mockHandleFileChange}
      />
    );
    
    const fileInput = screen.getByTestId("resume-file-input");
    
    // Create a mock file and file change event
    const file = new File(["test"], "test.pdf", { type: "application/pdf" });
    const fileChangeEvent = { target: { files: [file] } };
    
    fireEvent.change(fileInput, fileChangeEvent);
    
    expect(mockHandleFileChange).toHaveBeenCalled();
  });
  
  test("announces to screen reader when file is removed", () => {
    render(
      <ResumeFileUpload
        resumeFile={mockFile}
        setResumeFile={mockSetResumeFile}
        handleFileChange={mockHandleFileChange}
      />
    );
    
    const removeButton = screen.getByLabelText(/Remove resume file/);
    fireEvent.click(removeButton);
    
    expect(mockSetResumeFile).toHaveBeenCalledWith(null);
    expect(announceToScreenReader).toHaveBeenCalledWith("Resume file removed", "polite");
  });
  
  test("displays error message when error is provided", () => {
    const errorMessage = "Invalid file type";
    render(
      <ResumeFileUpload
        resumeFile={null}
        setResumeFile={mockSetResumeFile}
        handleFileChange={mockHandleFileChange}
        error={errorMessage}
      />
    );
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
  
  test("applies disabled state when disabled is true", () => {
    render(
      <ResumeFileUpload
        resumeFile={null}
        setResumeFile={mockSetResumeFile}
        handleFileChange={mockHandleFileChange}
        disabled={true}
      />
    );
    
    const dropArea = screen.getByRole("button");
    expect(dropArea).toHaveAttribute("tabIndex", "-1");
    expect(dropArea.closest("div")).toHaveClass("opacity-50 cursor-not-allowed");
  });
});
