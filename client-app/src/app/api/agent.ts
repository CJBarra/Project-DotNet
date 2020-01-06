import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/activity";

// set default baseURL 'http://localhost:5000/'
axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

// Requests objects for api
const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(1000))
      .then(responseBody),
  del: (url: string) =>
    axios
      .delete(url)
      .then(sleep(1000))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(1000))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(sleep(1000))
      .then(responseBody)
};

// Activities requests object for Activities feature
const Activities = {
  list: (): Promise<IActivity[]> => requests.get("/activities"),
  create: (activity: IActivity) => requests.post("/activities", activity),
  details: (id: string) => requests.get(`/activities/${id}`),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`)
};

//-------- Development purposes ONLY
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve =>
    setTimeout(() => resolve(response), ms)
  );

export default {
  Activities
};
