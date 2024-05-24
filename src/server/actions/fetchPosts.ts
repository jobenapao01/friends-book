'use server';

import prisma from '@/lib/db';
import { formSchema } from '@/lib/formSchema';
import * as z from 'zod';
import { revalidatePath } from 'next/cache';
import { auth } from '../auth';
import { createSafeActionClient } from 'next-safe-action';
import { error } from 'console';

export const fetchPosts = async () => {
	const posts = await prisma.post.findMany({
		include: {
			user: true,
			likes: true,
		},
		orderBy: {
			timestamp: 'desc',
		},
	});

	if (!posts) return { error: 'No posts' };
	if (posts) return { success: posts };
};
