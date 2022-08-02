import React from "react";
import { Toaster } from "react-hot-toast";
import useColors from "./api/hooks/useColors";

// import { TailwindConfig, TailwindValues } from "tailwindcss/tailwind-config";





const Toast = () => {
const colors = useColors(); 

  return (
    <Toaster
      toastOptions={{
        success: {
          style: {
            background: "green",
          },
        },
        error: {
          style: {
            background: colors.red[500],
            color: "white",
          },
        },
      }}
    />
  );
};

export default Toast;
