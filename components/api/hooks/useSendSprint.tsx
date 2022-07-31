import { Sprint } from "@/models/Sprint";
import React, { useState } from "react";
import { useMutation,UseMutateFunction } from "@tanstack/react-query";
import { sendSprintData } from "../dataProvider";


export const useSendSprint = ():UseMutateFunction<Sprint, unknown, Sprint, unknown> => {
  const {
    error,
    isError,
    isIdle,
    isLoading,
    isPaused,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
  } = useMutation((data: Sprint)=>sendSprintData(data));

  return mutate;
};

export default useSendSprint;
