'use client';

import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import useConversation from '@/app/hooks/useConversation';

import { CldUploadButton } from 'next-cloudinary';
import axios from 'axios';

import MessageInput from './MessageInput';

import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';

const Form = () => {
	const { conversationId } = useConversation();

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: { message: '' },
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setValue('message', '', { shouldValidate: true });

		axios.post('/api/messages', { ...data, conversationId });
	};

	const handleUpload = (result: any) => {
		axios.post('/api/messages', {
			image: result?.info?.secure_url,
			conversationId,
		});
	};

	return (
		<div className="w-full flex items-center gap-2 px-4 py-4 border-t bg-white lg:gap-4">
			<form
				className="w-full flex items-center gap-2 lg:gap-4"
				onSubmit={handleSubmit(onSubmit)}
			>
				<MessageInput
					id="message"
					register={register}
					errors={errors}
					placeholder="Write your message..."
					required
				/>
				<button
					type="submit"
					className="p-2 rounded-lg bg-[#5e367d] cursor-pointer transition hover:opacity-75"
				>
					<HiPaperAirplane size={18} className="text-white" />
				</button>
			</form>
			<CldUploadButton
				options={{ maxFiles: 1 }}
				onUpload={handleUpload}
				uploadPreset="wlacernh"
			>
				<HiPhoto size={32} className="text-[#bf92e5]" />
			</CldUploadButton>
		</div>
	);
};

export default Form;
