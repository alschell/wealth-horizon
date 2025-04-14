
import React from 'react';
import { AlertTriangle, HelpCircle, Info, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export type ConfirmationVariant = 'info' | 'warning' | 'danger' | 'success';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  variant?: ConfirmationVariant;
  children?: React.ReactNode;
  confirmButtonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

const variantConfig: Record<ConfirmationVariant, {
  icon: React.ReactNode;
  confirmVariant: 'default' | 'destructive' | 'outline' | 'secondary';
  titleColor: string;
}> = {
  info: {
    icon: <Info className="h-6 w-6 text-blue-500" />,
    confirmVariant: 'default',
    titleColor: 'text-blue-700'
  },
  warning: {
    icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
    confirmVariant: 'secondary', 
    titleColor: 'text-amber-700'
  },
  danger: {
    icon: <AlertTriangle className="h-6 w-6 text-destructive" />,
    confirmVariant: 'destructive',
    titleColor: 'text-destructive'
  },
  success: {
    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
    confirmVariant: 'default',
    titleColor: 'text-green-700'
  }
};

/**
 * A reusable confirmation dialog component
 */
export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
  variant = 'info',
  children,
  confirmButtonVariant
}) => {
  const { icon, confirmVariant, titleColor } = variantConfig[variant];
  const buttonVariant = confirmButtonVariant || confirmVariant;
  
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };
  
  const handleConfirm = () => {
    onConfirm();
    // Only close the dialog if not loading - this allows for async operations
    if (!isLoading) {
      onOpenChange(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex gap-4 sm:gap-6">
          <div className="flex flex-row items-start gap-4">
            {icon}
            <div>
              <DialogTitle className={titleColor}>{title}</DialogTitle>
              {description && (
                <DialogDescription className="mt-1.5">
                  {description}
                </DialogDescription>
              )}
            </div>
          </div>
        </DialogHeader>
        
        {children && (
          <div className="py-4">
            {children}
          </div>
        )}
        
        <DialogFooter className="flex flex-row justify-end gap-2 sm:space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={buttonVariant}
            onClick={handleConfirm}
            disabled={isLoading}
            className="min-w-[80px]"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Loading
              </span>
            ) : (
              confirmLabel
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
