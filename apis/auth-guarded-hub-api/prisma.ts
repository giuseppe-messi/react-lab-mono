import { PrismaClient } from "@prisma/client";

// cache across dev hot-reloads and serverless invocations
const g = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  g.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"]
  });

// only assign in dev to avoid leaking in prod VM snapshots
if (process.env.NODE_ENV === "development") g.prisma = prisma;

// NOTE: Do NOT call prisma.$disconnect() in handlers — we want reuse.
