import Image from 'next/image';

const EmptyState = () => {
	return (
		<div className="h-full flex items-center justify-center px-4 py-10 bg-gray-100 sm:px-6 lg:px-8">
			<div className="flex flex-col items-center text-center">
				<Image
					src="/assets/images/empty.png"
					alt="Empty State"
					width={180}
					height={180}
				/>
				<h3 className="mt-6 font-medium text-2xl text-[#5e367d]">
					Get the conversation rolling!
				</h3>
				<p className="font-light text-[#a287b9]">
					Choose a chat or start a new one.
				</p>
			</div>
		</div>
	);
};

export default EmptyState;
