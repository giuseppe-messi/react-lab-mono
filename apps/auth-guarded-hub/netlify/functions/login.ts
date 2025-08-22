import bcrypt from "bcryptjs";
import { prisma } from "../../prisma";
import { setCookieHeader, createSession } from "./lib/session";

export default async (req: Request) => {
  if (req.method !== "POST")
    return new Response("Method Not Allowed", { status: 405 });

  const { email, password } = await req.json().catch(() => null);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return Response.json(
      { message: "Email doesn't exist! Try Registering!" },
      { status: 401 }
    );

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok)
    return Response.json({ message: "Invalid credentials!" }, { status: 401 });

  const { token } = await createSession(user);

  return new Response(null, {
    status: 204,
    headers: { "Set-Cookie": setCookieHeader(token) } // HttpOnly cookie
  });
};
