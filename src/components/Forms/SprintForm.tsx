
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import useEditSprint from '@/hooks/useEditSprint';
import useSendSprint from '@/hooks/useSendSprint';
import { type Issue, type Sprint, sprintSchemaEdit } from '@/models/Sprint';
import ReactFormProvider from './FormProvider';
import InputField from './InputField';

type Props = {
  issues?: Array<Issue>;
  sprint?: Omit<Sprint, 'issues'>;
};

const SprintForm = ({ issues = [], sprint }: Props) => {
  const router = useRouter();
  const { mutate: mutateAddSprint, isSuccess: addSprintSuccess } = useSendSprint();
  const { mutate: mutateEditSprint } = useEditSprint();

  const resolver = yupResolver(sprintSchemaEdit);

  useEffect(() => {
    if (!addSprintSuccess) return;
    console.log('addSprintSuccess', addSprintSuccess);
    router.push('/charts');
  }, [addSprintSuccess, router, sprint]);

  const onSubmit = (data: Sprint) => {
    if (sprint) {
      mutateEditSprint({ ...data });
    } else {
      mutateAddSprint({ ...data, issues });
    }
  };
  return (
    <ReactFormProvider<Sprint>
      onSubmit={onSubmit}
      resolver={resolver}
      defaultValues={{
        ...sprint,
        start: new Date(sprint?.start ?? new Date()),
        end: new Date(sprint?.end ?? new Date()),
      }}
    >
      <div className="grid items-end justify-center grid-cols-10 grid-rows-3 gap-4 p-6 border-b-2 border-cyan-600">
        <InputField label={'Numer sprintu'} name={'nr'} type="number" />
        <InputField label={'Zaplanowane'} name={'plan'} className={'col-span-2'} type="number" step=".5" />
        <InputField label={'Dowiezione'} name={'delivered'} className={'col-span-2'} type="number" step=".5" />
        <InputField label={'start sprintu'} name={'start'} className={'col-span-2'} type={'date'} />
        <InputField label={'koniec sprintu'} name={'end'} className={'col-span-2'} type={'date'} />

        <h2 className="flex items-center justify-center h-full col-start-1 grid-row-2">Request</h2>
        <InputField label={'New'} name={'request.new'} type="number" />
        <InputField label={'Review'} name={'request.review'} type="number" />
        <InputField label={'In progress'} name={'request.inProgress'} type="number" />
        <InputField label={'In testing'} name={'request.inTesting'} type="number" />
        <InputField label={'RFD'} name={'request.rfd'} type="number" />
        <InputField label={'Done'} name={'request.done'} type="number" />
        <h2 className="flex items-center justify-center h-full col-start-1 grid-row-2">Bug</h2>
        <InputField label={'In progress'} name={'bug.inProgress'} type="number" />
        <InputField label={'In testing'} name={'bug.inTesting'} type="number" />
        <InputField label={'Review'} name={'bug.review'} type="number" />
        <InputField label={'Closed'} name={'bug.closed'} type="number" />
        <InputField label={'RFD'} name={'bug.rfd'} type="number" />
        <InputField label={'On hold'} name={'bug.onHold'} type="number" />
        <InputField label={'Accepted'} name={'bug.accepted'} type="number" />
        <button type="submit" className="h-12 col-start-9 text-white uppercase rounded-lg bg-lime-700">
          {sprint ? 'edytuj' : 'dodaj'}
        </button>
      </div>
    </ReactFormProvider>
  );
};

export default SprintForm;
