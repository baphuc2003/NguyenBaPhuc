import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface AxiosImplement {
  setAccessToken: () => void;
  get: (
    url: string,
    option?: AxiosRequestConfig<any> | undefined
  ) => Promise<AxiosResponse<any, any>>;
  post: (
    url: string,
    data: any,
    option?: AxiosRequestConfig<any> | undefined
  ) => Promise<AxiosResponse<any, any>>;
  put: (
    url: string,
    user_id: string,
    data: any,
    option?: AxiosRequestConfig<any> | undefined
  ) => Promise<AxiosResponse<any, any>>;
}

export class AxiosService {
  private axiosInstance: AxiosInstance;
  private baseUrl = "http://localhost:4000/";
  private accessToken: string = "";
  private userId: string = "";

  constructor() {
    this.axiosInstance = axios.create();
  }

  protected commonHeader() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  protected commonUserId() {
    console.log("check 38 ", {
      user_id: this.userId,
    });
    return {
      user_id: this.userId,
    };
  }

  public setAccessToken(token: string) {
    this.accessToken = token;
  }

  public setUserId(id: string) {
    this.userId = id;
  }

  public get(url: string, option?: AxiosRequestConfig<any> | undefined) {
    return this.axiosInstance.get(url, {
      baseURL: this.baseUrl,
      headers: {
        ...this.commonHeader(),
        ...this.commonUserId(),
        ...option?.headers,
      },

      ...option,
    });
  }

  public post(
    url: string,
    data: any,
    option?: AxiosRequestConfig<any> | undefined
  ) {
    return this.axiosInstance.post(url, data, { baseURL: this.baseUrl });
  }

  public put(
    url: string,
    user_id: string,
    data: any,
    option?: AxiosRequestConfig<any> | undefined
  ) {
    return this.axiosInstance.put(url, data, {
      baseURL: this.baseUrl,
      headers: {
        ...this.commonHeader(),
        ...option?.headers,
        user_id: user_id,
      },
    });
  }
}
