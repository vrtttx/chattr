'use client';

import { FC } from 'react';

import useActiveList from '@/app/hooks/useActiveList';

import { User } from '@prisma/client';

import Image from 'next/image';

interface AvatarProps {
	user?: User;
}

const Avatar: FC<AvatarProps> = ({ user }) => {
	const { members } = useActiveList();

	const isActive = members.indexOf(user?.email!) !== -1;

	return (
		<div className="flex items-center justify-center relative">
			<div className="w-9 h-9 inline-block relative rounded-full overflow-hidden md:w-11 md:h-11">
				<Image
					src={user?.image || '/assets/images/placeholder.jpg'}
					alt="Avatar"
					fill
				/>
			</div>
			{isActive && (
				<span className="w-2 h-2 block absolute top-0 right-0 rounded-full ring-2 ring-white bg-green-500 md:w-3 md:h-3" />
			)}
		</div>
	);
};

export default Avatar;
