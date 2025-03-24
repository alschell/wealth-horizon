
import { z } from "zod";

export interface BeneficialOwnerInfo {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  ownershipPercentage: string;
  nationality: string;
  dateOfBirth: string;
  documents?: File[];
}

export interface OwnerFormValues {
  firstName: string;
  lastName: string;
  relationship: string;
  ownershipPercentage: string;
  nationality: string;
  dateOfBirth: string;
  documents?: File[];
}

// Update the schema to explicitly match the OwnerFormValues interface
export const ownerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  ownershipPercentage: z.string().min(1, "Ownership percentage is required"),
  nationality: z.string().min(1, "Nationality is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  documents: z.array(z.instanceof(File)).optional()
});

export type OwnerFormSchema = z.infer<typeof ownerSchema>;

export interface OwnersListProps {
  owners: BeneficialOwnerInfo[];
  onEditOwner: (index: number) => void;
  onRemoveOwner: (index: number) => void;
}

export interface AddOwnerFormProps {
  onAddOwner: (owner: BeneficialOwnerInfo) => void;
  onCancel: () => void;
  isEditing?: boolean;
  existingOwner?: BeneficialOwnerInfo;
}

export interface OwnerFormFieldsProps {
  control: any;
  errors: any;
  onFilesSelected: (files: File[]) => void;
}
