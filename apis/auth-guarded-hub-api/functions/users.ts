import { z } from "zod";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // ok in Functions; or import your singleton

const CreateUser = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export default async (req: Request) => {
  // Allow GET (list) and POST (create)
  if (req.method === "GET") {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, createdAt: true },
      orderBy: { createdAt: "desc" },
      take: 25
    });
    return Response.json(
      users.map((u) => ({ ...u, createdAt: u.createdAt.toISOString() }))
    );
  }

  if (req.method === "POST") {
    const json = await req.json().catch(() => null);
    const parsed = CreateUser.safeParse(json);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { email, password } = parsed.data;

    // Check existing
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists)
      return Response.json(
        { error: "Email already registered" },
        { status: 409 }
      );

    // Minimal, correct hashing (keep it even if you “do auth later”)
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({ data: { email, passwordHash } });
    return Response.json(
      {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt.toISOString()
      },
      { status: 201 }
    );
  }

  return new Response("Method Not Allowed", {
    status: 405,
    headers: { Allow: "GET, POST" }
  });
};
