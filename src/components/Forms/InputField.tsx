import React, { useMemo, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, type FieldError, type FieldErrorsImpl, type Merge, useFormContext } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';
type InputType = 'text' | 'number' | 'date';
type Props = {
  label: string;
  name: string;
  type?: InputType;
  className?: string;
  step?: string;
  disabled?: boolean;
};

const InputField = ({ label, type = 'text', name, className, step = '1', disabled }: Props) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const [error, setError] = useState<FieldError | Merge<FieldError, FieldErrorsImpl<unknown>> | undefined>(undefined);

  useEffect(() => {
    const primaryError = errors[name.split('.')[0]];
    const nestedError = primaryError?.[name.split('.')[1]] as FieldError | Merge<FieldError, FieldErrorsImpl<unknown>>;
    if (nestedError) {
      setError(() => nestedError);
    } else if (primaryError) {
      setError(() => primaryError);
    } else {
      setError(undefined);
    }
  }, [error?.message, errors, name]);
  useEffect(() => {
    if (!error?.message) return;
    toast.error(`${error?.message} `, {
      position: 'bottom-center',
      className: 'text-red-700',
    });
  }, [error]);

  const configInput = useMemo(() => {
    switch (type) {
      case 'date':
        return {};
      case 'number':
        return {
          placeholder: 'number',
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
        {type === 'date' && (
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePicker
                calendarStartDay={1}
                className={
                  'rounded-lg border-transparent flex-1 appearance-none border border-gray-500 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent' +
                  `${error?.message ? 'border-red-700' : ''}`
                }
                onChange={onChange}
                onBlur={onBlur}
                selected={value as Date}
                dateFormat="dd/MM/yyyy"
              />
            )}
          />
        )}
        {type !== 'date' && (
          <input
          disabled={disabled}
            {...register(name, {
              valueAsNumber: type === 'number',
            })}
            type={type}
            {...configInput}
            className={`rounded-lg  flex-1 appearance-none border border-gray-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 
              ${
                !disabled
                  ? ''
                  : 'cursor-not-allowed bg-gray-400 text-gray-500  border-gray-400  transition-none ease-none'
              }
              ${error?.message ? 'border-b-4 border-b-red-500' : ''}
              `}
          />
        )}
      </label>
    </div>
  );
};

export default InputField;
