import { prisma } from "../../prisma";
import { getUserTier } from "./lib/session";

export default async (req: Request) => {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug") ?? "";

  const plan = await getUserTier(req);

  console.log("🚀 ~ plan:", plan);

  const blocks = await prisma.restrictedBlock.findMany({
    where: { pageSlug: slug, plan: { lte: plan } }, // lte: less than or equal to the user’s plan
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

  console.log("🚀 ~ slots:", slots);
  return Response.json(
    { slug, slots },
    {
      headers: {
        "Cache-Control": "no-store" // HTTP caching directive
      }
    }
  );
};
