import { type PipelineStage } from 'mongoose';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  type PaginationResponseAggregate,
  type PaginationResponse,
} from '@/models/mongo/Mongo';

export const queryPagination = (page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE): PipelineStage[] => {
  return [
    {
      $facet: {
        stage1: [
          {
            $group: {
              _id: null,
              count: {
                $sum: 1,
              },
            },
          },
        ],
        stage2: [
          { $sort: { start: -1 } },
          {
            $skip: Number(page) * Number(pageSize),
          },
          {
            $limit: Number(pageSize),
          },
        ],
      },
    },
    {
      $unwind: {
        path: '$stage1',
      },
    },
    {
      $project: {
        total: '$stage1.count',
        data: '$stage2',
      },
    },
  ];
};

export const paginationResponse = <T>(
  resp: PaginationResponseAggregate<T>[],
  page: number,
  pageSize: number
): PaginationResponse<T[]> => {
  const [{ total = 0, data = [] } = { total: 0, data: [] }] = resp;
  return {
    total,
    page,
    pageSize,
    data,
  };
};
