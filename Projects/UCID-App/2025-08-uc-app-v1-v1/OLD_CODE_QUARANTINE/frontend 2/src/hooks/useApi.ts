import { useState, useCallback } from 'react';
import { ApiResponse } from '../services';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<ApiResponse<T>>;
  reset: () => void;
  setData: (data: T | null) => void;
  setError: (error: string | null) => void;
}

export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>,
  initialData: T | null = null
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: initialData,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const response = await apiFunction(...args);
        
        if (response.error) {
          setState(prev => ({ ...prev, loading: false, error: response.error || null }));
        } else {
          setState(prev => ({ 
            ...prev, 
            loading: false, 
            data: response.data || null,
            error: null 
          }));
        }
        
        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        setState(prev => ({ ...prev, loading: false, error: errorMessage }));
        return { error: errorMessage };
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: initialData,
      loading: false,
      error: null,
    });
  }, [initialData]);

  const setData = useCallback((data: T | null) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  return {
    ...state,
    execute,
    reset,
    setData,
    setError,
  };
}

// Specialized hooks for common API patterns
export function useApiWithCache<T = any>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>,
  cacheKey: string,
  initialData: T | null = null
): UseApiReturn<T> & { 
  refresh: () => Promise<ApiResponse<T>>;
  isStale: boolean;
} {
  const [lastFetch, setLastFetch] = useState<number>(0);
  const [isStale, setIsStale] = useState(false);
  
  const baseHook = useApi(apiFunction, initialData);
  
  const execute = useCallback(
    async (...args: any[]) => {
      const now = Date.now();
      const timeSinceLastFetch = now - lastFetch;
      
      // Consider data stale after 5 minutes
      if (timeSinceLastFetch > 5 * 60 * 1000) {
        setIsStale(true);
      }
      
      setLastFetch(now);
      setIsStale(false);
      
      return baseHook.execute(...args);
    },
    [baseHook, lastFetch]
  );
  
  const refresh = useCallback(
    async (...args: any[]) => {
      setIsStale(false);
      return baseHook.execute(...args);
    },
    [baseHook]
  );
  
  return {
    ...baseHook,
    execute,
    refresh,
    isStale,
  };
}

export function useApiWithRetry<T = any>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>,
  maxRetries: number = 3,
  retryDelay: number = 1000,
  initialData: T | null = null
): UseApiReturn<T> & { 
  retryCount: number;
  maxRetries: number;
} {
  const [retryCount, setRetryCount] = useState(0);
  const baseHook = useApi(apiFunction, initialData);
  
  const executeWithRetry = useCallback(
    async (...args: any[]) => {
      let lastError: string | null = null;
      
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        setRetryCount(attempt);
        
        try {
          const response = await apiFunction(...args);
          
          if (response.error) {
            lastError = response.error;
            
            if (attempt < maxRetries) {
              // Wait before retrying
              await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
              continue;
            }
          }
          
          // Success or max retries reached
          return response;
        } catch (error) {
          lastError = error instanceof Error ? error.message : 'An unexpected error occurred';
          
          if (attempt < maxRetries) {
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
            continue;
          }
        }
      }
      
      // All retries failed
      return { error: lastError || 'Max retries exceeded' };
    },
    [apiFunction, maxRetries, retryDelay]
  );
  
  return {
    ...baseHook,
    execute: executeWithRetry,
    retryCount,
    maxRetries,
  };
}
