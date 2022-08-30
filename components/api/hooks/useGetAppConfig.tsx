import { RequestGetConfigType } from '@/models/AppConfig';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { getAppConfig } from '../dataProvider';

const useGetAppConfig = () => {
  const [type, setType] = useState<RequestGetConfigType>('null');

  const updateType = useCallback((type: RequestGetConfigType) => {
    return setType(() => {
      return type;
    });
  }, []);
  const { data } = useQuery(['config', type], () => getAppConfig(type));
  return { data, updateType, type };
};

export default useGetAppConfig;
