import axios, { AxiosResponse } from 'axios';
import { AppConfig } from '../Config';

export const AssignTimeSlot = async (email: string, date: number, fromT: number, toT: number) => {
    return axios.post(`${AppConfig.serverUrl}/assigntimeslot`, {email, date, fromT, toT}).then((res: AxiosResponse) => {
        if(res.data.result === "Success") {
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    }).catch((err: Error) =>{ return Promise.reject()});
}


export const GetTimeSlot = async (email: string) => {
    return axios.post(`${AppConfig.serverUrl}/gettimeslot`, {email}).then((res: AxiosResponse) => {
        if(res.data.result === "Success") {
            return Promise.resolve(res.data.data);
        } else {
            return Promise.reject();
        }
    }).catch((err: Error) =>{ return Promise.reject()});
}