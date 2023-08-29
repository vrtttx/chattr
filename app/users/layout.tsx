import getUsers from '@/app/actions/getUsers';

import Sidebar from '@/app/components/sidebar/Siderbar';
// import UserList from '@/app/components/UserList';

export default async function UsersLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const users = await getUsers();

	return (
		<Sidebar>
			<div className="h-full">
				{/* <UserList items={users} /> */}
				{children}
			</div>
		</Sidebar>
	);
}
