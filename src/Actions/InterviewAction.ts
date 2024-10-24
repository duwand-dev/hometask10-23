import axios, { AxiosResponse } from "axios";
import { AppConfig } from "../Config";

export const AssignInterview = async (
  imail: string,
  uemail: string,
  title: string,
  date: number,
  startT: number
) => {
  return axios
    .post(`${AppConfig.serverUrl}/assigninterview`, {
      imail,
      uemail,
      title,
      date,
      startT,
    })
    .then((res: AxiosResponse) => {
      if (res.data.result === "Success") {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    })
    .catch((err: Error) => {
      return Promise.reject();
    });
};

export const GetInterview = async (email: string, type: string) => {
  return axios
    .post(`${AppConfig.serverUrl}/getinterviews`, { email, type })
    .then((res: AxiosResponse) => {
      if (res.data.result === "Success") {
        return Promise.resolve(res.data.data);
      } else {
        return Promise.reject();
      }
    })
    .catch((err: Error) => {
      return Promise.reject();
    });
};

export const GetAllInterviews = async () => {
  return axios
    .post(`${AppConfig.serverUrl}/getallinterviews`)
    .then((res: AxiosResponse) => {
      if (res.data.result === "Success") {
        return Promise.resolve(res.data.data);
      } else {
        return Promise.reject();
      }
    })
    .catch((err: Error) => {
      return Promise.reject();
    });
};

export const RejectInterview = async (
  intervieweremail: string,
  date: number,
  startT: number
) => {
  return axios
    .post(`${AppConfig.serverUrl}/rejectinterview`, { intervieweremail, date, startT  })
    .then((res: AxiosResponse) => {
      if (res.data.result == "Success") {
        return Promise.resolve(res.data.data);
      } else {
        return Promise.reject();
      }
    })
    .catch((err: Error) => {
      return Promise.reject();
    });
};
