import { createAuthClient } from "better-auth/react"

const baseURL = import.meta.env.VITE_BASEURL;

console.log('[Auth Client] Base URL:', baseURL);
console.log('[Auth Client] Environment:', import.meta.env.MODE);

if (!baseURL) {
    console.warn('[Auth Client] ⚠️ VITE_BASEURL is not set! Auth will not work in production.');
}

export const authClient = createAuthClient({
    baseURL: baseURL || 'http://localhost:3000',
    fetchOptions: {credentials: 'include'},
    plugins: [
        {
            id: 'debug',
            onRequest: async ({ request, options }) => {
                console.log('[Auth Request]', request.url, request.method);
                return { request, options };
            },
            onSuccess: async ({ data }) => {
                console.log('[Auth Success]', data);
                return { data };
            },
            onError: async ({ error }) => {
                console.error('[Auth Error]', error);
                return { error };
            },
        },
    ]
})

export const { signIn, signUp, useSession } = authClient;