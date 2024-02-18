import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header/Header';
import { authOptions } from './api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
export default async function Home() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/login');
	}

	return (
		<div className="min-h-screen mx-auto px-5 flex flex-col">
			<Header auth={true} />
			<div className="w-full max-w-7xl  flex flex-grow items-center justify-center">
				<span className="text-white text-4xl">Sign in Page</span>
			</div>
		</div>
	);
}
