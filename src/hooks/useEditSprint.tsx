'use client';

import { type UseMutateFunction, useQueryClient, useMutation } from '@tanstack/react-query';
import { editSprintData } from '@/api/dataProvider';
import { type Sprint } from '@/models/Sprint';

const useEditSprint = (): {
  mutate: UseMutateFunction<Sprint, unknown, Sprint, unknown>;
  isSuccess: boolean;
} => {
  const queryClient = useQueryClient();
  const { mutate, isSuccess } = useMutation((data: Sprint) => editSprintData(data), {
    onSuccess: async () => {
      await queryClient.invalidateQueries([0, 15]);
      console.log('success');
    },
  });

  return { mutate, isSuccess };
};

export default useEditSprint;
