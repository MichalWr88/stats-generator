import "../styles/globals.css";
import type { AppProps } from "next/app";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/components/api/queryClient";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
