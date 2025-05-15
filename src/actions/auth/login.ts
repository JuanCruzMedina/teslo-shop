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