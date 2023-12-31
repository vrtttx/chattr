'use client';

import { FC, useState } from 'react';
import { useSession } from 'next-auth/react';

import { FullMessageType } from '@/app/types';

import { format } from 'date-fns';
import clsx from 'clsx';
import Image from 'next/image';

import ImageModal from './ImageModal';
import Avatar from '@/app/components/Avatar';

interface MessageBoxProps {
	data: FullMessageType;
	isLast?: boolean;
}

const MessageBox: FC<MessageBoxProps> = ({ data, isLast }) => {
	const session = useSession();

	const [imageModalOpen, setImageModalOpen] = useState(false);

	const isOwn = session?.data?.user?.email === data?.sender?.email;

	const seenList = (data.seen || [])
		.filter((user) => user.email !== data?.sender?.email)
		.map((user) => user.name)
		.join(', ');

	const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');
	const avatar = clsx(isOwn && 'order-2');
	const body = clsx('flex flex-col gap-2', isOwn && 'items-end');
	const message = clsx(
		'w-fit max-w-md text-sm overflow-hidden',
		isOwn ? 'text-white bg-[#5e367d]' : 'bg-[#fff1f2] text-[#5e367d]',
		data.image ? 'p-0 rounded-md' : 'px-3 py-2 rounded-md'
	);

	return (
		<div className={container}>
			<div className={avatar}>
				<Avatar user={data.sender} />
			</div>
			<div className={body}>
				<div className={message}>
					<ImageModal
						src={data.image}
						isOpen={imageModalOpen}
						onClose={() => setImageModalOpen(false)}
					/>
					{data.image ? (
						<Image
							src={data.image}
							width="288"
							height="288"
							className="object-cover cursor-pointer translate transition hover:scale-105"
							alt="Image"
							onClick={() => setImageModalOpen(true)}
						/>
					) : (
						<div>{data.body}</div>
					)}
				</div>
				<div className="flex items-center gap-2">
					<div className="text-sm text-gray-500"> {data.sender.name}</div>
					<div className="text-xs text-gray-400">
						{format(new Date(data.createdAt), 'p')}
					</div>
				</div>
				{isLast && isOwn && seenList.length > 0 && (
					<div className="font-light text-xs text-gray-500">{`Seen by ${seenList}`}</div>
				)}
			</div>
		</div>
	);
};

export default MessageBox;

// 					{data.image ? (
// 						<Image
// 							src={data.image}
// 							width="288"
// 							height="288"
// 							className="object-cover cursor-pointer translate transition hover:scale-110"
// 							alt="Image"
// 							onClick={() => setImageModalOpen(true)}
// 						/>
// 					) : (
// 						<div>{data.body}</div>
// 					)}
// 				</div>
// 				{isLast && isOwn && seenList.length > 0 && (
// 					<div className="font-light text-xs text-gray-500">{`Seen by ${seenList}`}</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default MessageBox;
