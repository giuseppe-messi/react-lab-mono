import crypto from "node:crypto";
import type { User } from "@prisma/client";
import { prisma } from "../../../prisma";
import { PLAN_TIER } from "./tiers";

export const COOKIE_NAME = "sid";
export const SESSION_TTL_SEC = 60 * 60 * 24 * 7; // 7 days

export function newToken() {
  return crypto.randomBytes(32).toString("base64url"); // high entropy
}
export function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("base64url");
}
export function getCookie(header = "", name = COOKIE_NAME) {
  const m = new RegExp(`(?:^|; )${name}=([^;]+)`).exec(header);
  return m?.[1];
}
export function setCookieHeader(token: string, maxAge = SESSION_TTL_SEC) {
  return `${COOKIE_NAME}=${token}; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=Lax`;
}
export const clearCookieHeader = `${COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`;

export const createSession = async (user: User) => {
  const token = newToken();
  const secretHash = sha256(token);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_TTL_SEC * 1000);

  await prisma.session.create({
    data: {
      secretHash,
      userId: user.id,
      expiresAt
    }
  });

  return {
    token
  };
};

export async function getUserTier(req: Request) {
  const sid = getCookie(req.headers.get("cookie") ?? "");

  if (!sid) return PLAN_TIER.PUBLIC;

  const session = await prisma.session.findUnique({
    where: { secretHash: sha256(sid) },
    include: { user: true }
  });

  if (!session || session.expiresAt < new Date() || session.revokedAt)
    return PLAN_TIER.PUBLIC;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { plan: true }
  });
  if (!user) return PLAN_TIER.PUBLIC;

  return user.plan ?? PLAN_TIER.BASIC;
}
