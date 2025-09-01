import { prisma } from "../../prisma";
import { getUserTier } from "./lib/session";

export default async (req: Request) => {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug") ?? "";

  const tier = await getUserTier(req);

  const blocks = await prisma.restrictedContentBlock.findMany({
    where: { pageSlug: slug, minTier: { lte: tier } },
    orderBy: { order: "asc" },
    select: {
      payload: true,
      minTier: true
    }
  });

  return Response.json(
    { slug, blocks },
    {
      headers: {
        "Cache-Control": "no-store" // HTTP caching directive
      }
    }
  );
};
