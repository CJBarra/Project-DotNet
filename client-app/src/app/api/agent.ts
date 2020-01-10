import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/activity";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/User";

// set default baseURL 'http://localhost:5000/'
axios.defaults.baseURL = "http://localhost:5000/api";

// TODO: Intercept response from server for Errors
axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(undefined, err => {
  if (err.message === "Network Error" && !err.response) {
    toast.error("Network error");
  }
  const { status, data, config } = err.response;

  if (status === 404) {
    history.push("/notfound");
  }
  // console.log(err.response);
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Server Error -  check terminal!");
  }
  throw err.response;
});

const responseBody = (response: AxiosResponse) => response.data;

//-------- Development purposes ONLY
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve =>
    setTimeout(() => resolve(response), ms)
  );

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

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post("/user/login", user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post("/user/register", user)
};

export default {
  Activities,
  User
};
