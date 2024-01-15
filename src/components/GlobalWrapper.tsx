"use client";
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/api/queryClient';

import Loader from './shared/Loader';
import { ErrorBoundary } from '@/utils/ReactBoundry';
import Toast from './shared/Toast';

type Props = {
  children: ReactNode;
};

const GlobalWrapper = ({ children }: Props) => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Toast />
        <Loader />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default GlobalWrapper;
