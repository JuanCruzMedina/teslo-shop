'use server';


import { signIn } from '@/auth.config';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch {
        return "Invalid credentials.";
    }
}