'use client';
import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
type UserInfo = {
	name: string;
	password: string;
};

const Form = () => {
	const [form, setForm] = useState<UserInfo>({
		name: '',
		password: '',
	});
	const router = useRouter();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const res = await signIn('credentials', {
			name: form.name,
			password: form.password,
			redirect: false,
		});

		if (res && !res.error) {
			router.replace('/');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
			<label className="flex flex-col gap-1">
				<span>name</span>
				<input
					className="text-black"
					onChange={({ target }) => {
						setForm({ ...form, name: target.value });
					}}
					value={form.name}
					required
				/>
			</label>
			<label className="flex flex-col gap-1">
				<span>password</span>
				<input
					onChange={({ target }) => {
						setForm({ ...form, password: target.value });
					}}
					className="text-black"
					value={form.password}
					required
				/>
			</label>

			<button className="bg-fuchsia-600 w-full border-none outline-0">Login</button>
		</form>
	);
};

export default Form;
