
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
  // New options for enhanced error handling
  showErrorToast?: boolean;
  errorMessage?: string;
  retryOnError?: boolean;
  maxRetries?: number;
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
  showErrorToast = true,
  errorMessage,
  retryOnError = false,
  maxRetries = 3,
}: UseFetchDataProps<T>) => {
  const [data, setData] = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();

  const fetchData = async (attemptNumber = 0) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios({
        url,
        method,
        ...axiosConfig,
      });

      setData(response.data);
      setLastUpdated(new Date());
      
      if (showSuccessToast) {
        toast({
          title: 'Success',
          description: successMessage,
          variant: 'default',
        });
      }
      
      // Reset retry count on success
      setRetryCount(0);
    } catch (err: any) {
      setError(err);
      
      // Determine if we should retry
      const shouldRetry = retryOnError && attemptNumber < maxRetries;
      
      // Generate appropriate error message
      let message = errorMessage || 'An unexpected error occurred';

      if (isAxiosError(err) && err.response) {
        const status = err.response.status;
        
        if (status === 401) {
          message = 'Your session has expired. Please log in again.';
        } else if (status === 403) {
          message = 'You don\'t have permission to access this resource.';
        } else if (status === 404) {
          message = 'The requested resource was not found.';
        } else if (status >= 500) {
          message = 'A server error occurred. Please try again later.';
        } else {
          message = err.response.data?.message || `Request failed with status code ${status}`;
        }
      } else if (err instanceof Error) {
        // Handle network errors and timeouts
        if (err.message.includes('Network Error')) {
          message = 'Unable to connect to the server. Please check your internet connection.';
        } else if (err.message.includes('timeout')) {
          message = 'The request timed out. Please try again.';
        } else {
          message = err.message;
        }
      }
      
      if (showErrorToast) {
        toast({
          title: 'Error',
          description: message,
          variant: 'destructive',
        });
      }
      
      // If we should retry, increment count and try again after delay
      if (shouldRetry) {
        setRetryCount(attemptNumber + 1);
        const delay = Math.min(1000 * Math.pow(2, attemptNumber), 8000); // Exponential backoff
        
        setTimeout(() => {
          fetchData(attemptNumber + 1);
        }, delay);
      }
    } finally {
      if (!retryOnError || retryCount >= maxRetries) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, method, ...(dependencies || [])]);

  // Manual retry function
  const retry = () => {
    setRetryCount(0);
    fetchData();
  };

  return { 
    data, 
    isLoading, 
    error, 
    setData, 
    retry,
    lastUpdated,
    isRetrying: retryCount > 0
  };
};
