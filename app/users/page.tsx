'use client';

import { signOut } from 'next-auth/react';

const Users = () => {
	return <button onClick={() => signOut()}>Logout</button>;
};

export default Users;

// import EmptyState from '@/app/components/EmptyState';

// const Users = () => {
// 	return (
// 		<div className="hidden h-full lg:block lg:pl-80">
// 			<EmptyState />
// 		</div>
// 	);
// };

// export default Users;
