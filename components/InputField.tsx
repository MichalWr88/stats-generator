import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";

type InputType = "text" | "number" | "date";
type Props = {
  label: string;
  name: string;
  type?: InputType;
  className?: string;
  step?: string;
};

const InputField = ({
  label,
  type = "text",
  name,
  className,
  step = "1",
}: Props) => {
  const { register } = useFormContext();
  const configInput = useMemo(() => {
    switch (type) {
      case "date":
        return {};
      case "number":
        return {
          placeholder: "number",
          defaultValue: 0,
          step,
        };

      default:
        return {};
    }
  }, [type, step]);
  return (
    <div className={`relative ${className}`}>
      <label className="text-gray-700">
        {label}

        <input
          {...register(name, {
            valueAsNumber: type === "number",
          })}
          type={type}
          {...configInput}
          className="rounded-lg
          border-transparent
          flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </label>
    </div>
  );
};

export default InputField;
