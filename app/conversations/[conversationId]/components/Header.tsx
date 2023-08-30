'use client';

import { FC, useMemo, useState } from 'react';
import useOtherUser from '@/app/hooks/useOtherUser';
import useActiveList from '@/app/hooks/useActiveList';

import { Conversation, User } from '@prisma/client';

import Link from 'next/link';

import ProfileDrawer from './ProfileDrawer';
import Avatar from '@/app/components/Avatar';
import AvatarGroup from '@/app/components/AvatarGroup';

import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2';

interface HeaderProps {
	conversation: Conversation & { users: User[] };
}

const Header: FC<HeaderProps> = ({ conversation }) => {
	const otherUser = useOtherUser(conversation);

	const [drawerOpen, setDrawerOpen] = useState(false);

	const { members } = useActiveList();

	const isActive = members.indexOf(otherUser?.email!) !== -1;

	const statusText = useMemo(() => {
		if (conversation.isGroup) return `${conversation.users.length} members`;

		return isActive ? 'Active' : 'Offline';
	}, [conversation, isActive]);

	return (
		<>
			<ProfileDrawer
				data={conversation}
				isOpen={drawerOpen}
				onClose={() => setDrawerOpen(false)}
			/>
			<div className="w-full flex items-center justify-between px-4 py-2.5 border-b-[1px] bg-white shadow-sm sm:px-4 lg:px-6">
				<div className="flex items-center gap-3">
					<Link
						href="/conversations"
						className="block text-[#5e367d] cursor-pointer transition hover:opacity-75 lg:hidden"
					>
						<HiChevronLeft size={28} />
					</Link>
					{conversation.isGroup ? (
						<AvatarGroup users={conversation.users} />
					) : (
						<Avatar user={otherUser} />
					)}
					<div className="flex flex-col">
						<div>{conversation.name || otherUser.name}</div>
						<div className="font-light text-xs text-neutral-500">
							{statusText}
						</div>
					</div>
				</div>
				<HiEllipsisHorizontal
					size={28}
					className="text-[#5e367d] cursor-pointer transition hover:opacity-75"
					onClick={() => setDrawerOpen(true)}
				/>
			</div>
		</>
	);
};

export default Header;
