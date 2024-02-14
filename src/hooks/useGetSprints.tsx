import { useQuery } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import { getAllSprints } from '@/api/dataProvider';
import { type PaginationRequest } from '@/models/mongo/Mongo';


const useGetSprints = () => {
  const [pagination, setPagination] = useState<PaginationRequest>({ page: 0, pageSize: 15 });

  const updatePagination = useCallback((data: PaginationRequest) => {
    return setPagination((prevdata) => {
      return { ...prevdata, ...data };
    });
  }, []);
  const { data } = useQuery([pagination?.page, pagination?.pageSize], () => getAllSprints(pagination));
  return { data, updatePagination, pagination };
};

export default useGetSprints;
