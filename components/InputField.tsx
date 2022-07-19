import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  type?: "text" | "number" | "date";
  className?: string;
};

const InputField = ({ label, type = "text", name, className }: Props) => {
  const { register } = useFormContext();
  return (
    <div className={`relative ${className}`}>
      <label className="text-gray-700">
        {label}
        <input
          {...register(name)}
          type={type}
          className="rounded-lg
          border-transparent
          flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="number"
        />
      </label>
    </div>
  );
};

export default InputField;
