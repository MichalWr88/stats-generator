import { AppConfigResponse, RequestGetConfigType } from '@/models/AppConfig';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PaginationRequest, PaginationResponseAggregate } from '@/models/mongo/Mongo';
import { ResponsSprint, Sprint } from '@/models/Sprint';
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
  const resp = await axiosInstance.get<PaginationResponseAggregate<ResponsSprint>>('./api/mongo/sprint', {
    params: pagination || {
      page: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
    },
  });
  return resp.data;
};
export const downloadIssuesCSV = async (id: number) => {
  const resp = await axiosInstance.get('./api/mongo/report', {
    params: { id },
    responseType: 'blob',
  });
  return resp.data;
};
export const getAppConfig = async (type: RequestGetConfigType): Promise<Array<AppConfigResponse>> => {
  const resp = await axiosInstance.get<Array<AppConfigResponse>>('./api/mongo/config/get', {
    params: { type },
  });
  return resp.data.sort((a, b) => a.type.localeCompare(b.type));
};
