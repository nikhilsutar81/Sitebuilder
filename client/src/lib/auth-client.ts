import { createAuthClient } from "better-auth/react"

const baseURL = import.meta.env.VITE_BASEURL;

if (typeof window !== 'undefined') {
    console.log('[Auth Client] Base URL:', baseURL || '(not set - will use localhost:3000)');
    if (!baseURL) {
        console.warn('[Auth Client] ⚠️ VITE_BASEURL environment variable is NOT set. Sign-up will fail in production!');
    }
}

export const authClient = createAuthClient({
    baseURL: baseURL || 'http://localhost:3000',
    fetchOptions: {credentials: 'include'},
})

export const { signIn, signUp, useSession } = authClient;