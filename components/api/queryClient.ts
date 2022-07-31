import { QueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

const queryErrorHandler = (error: unknown): void => {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const id = "react-query-error";
  const title =
    error instanceof Error ? error.message : "error connecting to server";
  console.log("handler", error);
  toast(title);
  // prevent duplicate toasts
  // toast.closeAll();
  // toast({ id, title, status: 'error', variant: 'subtle', isClosable: true });
};

// to satisfy typescript until this file has uncommented contents
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
});
