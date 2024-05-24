'use client';

import { formSchema } from '@/lib/formSchema';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { createPost } from '@/server/actions/createPost';

const PostForm = () => {
	// define form schema
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: '',
		},
	});

	//server action function and checking
	const { execute, status } = useAction(createPost, {
		onSuccess(data) {
			if (data?.error) console.log(data.error);
			if (data?.success) console.log(data.success);
		},
		onExecute(data) {
			console.log('creating post...');
		},
	});

	//handle submit form functionality
	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		execute(values);
		form.reset();
	};

	return (
		<main>
			<Form {...form}>
				<form
					className='space-y-4'
					onSubmit={form.handleSubmit(handleSubmit)}
				>
					<FormField
						control={form.control}
						name='content'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="What's in your mind"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button
						disabled={status === 'executing'}
						className='w-full bg-sky-600 hover:bg-sky-700'
						type='submit'
					>
						Post
					</Button>
				</form>
			</Form>
		</main>
	);
};

export default PostForm;
