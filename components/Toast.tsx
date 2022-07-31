import React from "react";
import { Toaster } from "react-hot-toast";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
// import { TailwindConfig, TailwindValues } from "tailwindcss/tailwind-config";

const fullConfig = resolveConfig(tailwindConfig);
const colors = fullConfig?.theme?.colors as { red: { 500: string } };

type Props = {
  type?: "succes" | "error" | "normal" | "warning";
};

const Toast = () => {
  console.dir(colors);
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
