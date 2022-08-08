import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/components/api/queryClient';
import Loader from '@/components/Loader';
import Toast from '@/components/Toast';
import { ErrorBoundary } from 'utils/ReactBoundry';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Toast />
        <Loader />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
