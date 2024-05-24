import PostForm from '@/components/PostForm';
import { SignIn } from '@/components/Sign-in';
import { auth } from '@/server/auth';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

export default async function Home() {
	return (
		<main>
			<PostForm />
		</main>
	);
}
