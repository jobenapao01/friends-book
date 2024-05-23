import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { NextAuthConfig } from 'next-auth';
import Github from 'next-auth/providers/github';
import prisma from '@/lib/db';

export const authConfig = {
	adapter: PrismaAdapter(prisma),
	providers: [
		Github({
			clientId: process.env.AUTH_GITHUB_ID,
			clientSecret: process.env.AUTH_GITHUB_SECRET,
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (session.user && token.sub) {
				session.user.id = token.sub;
			}

			if (session.user) {
				session.user.name = token.name;
				session.user.email = token.email;
			}
			return session;
		},

		async jwt({ token }) {
			if (!token.sub) return token;
			return token;
		},

		redirect() {
			return '/';
		},
	},
	session: {
		strategy: 'jwt',
	},
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
