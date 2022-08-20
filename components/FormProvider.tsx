import React, { ReactNode } from 'react';
import { useForm, FormProvider, FieldValues, DeepPartial, Resolver } from 'react-hook-form';

interface Props<T> {
  children: ReactNode;
  onSubmit: (data: T) => void;
  defaultValues?: DeepPartial<T>;
  resolver: Resolver<T, object> | undefined;
}

const ReactFormProvider = <T extends FieldValues>({ children, onSubmit, defaultValues, resolver }: Props<T>) => {
  const methods = useForm<T>({ defaultValues, resolver, reValidateMode: 'onBlur' });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => onSubmit(data))}>{children}</form>
    </FormProvider>
  );
};

export default ReactFormProvider;
