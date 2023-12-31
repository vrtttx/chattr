'use client';

import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { User } from '@prisma/client';

import axios from 'axios';

import Avatar from '@/app/components/Avatar';
import LoadingModal from '@/app/components/LoadingModal';

interface UserBoxProps {
	data: User;
}

const UserBox: FC<UserBoxProps> = ({ data }) => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);

	const handleClick = useCallback(() => {
		setIsLoading(true);

		axios
			.post('/api/conversations', { userId: data.id })
			.then((data) => {
				router.push(`/conversations/${data.data.id}`);
			})
			.finally(() => setIsLoading(false));
	}, [data, router]);

	return (
		<>
			{isLoading && <LoadingModal />}
			<div
				className="w-full flex items-center space-x-3 relative p-3 rounded-lg bg-[#f8eeff] cursor-pointer transition hover:bg-[#f2daff]"
				onClick={handleClick}
			>
				<Avatar user={data} />
				<div className="min-w-0 flex-1">
					<div className="focus:outline-none">
						<div className="flex items-center justify-between mb-1">
							<p className="font-medium text-sm text-neutral-900">
								{data.name}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserBox;
