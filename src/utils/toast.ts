
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

export const showSuccess = (title: string, description?: string) => {
  toast({
    title,
    description,
    variant: 'default',
  });
};

export const showError = (title: string, description?: string) => {
  toast({
    title,
    description,
    variant: 'destructive',
  });
};

export const showWarning = (title: string, description?: string, action?: {label: string, onClick: () => void}) => {
  toast({
    title,
    description,
    variant: 'default',
    action: action ? <ToastAction altText={action.label} onClick={action.onClick}>{action.label}</ToastAction> : undefined,
  });
};

export const showInfo = (title: string, description?: string) => {
  toast({
    title,
    description,
    variant: 'default',
  });
};
