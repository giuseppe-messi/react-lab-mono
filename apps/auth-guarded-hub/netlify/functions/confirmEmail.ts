import bcrypt from "bcryptjs";
import { prisma } from "../../prisma";
import { getCookie, sha256 } from "./lib/session";

export default async (req: Request) => {
  if (req.method !== "POST")
    return new Response("Method Not Allowed", { status: 405 });

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

  const { password } = await req.json().catch(() => null);

  const ok = await bcrypt.compare(password, session.user.passwordHash);
  if (!ok)
    return Response.json({ message: "Invalid credentials!" }, { status: 401 });

  return new Response(null, {
    status: 204
  });
};
