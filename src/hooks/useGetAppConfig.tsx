'use client';

import { useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { getAppConfig } from "@/api/dataProvider";
import { type RequestGetConfigType } from "@/models/AppConfig";


const useGetAppConfig = (initType: RequestGetConfigType = null) => {
  const [type, setType] = useState<RequestGetConfigType>(initType);

  const updateType = useCallback((type: RequestGetConfigType) => {
    return setType(() => {
      return type;
    });
  }, []);
  const { data } = useQuery(['config', type], () => getAppConfig(type), { staleTime: 900000 });
  return { data, updateType, type };
};

export default useGetAppConfig;
