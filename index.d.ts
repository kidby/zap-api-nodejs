declare namespace ZAProxy {
  /**
   * Represents the error response schema returned by ZAProxy JSON endpoints.
   */
  export interface ErrorJson {
    code: string;
    message: string;
    detail?: string;
  }
  
  /**
   * A union representing the generic response data you expect from ZAProxy.
   * (This may be a JSON object, an XML document, a plain string, or undefined.)
   */
  export type GenericZapApiResponseData =
    | { code: string; message: string; detail?: string; data?: unknown }
    | XMLDocument
    | string
    | undefined;
  
  /**
   * A catch-all Promise type for ZAProxy API endpoints.
   * Endpoints using JSON will resolve to the appropriate object,
   * while some endpoints (like requestOther) might resolve to XML or plain text.
   */
  export type ZapApiPromiseResponse<T = GenericZapApiResponseData> = Promise<T>;
  
  /**
   * Options for configuring the ZAProxy API client.
   */
  export interface ZapApiOptions {
    apiKey?: string;
    proxy?: string;
  }
  
  /**
   * Custom error class for API client errors.
   */
  export class ApiClientError extends Error {
    response?: import('axios').AxiosResponse<ErrorJson>;
    /**
     * Constructs an ApiClientError.
     * @param err The original Axios error.
     */
    constructor(err: import('axios').AxiosError<ErrorJson, Record<string, unknown>>);
  }
  
  /**
   * Main API client for ZAProxy.
   */
  export class ClientApi {
    /**
     * Creates an instance of ClientApi.
     * @param options API connection options.
     */
    constructor(options: ZapApiOptions);
    
    /**
     * Makes an API request to ZAProxy.
     * Filters out properties from the data that are undefined, null, or empty strings,
     * while preserving valid falsy values such as 0 or '0'.
     *
     * @template T The expected response type.
     * @template D The type of the request data.
     * @param url The endpoint URL.
     * @param data Optional request data.
     * @param format Optional response format ('other' for non-JSON responses).
     * @param method HTTP method (default is 'GET').
     * @returns A promise resolving with the response data of type T.
     * @throws {ApiClientError} If the request fails.
     */
    request<T = GenericZapApiResponseData, D = Record<string, unknown>>(
      url: string,
      data?: D,
      format?: 'other' | undefined,
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    ): Promise<T>;
  }
}

export = ZAProxy;
