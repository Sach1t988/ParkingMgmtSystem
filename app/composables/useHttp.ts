import type {
  AvailableRouterMethod,
  NitroFetchRequest,
  NitroFetchOptions,
} from 'nitropack';
import type { FetchResponse } from 'ofetch';

// This interface will be used by our new "Raw" methods
export interface ApiResponse<T> {
  data: T;
  status: number;
}

type AvailableMethods = AvailableRouterMethod<NitroFetchRequest>;
type UseHttpOptions = NitroFetchOptions<NitroFetchRequest, AvailableMethods> & {
  customToken?: string;
  authRequired?: boolean;
};

// This internal handler is the core. It ALWAYS fetches the raw response.
// The public-facing methods below will decide what to do with it.
const handler = async <T>(
  url: string | (() => string),
  method: Uppercase<AvailableMethods> = 'GET',
  body?: any,
  options: UseHttpOptions = {}
): Promise<FetchResponse<T>> => {
  const config = useRuntimeConfig();
  const resolvedUrl = typeof url === 'string' ? url : url();
  const authRequired = options.authRequired !== false;

  // We always use .raw() here to get the full response object internally.
  const response = await useNuxtApp().$customFetch.raw<T>(
    config.public.apiHost + resolvedUrl,
    {
      ...options,
      method,
      authRequired,
      body: method === 'GET' ? undefined : body,
    }
  );
  return response;
};

export const useHttp = {
  $get: async <T>(url: string | (() => string), options: UseHttpOptions = {}) => {
    const response = await handler<T>(url, 'GET', undefined, options);
    return response._data;
  },

  $post: async <T>(url: string | (() => string), body?: any, options: UseHttpOptions = {}) => {
    const response = await handler<T>(url, 'POST', body, options);
    return response._data;
  },

  $put: async <T>(url: string | (() => string), body?: any, options: UseHttpOptions = {}) => {
    const response = await handler<T>(url, 'PUT', body, options);
    return response._data;
  },

  $patch: async <T>(url: string | (() => string), body?: any, options: UseHttpOptions = {}) => {
    const response = await handler<T>(url, 'PATCH', body, options);
    return response._data;
  },

  $delete: async <T>(url: string | (() => string), options: UseHttpOptions = {}) => {
    const response = await handler<T>(url, 'DELETE', undefined, options);
    return response._data;
  },


  // --- NEW "RAW" METHODS (OPT-IN) ---
  // These methods are for when you need the status code. They await the raw
  // response and return a structured object { data, status }.

  $postRaw: async <T>(url: string | (() => string), body?: any, options: UseHttpOptions = {}) => {
    const response = await handler<T>(url, 'POST', body, options);
    return { data: response._data, status: response.status };
  },
  
};