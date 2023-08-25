import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import AuthContext from '@/app/context/AuthContext';
import ToasterContext from '@/app/context/ToasterContext';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Chattr | Intuitive real-time communication',
	description:
		'An intuitive messaging application that keeps you connected with ease. Enjoy seamless and instant communication with friends and family on Chattr.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthContext>
					<ToasterContext />
					{children}
				</AuthContext>
			</body>
		</html>
	);
}
