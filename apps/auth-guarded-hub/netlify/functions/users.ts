import { z } from "zod";
import bcrypt from "bcryptjs";
import { Plan } from "@prisma/client";
import { prisma } from "../../prisma"; // <-- use the singleton
import {
  createSession,
  getCookie,
  setCookieHeader,
  sha256
} from "./lib/session";

// Schema for create
const CreateUser = z.object({
  name: z.string(),
  lastname: z.string(),
  email: z.email(),
  password: z.string().min(8)
});

// Schema for update
const UpdateUser = z.object({
  name: z.string(),
  lastname: z.string(),
  email: z.email(),
  // confirmPassword: z.string(),
  plan: z.enum(Plan)
});

// Schema for delete
const DeleteUser = z.object({
  id: z.string()
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
          { message: "This email already exists! Try logging in!" },
          { status: 409 }
        );

      const passwordHash = await bcrypt.hash(password, 12);
      const user = await prisma.user.create({
        data: { name, lastname, email, passwordHash }
      });

      const { token } = await createSession(user);

      return Response.json(
        {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          createdAt: user.createdAt.toISOString()
        },
        {
          status: 201,
          headers: { "Set-Cookie": setCookieHeader(token) } // HttpOnly cookie
        }
      );
    }

    case "PUT": {
      /// same as verifyMe, DRY this up ///
      const sid = getCookie(req.headers.get("cookie") ?? "");

      if (!sid)
        return Response.json({ message: "Unauthenticated" }, { status: 401 });

      const session = await prisma.session.findUnique({
        where: { secretHash: sha256(sid) },
        include: { user: true }
      });

      if (!session || session.revokedAt || session.expiresAt < new Date()) {
        return Response.json({ message: "Unauthenticated" }, { status: 401 });
      }
      /// ///

      const json = await req.json().catch(() => null);
      const parsed = UpdateUser.safeParse(json);

      console.log("🚀 ~ parsed:", parsed);

      if (!parsed.success) {
        return Response.json(
          { error: z.treeifyError(parsed.error) },
          { status: 400 }
        );
      }

      const { name, lastname, email, plan } = parsed.data;

      // const ok = await bcrypt.compare(
      //   confirmPassword,
      //   session.user.passwordHash
      // );
      // if (!ok)
      //   return Response.json(
      //     { message: "Invalid credentials!" },
      //     { status: 401 }
      //   );

      const id = session.user.id;

      const data: any = {};
      data.id = id;
      if (name) data.name = name;
      if (lastname) data.lastname = lastname;
      if (email) data.email = email;
      if (plan) data.plan = plan;

      const updatedUser = await prisma.user.update({
        where: { id },
        data
      });

      return Response.json(updatedUser, { status: 200 });
    }

    default:
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "GET, POST" }
      });
  }
};
