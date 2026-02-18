import app from '../server/server.ts';

// Wrap the exported app in a safe handler so invocation errors are logged
// and return a proper 500 instead of crashing the function.
export default async function handler(req: any, res: any) {
	try {
		return (app as any)(req, res);
	} catch (err) {
		console.error('Serverless function invocation error:', (err && (err as any).stack) || err);
		try {
			if (!res.headersSent) res.statusCode = 500;
			res.end('Internal Server Error');
		} catch {}
	}
}


