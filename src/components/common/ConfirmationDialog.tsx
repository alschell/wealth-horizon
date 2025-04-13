
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Check, 
  X, 
  Info, 
  AlertCircle, 
  HelpCircle 
} from 'lucide-react';

export interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'destructive' | 'warning' | 'info' | 'success' | 'question';
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hideCancel?: boolean;
  confirmButtonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  cancelButtonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  closeOnConfirm?: boolean;
}

const variantIcons: Record<string, React.ReactNode> = {
  destructive: <AlertTriangle className="h-5 w-5 text-destructive" />,
  warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
  success: <Check className="h-5 w-5 text-green-500" />,
  question: <HelpCircle className="h-5 w-5 text-primary" />
};

const confirmButtonVariants: Record<string, string> = {
  destructive: 'destructive',
  warning: 'default',
  info: 'default',
  success: 'default',
  question: 'default'
};

const sizeClasses: Record<string, string> = {
  sm: 'sm:max-w-[425px]',
  md: 'sm:max-w-[550px]',
  lg: 'sm:max-w-[650px]',
  xl: 'sm:max-w-[800px]'
};

/**
 * Reusable confirmation dialog component with enhanced styling and variants
 */
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  cancelLabel,
  variant = 'question',
  isLoading = false,
  size = 'sm',
  hideCancel = false,
  confirmButtonVariant,
  cancelButtonVariant = 'outline',
  closeOnConfirm = true,
}) => {
  const handleConfirm = () => {
    onConfirm();
    if (closeOnConfirm) {
      onClose();
    }
  };

  const buttonVariant = confirmButtonVariant || confirmButtonVariants[variant] || 'default';
  const iconElement = variantIcons[variant] || variantIcons.question;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className={sizeClasses[size]}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {iconElement}
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="mt-2">{description}</DialogDescription>
          )}
        </DialogHeader>
        
        <DialogFooter className="mt-4 flex gap-2 sm:justify-end">
          {!hideCancel && (
            <Button
              type="button"
              variant={cancelButtonVariant}
              onClick={onClose}
              disabled={isLoading}
              className="flex items-center"
            >
              <X className="h-4 w-4 mr-1" />
              {cancelLabel || 'Cancel'}
            </Button>
          )}
          <Button
            type="button"
            variant={buttonVariant}
            onClick={handleConfirm}
            disabled={isLoading}
            className={isLoading ? "opacity-70 cursor-not-allowed" : ""}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                {variant === 'destructive' ? (
                  <AlertTriangle className="h-4 w-4 mr-1" />
                ) : variant === 'success' ? (
                  <Check className="h-4 w-4 mr-1" />
                ) : null}
                {confirmLabel || 'Confirm'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
