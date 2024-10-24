import axios, { AxiosResponse } from "axios";
import { AppConfig } from "../Config";

export const SignInAction = async (
  email: string,
  password: string,
  userType: string
) => {
  return axios
    .post(`${AppConfig.serverUrl}/signin`, { email, password, userType })
    .then((res: AxiosResponse) => {
      console.log(res);
      if (res.data.result === "Success") {
        localStorage.setItem("token", res.data.token);
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    })
    .catch((err: Error) => {
      return Promise.reject();
    });
};

export const SignUpAction = async (
  email: string,
  password: string,
  userType: string
) => {
  return axios
    .post(`${AppConfig.serverUrl}/signup`, { email, password, userType })
    .then((res: AxiosResponse) => {
      console.log(res);
      if (res.data.result === "Success") {
        Promise.resolve();
      } else {
        Promise.reject();
      }
    })
    .catch((err: Error) => {});
};

export const GetAllUsers = async () => {
  return axios
    .post(`${AppConfig.serverUrl}/getallusers`)
    .then((res: AxiosResponse) => {
      console.log(res.data.data.result.rows);
      return Promise.resolve(res.data.data.result.rows);
    })
    .catch((err: Error) => {
      return Promise.reject();
    });
};

export const DeleteUser = async (email: string, password: string, userType: string) => {
    return axios
      .post(`${AppConfig.serverUrl}/deleteuser`, {email, password, userType})
      .then((res: AxiosResponse) => {
        return Promise.resolve();
      })
      .catch((err: Error) => {
        return Promise.reject();
      });
  };
  