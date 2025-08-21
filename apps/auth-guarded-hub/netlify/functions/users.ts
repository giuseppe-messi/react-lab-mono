import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "../../prisma"; // <-- use the singleton

const CreateUser = z.object({
  name: z.string(),
  lastname: z.string(),
  email: z.email(),
  password: z.string().min(8)
});

export default async (req: Request) => {
  switch (req.method) {
    case "GET": {
      const users = await prisma.user.findMany({
        select: { email: true },
        orderBy: { createdAt: "desc" }
      });

      return Response.json(users);
    }

    case "POST": {
      const json = await req.json().catch(() => null);
      const parsed = CreateUser.safeParse(json);

      if (!parsed.success)
        return Response.json(
          { error: z.treeifyError(parsed.error) },
          { status: 400 }
        );

      const { name, lastname, email, password } = parsed.data;

      const exists = await prisma.user.findUnique({ where: { email } });

      if (exists)
        return Response.json(
          { error: "Email already registered" },
          { status: 409 }
        );

      const passwordHash = await bcrypt.hash(password, 12);
      const user = await prisma.user.create({
        data: { name, lastname, email, passwordHash }
      });

      return Response.json(
        {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          createdAt: user.createdAt.toISOString()
        },
        { status: 201 }
      );
    }

    default:
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "GET, POST" }
      });
  }
};
