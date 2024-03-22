import { configureQueryClient } from '@graasp/query-client';

import { API_HOST, DOMAIN } from './env';
import notifier from './notifier';

const {
  queryClient,
  QueryClientProvider,
  hooks,
  ReactQueryDevtools,
  mutations,
  axios,
  useQuery,
  useQueryClient,
} = configureQueryClient({
  API_HOST,
  defaultQueryOptions: {
    keepPreviousData: true,
  },
  notifier,
  DOMAIN,
});

export {
  queryClient,
  mutations,
  useQuery,
  QueryClientProvider,
  useQueryClient,
  hooks,
  ReactQueryDevtools,
  axios,
};
