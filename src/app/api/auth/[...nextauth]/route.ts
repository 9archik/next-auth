import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsIsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';

type Credentionals = {
	name: string;
	password: string;
};

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
		updateAge: 7 * 24 * 60 * 1000,
	},
	providers: [
		CredentialsIsProvider({
			type: 'credentials',
			credentials: {},
			async authorize(credentials, req) {
				const { name, password } = credentials as Credentionals;

				const user = await prisma.user.findFirst({
					where: {
						name: name,
					},
				});

				if (user && user.password === password) {
					return { name: user.name, id: `${user.id}` };
				} else {
					throw new Error();
				}
			},
		}),
		CredentialsIsProvider({
			type: 'credentials',
			id: 'Registration',
			name: 'Registration',
			credentials: {},
			async authorize(credentials, req) {
				const { name, password } = credentials as Credentionals;

				console.log(name, password);

				const user = await prisma.user.create({
					data: {
						name: name,
						password: password,
					},
				});

				if (user) {
					return { name: user.name, id: `${user.id}` };
				} else {
					throw new Error('');
				}
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			// Добавьте пользовательские данные в токен
			if (user) {
				token.id = user.id;
				token.name = user.name;
				// Добавьте другие пользовательские данные, если они нужны
			}
			return token;
		},
		async session({ session, token, user }) {
			if (session && session.user) {
				session.user.name = token.name;
				session.user.id = `${token.id}`;
			}
			return session;
		},
	},

	pages: {
		signIn: '/auth/signin/',
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
