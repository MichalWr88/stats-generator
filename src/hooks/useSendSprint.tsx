import { sendSprintData } from '@/api/dataProvider';
import { Sprint } from '@/models/Sprint';
import { useMutation, UseMutateFunction } from '@tanstack/react-query';

interface MutationProps {
  mutate: UseMutateFunction<Sprint, unknown, Sprint, unknown>;
  isSuccess: boolean;
}

const useSendSprint = (): MutationProps => {
  const { mutate, isSuccess } = useMutation(['send-sprint'], (data: Sprint) => sendSprintData(data));

  return { mutate, isSuccess };
};

export default useSendSprint;
