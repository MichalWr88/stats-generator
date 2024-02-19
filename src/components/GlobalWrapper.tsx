'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { type ReactNode } from 'react';
import { queryClient } from '@/api/queryClient';
import ErrorBoundary from '@/utils/ReactBoundry';
import Loader from './shared/Loader';
import Toast from './shared/Toast';

type Props = {
  children: ReactNode;
};

const GlobalWrapper = ({ children }: Props) => {
  return (
    <ErrorBoundary>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Toast />
          <Loader />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
};

export default GlobalWrapper;
