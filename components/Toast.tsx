import React from "react";
import { Toaster } from "react-hot-toast";
import resolveConfig from "tailwindcss/resolveConfig";
import { DefaultColors } from "tailwindcss/types/generated/colors.js";
import tailwindConfig from "../tailwind.config.js";
// import { TailwindConfig, TailwindValues } from "tailwindcss/tailwind-config";

type keyColorProps = "50" | "100" | "200" | "300" | '400' | "500" | "600" | '700'| "800" | "900";
const fullConfig = resolveConfig(tailwindConfig);
const colors = fullConfig?.theme?.colors as unknown as DefaultColors;



const Toast = () => {
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
