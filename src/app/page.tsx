import PostForm from '@/components/PostForm';
import Posts from '@/components/Posts';
import { SignIn } from '@/components/Sign-in';
import { fetchPosts } from '@/server/actions/fetchPosts';
import { auth } from '@/server/auth';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

export default async function Home() {
	//react query for prefetching posts
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['posts'],
		queryFn: fetchPosts,
	});
	return (
		<main>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<PostForm />
				<Posts />
			</HydrationBoundary>
		</main>
	);
}
