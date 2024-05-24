import { fetchPosts } from '@/server/actions/fetchPosts';
import { useQuery } from '@tanstack/react-query';

export const useGetPosts = () => {
	return useQuery({
		queryKey: ['posts'],
		queryFn: async () => fetchPosts(),
	});
};
