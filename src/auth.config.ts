import bcryptjs from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';



export const authConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account',
    },

    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            // const isLoggedIn = !!auth?.user;
            // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            // if (isOnDashboard) {
            //     if (isLoggedIn) return true;
            //     return false; // Redirect unauthenticated users to login page
            // } else if (isLoggedIn) {
            //     return Response.redirect(new URL('/dashboard', nextUrl));
            // }
            return true;
        },
        jwt({ token, user }) {

            if (user) {
                token.data = user;
            }
            return token;
        },
        session({ session, token, user }) {
            session.user = token.data;
            return session;
        }
    },
    providers: [
        Credentials({
            async authorize(credentials) {

                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) {

                    return null;
                }

                const { email: credentialsEmail, password: credentialsPassword } = parsedCredentials.data;

                const user = await prisma.user.findUnique({
                    where: { email: credentialsEmail.toLowerCase() },
                });
                if (!user) return null;

                const { password, ...userWithoutPassword } = user;
                const isValidPassword = await bcryptjs.compare(credentialsPassword, password);
                if (!isValidPassword) return null;
                return userWithoutPassword;
            }
        }),
    ]
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);