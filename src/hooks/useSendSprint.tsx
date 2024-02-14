import { type UseMutateFunction, useMutation } from '@tanstack/react-query';
import { sendSprintData } from '@/api/dataProvider';
import { type Sprint } from '@/models/Sprint';

interface MutationProps {
  mutate: UseMutateFunction<Sprint, unknown, Sprint, unknown>;
  isSuccess: boolean;
}

const useSendSprint = (): MutationProps => {
  const { mutate, isSuccess } = useMutation(['send-sprint'], (data: Sprint) => sendSprintData(data));

  return { mutate, isSuccess };
};

export default useSendSprint;
