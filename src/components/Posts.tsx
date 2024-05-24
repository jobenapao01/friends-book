'use client';

import { useAction } from 'next-safe-action/hooks';
import { CardHeaderMotion, CardMotion, CardTitle } from './ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { useGetPosts } from '@/data/getPosts';
import Image from 'next/image';

const Posts = () => {
	const { data: posts, error: postError } = useGetPosts();
	if (postError) return postError.message;

	if (posts?.success) {
		return (
			<CardMotion
				layout
				className='flex flex-col mt-6 p-4 font-medium shadow-md mx-auto'
			>
				<CardHeaderMotion layout>
					<CardTitle className='text-sky-600 mx-auto'>News Feed</CardTitle>
				</CardHeaderMotion>

				<AnimatePresence presenceAffectsLayout>
					{posts?.success.map((post) => (
						<motion.div
							key={post.id}
							layout
							className='mx-auto my-2 p-4 shadow-lg w-1/2 flex-shrink h-fit border-2 border-secondary rounded-md flex flex-col gap-4'
							animate={{ opacity: 1 }}
							initial={{ opacity: 0 }}
							exit={{ opacity: 0 }}
						>
							<div className='flex gap-2 items-center'>
								<Image
									src={post.user.image!}
									alt={post.user.name!}
									width={24}
									height={24}
								/>
								<h2 className='text-sm font-bold text-sky-600'>{post.user.name}</h2>
								<div className='items-center justify-center flex cursor-pointer'>...</div>
							</div>
							<p className='text-primary'>{post.content}</p>
						</motion.div>
					))}
				</AnimatePresence>
			</CardMotion>
		);
	}
};

export default Posts;
