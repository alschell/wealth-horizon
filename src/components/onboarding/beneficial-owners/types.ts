
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

export const ownerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  ownershipPercentage: z.string().min(1, "Ownership percentage is required"),
  nationality: z.string().min(1, "Nationality is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  documents: z.any().optional()
});

export interface OwnersListProps {
  owners: BeneficialOwnerInfo[];
  onDelete: (index: number) => void;
  onEdit?: (index: number) => void;
}
