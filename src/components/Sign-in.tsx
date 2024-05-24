import { signIn } from '@/server/auth';

export function SignIn() {
	return (
		<form
			action={async () => {
				'use server';
				await signIn('github');
			}}
			className='bg-white'
		>
			<button type='submit'>Signin with GitHub</button>
		</form>
	);
}
