'use client';

import useConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoutes';

import MobileItem from './MobileItem';
import Image from 'next/image';

const MobileFooter = () => {
	const routes = useRoutes();

	const { isOpen } = useConversation();

	if (isOpen) return null;

	return (
		<div className="w-full flex items-center justify-between fixed bottom-0 border-t-[1px] bg-[#5e367d] z-40 lg:hidden">
			{routes.map((item) => (
				<MobileItem
					key={item.label}
					href={item.href}
					icon={item.icon}
					active={item.active}
					onClick={item.onClick}
				/>
			))}
		</div>
	);
};

export default MobileFooter;
