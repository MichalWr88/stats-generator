'use client';
import { getAppConfig } from '@/api/dataProvider';
import { RequestGetConfigType } from '@/models/AppConfig';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

const useGetAppConfig = (initType: RequestGetConfigType = null) => {
  const [type, setType] = useState<RequestGetConfigType>(initType);

  const updateType = useCallback((type: RequestGetConfigType) => {
    return setType(() => {
      return type;
    });
  }, []);
  const { data } = useQuery(['config', type], () => getAppConfig(type), { staleTime: 60000 });
  return { data, updateType, type };
};

export default useGetAppConfig;
