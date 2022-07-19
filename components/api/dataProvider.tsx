import { Sprint } from "@/models/Sprint";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "./",
  timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
});

const config: AxiosRequestConfig = {
  baseURL: "./",
  timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
};
const axiosInstance = axios.create(config);

export const sendSprintData = async (data: Sprint): Promise<Sprint> => {
  const resp = await axiosInstance.put<Sprint>("./api/mongo/sprint", data);
  return resp.data;
};
export const getAllSprints = async (): Promise<Array<Sprint>> => {
  const resp = await axiosInstance.get<Array<Sprint>>("./api/mongo/sprint");
  return resp.data;
};
