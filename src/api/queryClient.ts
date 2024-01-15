"use client";
import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

const queryErrorHandler = (error: unknown): void => {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))

  if (error instanceof AxiosError) {
    const msg = error.message || 'error connecting to server';
    const errorData = error.response?.data;
    toast.error(`${msg} ${JSON.stringify(errorData)}`, {
      position: 'bottom-center',
      className: 'text-red-700',
    });
    return;
  }
  if (error instanceof Error) {
    toast.error(`${error.message}`, {
      position: 'bottom-center',
      className: 'text-red-700',
    });
    return;
  } else {
    toast.error(`${error}`, {
      position: 'bottom-center',
      className: 'text-red-700',
    });
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError: queryErrorHandler,
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
});
