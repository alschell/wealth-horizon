
import { OrderType, TradeOrder, ViewMode, AllocationItem } from "../../types";

export interface AllocationSummaryProps {
  totalAmount: number;
  currency: string;
  currentAllocation: number;
  remainingAmount: number;
}

export interface AllocationItemRowProps {
  item: AllocationItem;
  allocation: number;
  onChange: (amount: number) => void;
  maxAmount: number;
}

export interface QuantityAllocationSummaryProps {
  totalQuantity: number;
  currentAllocation: number;
  remainingQuantity: number;
}

export interface SelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}
