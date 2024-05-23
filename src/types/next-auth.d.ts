import NextAuth, { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: User & {
			id: string;
			email: string | null | undefined;
		};
	}
}
