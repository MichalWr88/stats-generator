import { ObjectId } from "mongoose";

export const DEFAULT_PAGE = 0;
export const DEFAULT_PAGE_SIZE = 12;

export interface ResponsMongo {
  _id: ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}
export interface PaginationRequest {
  page: number;
  pageSize: number;
  sortDir?: -1 | 1;
  sortBy?: string;
}
export interface PaginationResponseAggregate<T> {
  data: Array<T>;
  total: number;
}
export interface PaginationResponse<T> extends PaginationRequest {
  data: T;
  total: number;
}