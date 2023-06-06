import axios from "axios";
import { ACCESS_TOKEN_KEY } from "../utils/constants";
import Cookies from "js-cookie";

export const BASE_URL = 'https://api-training.hrm.div4.pgtest.co/api/v1';

export const getAPI = async (url?: string) => {
  try {
    const res = await axios.get(BASE_URL+url , {headers: {Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` }})
    return res
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const postAPI = async(url: string , data: any) => {
  try {
    const res = await axios.post(BASE_URL+url , data,{headers: {Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` }})
    return res
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export const postAPIFormdata = async(url: string , formData: FormData) => {
  try {
    const res = await axios.post(BASE_URL+url , formData , {headers: {Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` }})
    return res
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export const postAPIForgot = async(url: string , data: any) => {
  try {
    const res = await axios.post(BASE_URL+url , data)
    return res
  } catch (error) {
    console.log(error);
    throw error;
  }
}