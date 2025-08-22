import { prisma } from "../../prisma";
import { getCookie, sha256 } from "./lib/session";

export default async (req: Request) => {
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

  return Response.json(
    {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email
    },
    { status: 200 }
  );
};
