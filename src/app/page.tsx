import { SignIn } from '@/components/Sign-in';
import { auth } from '@/server/auth';

export default async function Home() {
	const session = await auth();

	if (session) {
		console.log(session.user);
	}
	return (
		<main>
			<SignIn />
		</main>
	);
}
