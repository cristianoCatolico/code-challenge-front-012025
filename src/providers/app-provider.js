import { RoutingProvider } from './routing-provider';
import { ReactQueryProvider } from './react-query-provider';

export function AppProvider() {
  return (
    <ReactQueryProvider>
      <RoutingProvider />
    </ReactQueryProvider>
  );
}