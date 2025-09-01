import { prisma } from "../prisma";

await prisma.restrictedContentPage.upsert({
  where: { slug: "home" },
  update: {},
  create: { slug: "home" }
});

await prisma.restrictedContentBlock.createMany({
  data: [
    {
      pageSlug: "home",
      order: 1,
      type: "markdown",
      payload: { title: "Public Teaser", body: "Welcome to Profile." },
      minTier: 0 // PUBLIC
    },
    {
      pageSlug: "home",
      order: 2,
      type: "markdown",
      payload: { title: "Members Area", body: "Hello FREE members!" },
      minTier: 1 // FREE 
    },
    {
      pageSlug: "home",
      order: 3,
      type: "markdown",
      payload: { title: "Pro Tips", body: "Exclusive content for PRO." },
      minTier: 3 // PRO
    }
  ]
});
