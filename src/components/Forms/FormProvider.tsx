import React, { type ReactNode } from 'react';
import { useForm, FormProvider, type FieldValues, type Resolver, type DefaultValues } from 'react-hook-form';

type AsyncDefaultValues<TFieldValues> = (
  // eslint-disable-next-line no-unused-vars
  payload?: unknown
) => Promise<TFieldValues>;

interface Props<T extends FieldValues> {
  children: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: T) => void;
  defaultValues: AsyncDefaultValues<T> | DefaultValues<T> | undefined;
  resolver: Resolver<T, object> | undefined;
}

const ReactFormProvider = <T extends FieldValues>({ children, onSubmit, defaultValues, resolver }: Props<T>) => {
  const methods = useForm<T>({ defaultValues, resolver, reValidateMode: 'onBlur' });
  return (
    <FormProvider {...methods}>
      <form onSubmit={() => methods.handleSubmit((data) => onSubmit(data))}>{children}</form>
    </FormProvider>
  );
};

export default ReactFormProvider;
