
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  confirmVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  isLoading?: boolean;
  children?: React.ReactNode;
}

/**
 * Reusable confirmation dialog component
 * Handles common confirmation patterns with loading state
 */
export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  confirmVariant = 'default',
  isLoading = false,
  children,
}) => {
  const handleCancel = () => {
    onOpenChange(false);
    if (onCancel) {
      onCancel();
    }
  };

  const handleConfirm = async () => {
    await onConfirm();
    if (!isLoading) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        
        {children}
        
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          
          <Button
            type="button"
            variant={confirmVariant}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                <span>Processing...</span>
              </>
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
