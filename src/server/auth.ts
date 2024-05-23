import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import prisma from '@/lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [Github],
});
