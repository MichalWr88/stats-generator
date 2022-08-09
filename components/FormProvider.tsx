import React, { ReactNode } from 'react';
import { useForm, FormProvider, FieldValues, DeepPartial } from 'react-hook-form';
interface Props<T> {
  children: ReactNode;
  onSubmit: (data: T) => void;
  defaultValues?: DeepPartial<T>;
}

const ReactFormProvider = <T extends FieldValues>({ children, onSubmit, defaultValues }: Props<T>) => {
  const methods = useForm<T>({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => onSubmit(data))}>{children}</form>
    </FormProvider>
  );
};

export default ReactFormProvider;
