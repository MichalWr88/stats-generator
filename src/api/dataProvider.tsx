import axios, { type AxiosRequestConfig } from 'axios';
import { type RequestGetConfigType, type AppConfigResponse } from '@/models/AppConfig';
import { type Sprint, type ResponsSprint } from '@/models/Sprint';
import {
  type PaginationRequest,
  type PaginationResponseAggregate,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '@/models/mongo/Mongo';

const config: AxiosRequestConfig = {
  baseURL: './',
  timeout: 60000,
  //   headers: { "X-Custom-Header": "foobar" },
};
const axiosInstance = axios.create(config);

export const sendSprintData = async (data: Sprint): Promise<Sprint> => {
  const resp = await axiosInstance.post<Sprint>('./api/mongo/sprint', data);
  return resp.data;
};
export const editSprintData = async (data: Sprint): Promise<Sprint> => {
  const resp = await axiosInstance.put<Sprint>('./api/mongo/sprint', data);
  return resp.data;
};
export const getAllSprints = async (
  pagination?: PaginationRequest | null
): Promise<PaginationResponseAggregate<ResponsSprint>> => {
  const resp = await axiosInstance.get<PaginationResponseAggregate<ResponsSprint>>('/api/mongo/sprints', {
    params: pagination ?? {
      page: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
    },
  });
  return resp.data;
};
export const downloadIssuesCSV = async (id: number) => {
  const resp = await axiosInstance.get<BlobPart>(`/api/mongo/report/${id}`, {
    responseType: 'blob',
  });
  return resp.data;
};
export const downloadAllSprintsCSV = async () => {
  const resp = await axiosInstance.get<BlobPart>('/api/mongo/report', {
    responseType: 'blob',
  });
  return resp.data;
};
export const getAppConfig = async (type: RequestGetConfigType): Promise<Array<AppConfigResponse>> => {
  const resp = await axiosInstance.get<Array<AppConfigResponse>>('/api/mongo/config', {
    params: { type },
  });
  return resp.data.sort((a, b) => a.type.localeCompare(b.type));
};
