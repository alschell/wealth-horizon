import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useToast } from '@/hooks/use-toast';

interface UseFetchDataProps<T> {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
  initialData?: T;
  axiosConfig?: AxiosRequestConfig;
  dependencies?: any[];
  showSuccessToast?: boolean;
  successMessage?: string;
}

function isAxiosError(error: any): boolean {
  return error.isAxiosError === true;
}

export const useFetchData = <T>({
  url,
  method = 'get',
  initialData,
  axiosConfig,
  dependencies = [],
  showSuccessToast = false,
  successMessage = 'Data fetched successfully',
}: UseFetchDataProps<T>) => {
  const [data, setData] = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios({
          url,
          method,
          ...axiosConfig,
        });

        setData(response.data);
        if (showSuccessToast) {
          toast({
            title: 'Success',
            description: successMessage,
          });
        }
      } catch (err: any) {
        setError(err);
        let message = 'An unexpected error occurred';

        if (isAxiosError(err) && err.response) {
          message = err.response.data?.message || `Request failed with status code ${err.response.status}`;
        } else if (err instanceof Error) {
          message = err.message;
        }

        toast({
          title: 'Error',
          description: message,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, method, ...(dependencies || [])]);

  return { data, isLoading, error, setData };
};
