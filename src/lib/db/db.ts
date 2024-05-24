import { PrismaClient } from '@prisma/client';

// Extend the NodeJS global object to include a prisma property
declare global {
  var prisma: PrismaClient | undefined;
}

let db: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  db = global.prisma;
}

export default db;
