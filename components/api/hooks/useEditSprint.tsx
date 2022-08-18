import { Sprint } from '@/models/Sprint';
import { useMutation, UseMutateFunction, useQueryClient } from '@tanstack/react-query';
import { editSprintData } from '../dataProvider';
// import { queryClient } from '../queryClient';

const useEditSprint = (): {
  mutate: UseMutateFunction<Sprint, unknown, Sprint, unknown>;
  isSuccess: boolean;
} => {
  const queryClient = useQueryClient();
  const { mutate, isSuccess } = useMutation((data: Sprint) => editSprintData(data), {
    onSuccess: () => {
      console.log('success');
      queryClient.invalidateQueries([0, 15]);
    },
  });

  return { mutate, isSuccess };
};

export default useEditSprint;
