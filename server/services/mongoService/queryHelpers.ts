import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PaginationResponse, PaginationResponseAggregate } from '@/models/mongo/Mongo';
import { PipelineStage } from 'mongoose';

// interface AggrSort {
//   $sort: {
//     [key: string]: -1 | 1;
//   };
// }
// interface DateRangeSearch {
//   $and: [EndDateSearch, StarDateSearch] | [] | [EndDateSearch] | [StarDateSearch];
// }

// enum DateProps {
//   SERVER = 'serverDate',
//   CREATED = 'createdAt',
// }

// type StarDateSearch = {
//   [key in DateProps]?: {
//     $gte: Date;
//   };
// };
// type EndDateSearch = {
//   [key in DateProps]?: {
//     $lte: Date;
//   };
// };

// export const setSortObj = (
//   param: Pick<SearchParams, "sortBy" | "sortDir">
// ): AggrSort => {
//   const { sortBy = "nr", sortDir = 1 } = param || {
//     sortBy: "serverDate",
//     sortDir: 1,
//   };
//   return {
//     $sort: {
//       [sortBy]: sortDir,
//     },
//   };
// };

// export const dateRangeBlock = (
//   props: Pick<SearchParams, "startDate" | "endDate">
// ): DateRangeSearch | undefined => {
//   const { startDate, endDate } = props || { startDate: null, endDate: null };

//   if (!startDate && !endDate) {
//     return;
//   }
//   const dateRangeQuery: DateRangeSearch = {
//     $and: [],
//   };

//   if (startDate) {
//     const sIso = new Date(startDate);
//     sIso.setHours(0);
//     sIso.setMinutes(0);
//     sIso.setSeconds(0);
//     sIso.setMilliseconds(0);
//     const gteObj: StarDateSearch = {
//       ["serverDate"]: {
//         $gte: sIso,
//       },
//     };
//     dateRangeQuery.$and = [...(dateRangeQuery.$and as []), gteObj];
//   }
//   if (endDate) {
//     const eIso = new Date(endDate);
//     eIso.setHours(23);
//     eIso.setMinutes(59);
//     eIso.setSeconds(59);
//     eIso.setMilliseconds(999);
//     const lteObj: EndDateSearch = {
//       ["serverDate"]: {
//         $lte: eIso,
//       },
//     };
//     dateRangeQuery.$and = [...(dateRangeQuery.$and as []), lteObj];
//   }

//   return dateRangeQuery;
// };

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
