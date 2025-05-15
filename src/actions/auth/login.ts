'use server';


import { signIn } from '@/auth.config';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', {
            redirect: false,
            ...Object.fromEntries(formData.entries()),
        });
        return "Success";
    } catch (error) {
        console.error("Error during authentication", error);
        return "Invalid credentials";
    }
}

export const login = async (
    email: string, password: string
) => {
    try {
        const user = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });
        return { ok: true, user, message: "User logged in" };
    } catch (error) {
        console.error("Error during login", error);
        return {
            ok: false,
            error: "Error logging in",
        }
    }
}