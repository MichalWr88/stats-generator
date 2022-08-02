import React, { ReactNode } from "react";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
interface Props<T> {
  children: ReactNode;
  onSubmit: (data: T) => void;
}

const ReactFormProvider = <T extends FieldValues>({
  children,
  onSubmit,
}: Props<T>) => {
  const methods = useForm<T>();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => onSubmit(data))}>
        {children}
      </form>
    </FormProvider>
  );
};

export default ReactFormProvider;
