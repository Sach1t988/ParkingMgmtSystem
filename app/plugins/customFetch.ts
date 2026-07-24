import {parseURL} from 'ufo';

import type {Pinia} from "pinia";
import { useAuthStore } from '~/store/auth';

export default defineNuxtPlugin({
  name: 'customFetch',
  parallel: true,
  setup(nuxtApp) {
    const _pinia = nuxtApp.$pinia as Pinia;

    const $customFetch = $fetch.create({
      onRequest({ request, options }) {
        const headers: HeadersInit = {};
        const token = options.customToken || localStorage.getItem('authorization');
        if (token && options.authRequired) {
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`
          };
        }
        options.headers = { ...options.headers, ...headers };
      },
      // onResponse({ response }) {
      //   console.log('Response URL:', response);
      //   const parsedUrl = parseURL(response.url);
      //   const url = parsedUrl.pathname.split('/');
      // },
      async onResponseError({ response, error }) {
        const status = response.status;
        const code = response._data
          ? response._data.code
            ? response._data.code.toLowerCase()
            : error?.name
          : error?.name;

        if (status === 401) {
          // logout function call here
          useAuthStore().logout();
          useRouter().push('/');
        }
      },
    });
    // Expose to useNuxtApp().$customFetch
    return {
      provide: {
        customFetch: $customFetch,
      },
    };
  },
});
