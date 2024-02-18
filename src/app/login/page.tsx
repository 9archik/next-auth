import Form from '../../components/Form/Form';
import { Metadata, NextPage } from 'next';
import Header from '@/components/Header/Header';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

const Page: NextPage = async (req, res) => {
	const session = await getServerSession(authOptions);

	

	if (session) {
		redirect('/');
	}

	return (
		<div className="min-h-screen mx-auto px-5 flex flex-col">
			<Header auth={false}/>
			<div className="w-full max-w-7xl px-5 mx-auto flex flex-col flex-grow items-center justify-center text-white">
				<div className="mb-5 text-4xl">Login page</div>
				<Form />
			</div>
		</div>
	);
};

export default Page;
