
import { useState } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { DocumentFileWithMetadata } from "../types";

export const useDocumentState = () => {
  const { onboardingData } = useOnboarding();
  
  const [documentType, setDocumentType] = useState<string>("");
  const [issueDate, setIssueDate] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const initialDocuments: DocumentFileWithMetadata[] = 
    onboardingData.legalDocuments.documentFiles?.map(file => {
      if ('id' in file && 'file' in file) {
        return file as unknown as DocumentFileWithMetadata;
      }
      
      return {
        id: crypto.randomUUID(),
        file: file as File,
        documentType: (file as any).documentType || "",
        issueDate: (file as any).issueDate || "",
        expiryDate: (file as any).expiryDate || "",
      };
    }) || [];
  
  const [documentFiles, setDocumentFiles] = useState<DocumentFileWithMetadata[]>(initialDocuments);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDocumentId, setEditingDocumentId] = useState<string | null>(null);

  return {
    documentType,
    setDocumentType,
    issueDate,
    setIssueDate,
    expiryDate,
    setExpiryDate,
    selectedFile,
    setSelectedFile,
    documentFiles,
    setDocumentFiles,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    isEditing,
    setIsEditing,
    editingDocumentId,
    setEditingDocumentId
  };
};
