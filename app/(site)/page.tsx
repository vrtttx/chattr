import Image from 'next/image';
import AuthForm from './components/AuthForm';

export default function Home() {
	return (
		<div className="min-h-full flex flex-col justify-center py-12 bg-gradient-to-br from-[#bf92e5] to-[#5e367d] sm:px-6 lg:px-8">
			<div className="sm:w-full sm:max-w-md sm:mx-auto">
				<div className="flex items-center justify-center gap-3">
					<Image
						src="/assets/images/logo-icon-color.png"
						alt="Chattr Logo"
						width={58}
						height={58}
					/>
				</div>
			</div>
			<AuthForm />
			<p className="mt-8 font-light text-sm text-center text-[#fff1f2]">
				2023 @ Developed by Yann Costa e Silva
			</p>
		</div>
	);
}
