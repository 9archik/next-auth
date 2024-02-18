'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';

type HeaderProps = {
	auth: boolean
}

const Header: React.FC<HeaderProps>= ({auth}) => {

	const router = useRouter();

	const onExitButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
		const res = await signOut({ redirect: false });
		router.push('/login');
	};

	return (
		<header className="w-full max-w-7xl flex gap-10 justify-center py-5 text-white">
			{auth ? (
				<button className="bg-transparent" onClick={onExitButton}>
					Exit
				</button>
			) : (
				<>
				<Link href="/login">Login</Link>
				<Link href="/register">Register</Link>
				</>
				
			)}
		</header>
	);
};

export default Header;
