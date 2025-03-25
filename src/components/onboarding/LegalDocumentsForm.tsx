
import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { File } from "lucide-react";
import FormHeader from "./common/FormHeader";
import FormFooter from "./common/FormFooter";
import AddDocumentForm from "./legal/AddDocumentForm";
import DocumentList from "./legal/DocumentList";
import { useLegalDocumentsForm } from "./legal/useLegalDocumentsForm";

const LegalDocumentsForm = () => {
  const {
    documentType,
    issueDate,
    expiryDate,
    selectedFile,
    documentFiles,
    errors,
    isSubmitting,
    isEditing,
    handleDocumentTypeChange,
    handleDateChange,
    handleFileSelected,
    handleFileClear,
    handleAddDocument,
    handleSubmit,
    handleBack,
    handleRemoveDocument,
    handleEditDocument,
    handleCancelEdit
  } = useLegalDocumentsForm();

  // Determine if we should disable the continue button
  const hasDocuments = documentFiles.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="p-6 md:p-8 shadow-sm">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
          <FormHeader 
            icon={<File className="h-7 w-7 text-black" />}
            title="Legal Documents"
            description="Please provide legal formation documents for your family office entity."
          />

          <AddDocumentForm
            documentType={documentType}
            issueDate={issueDate}
            expiryDate={expiryDate}
            file={selectedFile}
            errors={errors}
            onDocumentTypeChange={handleDocumentTypeChange}
            onDateChange={handleDateChange}
            onFileSelected={handleFileSelected}
            onFileClear={handleFileClear}
            onAddDocument={handleAddDocument}
            isEditing={isEditing}
            onCancelEdit={handleCancelEdit}
          />
          
          {documentFiles.length > 0 && (
            <DocumentList 
              documentFiles={documentFiles} 
              onRemoveDocument={handleRemoveDocument}
              onEditDocument={handleEditDocument}
            />
          )}

          <FormFooter
            onBack={handleBack}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            showRequired={true}
            disableContinue={!hasDocuments}
          />
        </form>
      </Card>
    </motion.div>
  );
};

export default LegalDocumentsForm;
