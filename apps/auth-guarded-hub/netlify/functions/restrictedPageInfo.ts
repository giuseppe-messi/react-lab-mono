import { prisma } from "../../prisma";
import { getUserTier } from "./lib/session";

export default async (req: Request) => {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug") ?? "";

  const tier = await getUserTier(req);

  console.log("🚀 ~ tier:", tier);

  const blocks = await prisma.restrictedBlock.findMany({
    where: { pageSlug: slug, minTier: { lte: tier } }, // lte: less than or equal to the user’s tier
    orderBy: [{ section: "asc" }, { minTier: "asc" }],
    select: {
      id: true,
      section: true,
      payload: true,
      minTier: true
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
