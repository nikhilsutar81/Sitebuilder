import { useParams } from "react-router-dom"
import { AuthView } from "@daveyplate/better-auth-ui"
import { useEffect } from "react"

export default function AuthPage() {
  const { pathname } = useParams()

  useEffect(() => {
    console.log('[AuthPage] Mounted with pathname:', pathname);
    
    // Intercept fetch to log auth requests
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const url = args[0]?.toString?.() || '';
      if (url.includes('/auth')) {
        console.log('[AuthPage] Fetching:', url, args[1]);
      }
      return originalFetch.apply(this, args as any).then((response) => {
        if (url.includes('/auth')) {
          console.log('[AuthPage] Response:', url, response.status, response.ok);
        }
        return response;
      }).catch((error) => {
        if (url.includes('/auth')) {
          console.error('[AuthPage] Fetch error:', url, error);
        }
        throw error;
      });
    };
  }, [pathname])

  return (
    <main className="p-6 flex flex-col justify-center items-center h-[80vh]">
      <AuthView pathname={pathname} classNames={{base: 'bg-black/10 ring ring-indigo-900'}} />
    </main>
  )
}