import { prisma } from "../../prisma";
import { clearCookieHeader, getCookie, sha256 } from "./lib/session";

export default async (req: Request) => {
  const sid = getCookie(req.headers.get("cookie") ?? "");

  if (sid) {
    await prisma.session.deleteMany({
      where: { secretHash: sha256(sid) }
    });
  }

  return new Response(null, {
    status: 204,
    headers: { "Set-Cookie": clearCookieHeader }
  });
};
