import { Sprint } from "@/models/Sprint";
import { useMutation,UseMutateFunction } from "@tanstack/react-query";
import { sendSprintData } from "../dataProvider";


export const useSendSprint = ():UseMutateFunction<Sprint, unknown, Sprint, unknown> => {
  const {
    mutate,
  } = useMutation((data: Sprint)=>sendSprintData(data));

  return mutate;
};

export default useSendSprint;
