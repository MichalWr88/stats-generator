import Toast from '@/components/Toast';
import { queryClient } from '@/components/api/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'src/utils/ReactBoundry';
import Loader from 'src/components/shared/Loader';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
