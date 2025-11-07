const { PrismaClient } = require('@prisma/client');

const prismaClientSingleton = () => {
  // Validate that DATABASE_URL is present
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  const databaseUrl = process.env.DATABASE_URL;
  const url = new URL(databaseUrl);

  if (process.env.NODE_ENV === 'development') {
    console.log(` Database connection: ${url.protocol}//${url.hostname}:${url.port || '3306'}`);
    console.log(`🔒 SSL Mode: ${url.searchParams.get('sslmode') || 'not specified'}`);
  }

  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'info', 'warn', 'error']
        : ['error', 'warn'],
  });
};

// Prevent multiple instances during hot reloads in dev
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

module.exports = prisma;
