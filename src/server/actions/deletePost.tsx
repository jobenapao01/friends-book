'use server';

import prisma from '@/lib/db';
import { formSchema } from '@/lib/formSchema';
import * as z from 'zod';
import { revalidatePath } from 'next/cache';
import { auth } from '../auth';
import { createSafeActionClient } from 'next-safe-action';

const action = createSafeActionClient();

const deletePostSchema = z.object({
	id: z.string(),
});

export const deletePost = action(deletePostSchema, async ({ id }) => {
	try {
		await prisma.post.deleteMany({
			where: {
				id,
			},
		});

		revalidatePath('/');

		return { success: 'Post deleted' };
	} catch (error) {
		return { error: 'Something went wrong' };
	}
});
