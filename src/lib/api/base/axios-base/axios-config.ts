import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class AxiosClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string, token: string | (() => Promise<string | null>)) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: { 'Content-Type': 'application/json' },
    });

    // set the bearer token
    this.axiosInstance.interceptors.request.use(
      async config => {
        const tokenToAttach =
          typeof token === 'function' ? await token() : token;
        if (tokenToAttach)
          config.headers['Authorization'] = `Bearer ${tokenToAttach}`;
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }

  /**
   * Sends a GET request to the specified URL.
   * @param url - The URL to send the request to.
   * @param config - Optional Axios request configuration.
   * @returns A promise resolving to the Axios response.
   */
  public async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  /**
   * Sends a POST request to the specified URL.
   * @param url - The URL to send the request to.
   * @param data - Optional data to include in the request body.
   * @param config - Optional Axios request configuration.
   * @returns A promise resolving to the Axios response.
   */
  public async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  /**
   * Sends a PUT request to the specified URL.
   * @param url - The URL to send the request to.
   * @param data - Optional data to include in the request body.
   * @param config - Optional Axios request configuration.
   * @returns A promise resolving to the Axios response.
   */
  public async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  /**
   * Sends a PATCH request to the specified URL.
   * @param url - The URL to send the request to.
   * @param data - Optional data to include in the request body.
   * @param config - Optional Axios request configuration.
   * @returns A promise resolving to the Axios response.
   */
  public async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config);
  }

  /**
   * Sends a DELETE request to the specified URL.
   * @param url - The URL to send the request to.
   * @param config - Optional Axios request configuration.
   * @returns A promise resolving to the Axios response.
   */
  public async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }
}
