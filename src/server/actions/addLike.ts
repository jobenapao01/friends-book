'use server';

import prisma from '@/lib/db';
import { formSchema } from '@/lib/formSchema';
import * as z from 'zod';
import { revalidatePath } from 'next/cache';
import { auth } from '../auth';
import { createSafeActionClient } from 'next-safe-action';

const action = createSafeActionClient();

// define like schema
const addLikeSchema = z.object({
	postId: z.string(),
	userId: z.string(),
});

export const addLike = action(addLikeSchema, async ({ postId, userId }) => {
	const existingLike = await prisma.like.findFirst({
		where: {
			postId,
			userId,
		},
	});

	// check if post is already liked
	if (existingLike) {
		await prisma.like.deleteMany({
			where: {
				postId,
				userId,
			},
		});

		revalidatePath('/');
		return {
			success: 'Unliked',
		};
	}

	// check if post is not liked
	if (!existingLike) {
		try {
			const like = await prisma.like.create({
				data: {
					postId,
					userId,
				},
			});
			revalidatePath('/');

			return { success: like };
		} catch (error) {
			return { error: error };
		}
	}
});
