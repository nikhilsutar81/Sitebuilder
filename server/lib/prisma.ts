import "dotenv/config";
import { PrismaClient } from "@prisma/client";

// Safe Prisma client initialization for serverless/Vercel builds.
// If the generated Prisma client is missing (PrismaClientInitializationError),
// we catch the error and export a proxy that throws on use. This prevents
// the serverless function from crashing at module import time while making
// the error obvious when DB access is attempted.

declare global {
	// eslint-disable-next-line no-var
	var __prismaClient: PrismaClient | undefined;
}

let prisma: PrismaClient;
try {
	if (!(global as any).__prismaClient) {
		(global as any).__prismaClient = new PrismaClient();
	}
	prisma = (global as any).__prismaClient;
} catch (err) {
	console.error('Prisma initialization failed:', err);
	// Export a proxy that throws a clear error when any property is accessed
	const proxy = new Proxy({}, {
		get() {
			throw new Error('Prisma client is not available. Run `prisma generate` during build.');
		},
		apply() {
			throw new Error('Prisma client is not available. Run `prisma generate` during build.');
		}
	}) as unknown as PrismaClient;
	prisma = proxy;
}

export default prisma;
