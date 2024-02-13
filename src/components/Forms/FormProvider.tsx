//@ts-ignore
import React, { type ReactNode } from 'react';
import { useForm, FormProvider, type FieldValues, type DeepPartial, type Resolver } from 'react-hook-form';
interface Props<T extends FieldValues> {
  children: ReactNode;
  // eslint-disable-next-line no-unused-vars
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
