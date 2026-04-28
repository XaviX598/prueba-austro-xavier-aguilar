import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { UsersLocalProvider } from '../context/UsersLocalContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
      refetchOnReconnect: true,
    },
  },
});

export const AppProviders = ({ children }: PropsWithChildren) => (
  <SafeAreaProvider>
    <QueryClientProvider client={queryClient}>
      <UsersLocalProvider>{children}</UsersLocalProvider>
    </QueryClientProvider>
  </SafeAreaProvider>
);
