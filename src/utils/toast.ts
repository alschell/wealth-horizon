
import { toast } from '@/components/ui/use-toast';

export const showSuccess = (title: string, description: string) => {
  toast({
    title,
    description,
    variant: 'default'
  });
};

export const showError = (title: string, description: string) => {
  toast({
    title,
    description,
    variant: 'destructive'
  });
};
