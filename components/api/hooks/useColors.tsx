import React from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import { DefaultColors } from "tailwindcss/types/generated/colors.js";
import tailwindConfig from "../../../tailwind.config.js";
type keyColorProps =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";
const fullConfig = resolveConfig(tailwindConfig);
const colors = fullConfig?.theme?.colors as unknown as DefaultColors;

const useColors = () => {
  return colors;
};

export default useColors;
