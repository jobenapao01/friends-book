import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						//set default staletime
						//above 0 to avoid refetching immediately on the client
						staleTime: 4 * 1000,
						refetchInterval: 4 * 1000,
					},
				},
			})
	);

	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</SessionProvider>
	);
};
