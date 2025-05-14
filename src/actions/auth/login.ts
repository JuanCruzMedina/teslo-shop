'use server';


import { signIn } from '@/auth.config';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        console.log('formData', formData); //TODO: remove
        await signIn('credentials', formData);
    } catch (error) {
        // console.error('Authentication error:', error); //TODO: remove
        return "Invalid credentials.";
    }
}