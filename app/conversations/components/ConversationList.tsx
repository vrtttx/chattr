'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useConversation from '@/app/hooks/useConversation';

import { FullConversationType } from '@/app/types';
import { User } from '@prisma/client';

import { pusherClient } from '@/app/libs/pusher';

import clsx from 'clsx';

import { find, initial } from 'lodash';

import ConversationBox from './ConversationBox';
import GroupChatModal from './GroupChatModal';

import { MdOutlineGroupAdd } from 'react-icons/md';

interface ConversationListProps {
	users: User[];
	initialItems: FullConversationType[];
}

const ConversationList: FC<ConversationListProps> = ({
	users,
	initialItems,
}) => {
	const session = useSession();
	const router = useRouter();

	const [items, setItems] = useState(initialItems);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { conversationId, isOpen } = useConversation();

	const pusherKey = useMemo(() => {
		return session.data?.user?.email;
	}, [session.data?.user?.email]);

	useEffect(() => {
		if (!pusherKey) return;

		pusherClient.subscribe(pusherKey);

		const newHandler = (conversation: FullConversationType) => {
			setItems((current) => {
				if (find(current, { id: conversation.id })) return current;

				return [conversation, ...current];
			});
		};

		const updateHandler = (conversation: FullConversationType) => {
			setItems((current) =>
				current.map((currentConversation) => {
					if (currentConversation.id === conversation.id)
						return { ...currentConversation, messages: conversation.messages };

					return currentConversation;
				})
			);
		};

		const removeHandler = (conversation: FullConversationType) => {
			setItems((current) => {
				return [...current.filter((convo) => convo.id !== conversation.id)];
			});

			if (conversationId === conversation.id) {
				router.push('/conversations');
			}
		};

		pusherClient.bind('conversation:new', newHandler);
		pusherClient.bind('conversation:update', updateHandler);
		pusherClient.bind('conversation:remove', removeHandler);

		return () => {
			pusherClient.unsubscribe(pusherKey);
			pusherClient.unbind('conversation:new', newHandler);
			pusherClient.unbind('conversation:update', updateHandler);
			pusherClient.unbind('conversation:remove', removeHandler);
		};
	}, [pusherKey, router, conversationId]);

	return (
		<>
			<GroupChatModal
				users={users}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
			<aside
				className={clsx(
					'fixed left-0 pb-20 inset-y-0 border-r border-[#5e367d] bg-[#f8eeff] overflow-y-auto lg:w-80 lg:block lg:left-20 lg:pb-0',
					isOpen ? 'hidden' : 'w-full block left-0'
				)}
			>
				<div className="px-5">
					<div className="flex items-center justify-between py-4 mb-4 border-b-[1px] border-[#5e367d]">
						<div className="font-extrabold text-2xl text-[#5e367d]">
							Conversations
						</div>
						<div
							className="pr-1 text-[#5e367d] cursor-pointer transition hover:opacity-75"
							onClick={() => setIsModalOpen(true)}
						>
							<MdOutlineGroupAdd size={22} />
						</div>
					</div>
					{items.map((item) => (
						<ConversationBox
							key={item.id}
							data={item}
							selected={conversationId === item.id}
						/>
					))}
				</div>
			</aside>
		</>
	);
};

export default ConversationList;
