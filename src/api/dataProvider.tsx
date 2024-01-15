
import { RequestGetConfigType, AppConfigResponse } from '@/models/AppConfig';
import { Sprint, ResponsSprint } from '@/models/Sprint';
import { PaginationRequest, PaginationResponseAggregate, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/models/mongo/Mongo';
import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: './',
  timeout: 60000,
  //   headers: { "X-Custom-Header": "foobar" },
};
const axiosInstance = axios.create(config);

export const sendSprintData = async (data: Sprint): Promise<Sprint> => {
  const resp = await axiosInstance.put<Sprint>('./api/mongo/sprint', data);
  return resp.data;
};
export const editSprintData = async (data: Sprint): Promise<Sprint> => {
  const resp = await axiosInstance.put<Sprint>('./api/mongo/sprint-edit', data);
  return resp.data;
};
export const getAllSprints = async (
  pagination?: PaginationRequest | null
): Promise<PaginationResponseAggregate<ResponsSprint>> => {
  const resp = await axiosInstance.get<PaginationResponseAggregate<ResponsSprint>>('/api/mongo/sprint', {
    params: pagination || {
      page: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
    },
  });
  return resp.data;
};
export const downloadIssuesCSV = async (id: number) => {
  const resp = await axiosInstance.get('/api/mongo/report', {
    params: { id },
    responseType: 'blob',
  });
  return resp.data;
};
export const downloadAllSprintsCSV = async (): Promise<string> => {
  const resp = await axiosInstance.get('/api/mongo/report-all', {
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