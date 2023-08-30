'use client';

import { FC, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useOtherUser from '@/app/hooks/useOtherUser';

import { FullConversationType } from '@/app/types';

import clsx from 'clsx';
import format from 'date-fns/format';

import Avatar from '@/app/components/Avatar';
import AvatarGroup from '@/app/components/AvatarGroup';

interface ConversationBoxProps {
	data: FullConversationType;
	selected?: boolean;
}

const ConversationBox: FC<ConversationBoxProps> = ({ data, selected }) => {
	const otherUser = useOtherUser(data);

	const session = useSession();
	const router = useRouter();

	const handleClick = useCallback(() => {
		router.push(`/conversations/${data.id}`);
	}, [data.id, router]);

	const lastMessage = useMemo(() => {
		const messages = data.messages || [];

		return messages[messages.length - 1];
	}, [data.messages]);

	const userEmail = useMemo(() => {
		return session.data?.user?.email;
	}, [session.data?.user?.email]);

	const hasSeen = useMemo(() => {
		if (!lastMessage) return false;

		const seenArray = lastMessage.seen || [];

		if (!userEmail) return false;

		return seenArray.filter((user) => user.email === userEmail).length !== 0;
	}, [userEmail, lastMessage]);

	const lastMessageText = useMemo(() => {
		if (lastMessage?.image) return 'Sent an image...';

		if (lastMessage?.body) return lastMessage.body;

		return 'Started a conversation...';
	}, [lastMessage]);

	return (
		<div
			className={clsx(
				'w-full flex items-center space-x-3 relative p-3 my-3 rounded-lg border border-[#5e367d] cursor-pointer transition hover:bg-[#f2daff]',
				selected ? 'bg-[#dbc4ed]' : 'bg-[#f8eeff]'
			)}
			onClick={handleClick}
		>
			{data.isGroup ? (
				<AvatarGroup users={data.users} />
			) : (
				<Avatar user={otherUser} />
			)}
			<div className="min-w-0 flex-1">
				<div className="focus:outline-none">
					<div className="flex items-center justify-between">
						<p className="font-medium text-md text-[#5e367d]">
							{data.name || otherUser.name}
						</p>
						{lastMessage?.createdAt && (
							<p className="font-light text-xs text-neutral-500">
								{format(new Date(lastMessage.createdAt), 'p')}
							</p>
						)}
					</div>
					<p
						className={clsx(
							'truncate text-sm',
							hasSeen ? 'text-neutral-600' : 'font-medium text-neutral-800'
						)}
					>
						{lastMessageText}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ConversationBox;
