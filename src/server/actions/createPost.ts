'use server';

import prisma from '@/lib/db';
import { formSchema } from '@/lib/formSchema';
import * as z from 'zod';
import { revalidatePath } from 'next/cache';
import { auth } from '../auth';
import { createSafeActionClient } from 'next-safe-action';

export const action = createSafeActionClient();

export const createPost = action(formSchema, async ({ content }) => {
	const session = await auth();

	if (!content || !session?.user?.id) return { error: 'Something went wrong' };

	const newPost = await prisma.post.create({
		data: {
			content,
			userId: session.user.id,
		},
	});

	revalidatePath('/');
	if (!newPost) return { error: 'Could not create post' };
	if (newPost) return { success: 'Post Created' };
});
