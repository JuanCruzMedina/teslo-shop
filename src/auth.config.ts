import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
export const authConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account',
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                console.log('credentials', credentials); //TODO: remove
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success)
                    return null;

                const { email, password } = parsedCredentials.data;
                console.log('email', email, 'password', password);
                // TODO: check email, compare password, return user
                return null;
            }
        }),
    ]
} satisfies NextAuthConfig;

export const { signIn, signOut, auth } = NextAuth(authConfig);