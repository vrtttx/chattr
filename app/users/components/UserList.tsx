'use client';

import { FC } from 'react';

import { User } from '@prisma/client';

import UserBox from './UserBox';

interface UserListProps {
	items: User[];
}

const UserList: FC<UserListProps> = ({ items }) => {
	return (
		<aside className="w-full block fixed left-0 pb-20 inset-y-0 border-r border-[#5e367d] bg-[#f8eeff] overflow-y-auto lg:w-80 lg:block lg:left-20 lg:pb-0">
			<div className="px-5">
				<div className="flex justify-between py-4 mb-4 border-b-[1px] border-[#5e367d]">
					<div className="font-extrabold text-2xl text-[#5e367d]">Users</div>
				</div>
				{items.map((item) => (
					<UserBox key={item.id} data={item} />
				))}
			</div>
		</aside>
	);
};

export default UserList;
