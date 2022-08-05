import { PaginationRequest } from "@/models/mongo/Mongo";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import { getAllSprints } from "../dataProvider";



const useGetSprints = () => {
  const [pagination, setPagination] = useState<PaginationRequest | null>(null);

  const updatePagination = useCallback((data: PaginationRequest) => {
    return setPagination((prevdata) => {
      return { ...prevdata, ...data };
    });
  }, []);

  const { data } = useQuery(
    [
      pagination?.page,
      pagination?.sortBy,
      pagination?.pageSize,
      pagination?.sortDir,
    ],
    () => getAllSprints(pagination)
  );
  return { data, updatePagination, pagination };
};

export default useGetSprints;
