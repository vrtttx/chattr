'use client';

import { FC } from 'react';

import Link from 'next/link';
import clsx from 'clsx';

interface MobileItemProps {
	href: string;
	icon: any;
	active?: boolean;
	onClick?: () => void;
}

const MobileItem: FC<MobileItemProps> = ({
	href,
	icon: Icon,
	active,
	onClick,
}) => {
	const handleClick = () => {
		if (onClick) return onClick();
	};

	return (
		<Link
			href={href}
			className={clsx(
				'group flex gapxp3 px-8 py-4 font-semibold text-sm leading-6 text-[#bf92e5] transition hover:text-[#5e367d] hover:bg-[#bf92e5]',
				active && 'text-[#bf92e5] bg-[#fff1f2]'
			)}
			onClick={handleClick}
		>
			<Icon className="w-7 h-7" />
		</Link>
	);
};

export default MobileItem;
