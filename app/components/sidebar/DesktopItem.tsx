'use client';

import { FC } from 'react';

import Link from 'next/link';
import clsx from 'clsx';

interface DesktopItemProps {
	label: string;
	href: string;
	icon: any;
	active?: boolean;
	onClick?: () => void;
}

const DesktopItem: FC<DesktopItemProps> = ({
	label,
	href,
	icon: Icon,
	active,
	onClick,
}) => {
	const handleClick = () => {
		if (onClick) return onClick();
	};

	return (
		<li onClick={handleClick}>
			<Link
				href={href}
				className={clsx(
					'group flex gap-x-3 p-3 font-semibold text-sm leading-6 text-[#bf92e5] rounded-md transition hover:text-[#5e367d] hover:bg-[#bf92e5]',
					active && 'text-[#bf92e5] bg-[#fff1f2]'
				)}
			>
				<Icon className="w-7 h-7 shrink-0" />
				<span className="sr-only">{label}</span>
			</Link>
		</li>
	);
};

export default DesktopItem;
