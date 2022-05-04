import { configureQueryClient } from '@graasp/query-client';
import { API_HOST } from './constants';
import notifier from './notifier';

const {
  queryClient,
  QueryClientProvider,
  hooks,
  useMutation,
  ReactQueryDevtools,
  API_ROUTES,
} = configureQueryClient({
  API_HOST,
  enableWebsocket: true,
  keepPreviousData: true,
  // avoid refetching when same data are closely fetched
  staleTime: 1000, // ms
  notifier,
});

export {
  queryClient,
  QueryClientProvider,
  hooks,
  useMutation,
  ReactQueryDevtools,
  API_ROUTES,
};
