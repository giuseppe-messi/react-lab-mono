import { Plan } from "@prisma/client";
import { prisma } from "../../prisma";
import { getUserTier } from "./lib/session";

const PLAN_ORDER = [Plan.PUBLIC, Plan.FREE, Plan.BASIC, Plan.PRO] as const;

const tiersUpTo = (plan: Plan): Plan[] => {
  const idx = PLAN_ORDER.indexOf(plan);
  return PLAN_ORDER.slice(0, idx + 1) as Plan[];
};

export default async (req: Request) => {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug") ?? "";
  const plan = await getUserTier(req);

  const blocks = await prisma.restrictedBlock.findMany({
    where: { pageSlug: slug, plan: { in: tiersUpTo(plan) } },
    orderBy: [{ section: "asc" }, { plan: "asc" }],
    select: {
      id: true,
      section: true,
      payload: true,
      plan: true
    }
  });

  // Group by slot so easier for the client
  const slots: Record<string, typeof blocks> = {};

  for (const b of blocks) (slots[b.section] ??= []).push(b);

  return Response.json(
    { slug, slots },
    {
      headers: {
        "Cache-Control": "no-store" // HTTP caching directive
      }
    }
  );
};
