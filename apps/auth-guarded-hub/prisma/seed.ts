import { prisma } from "../prisma";

async function main() {
  await prisma.restrictedContentPage.upsert({
    where: { slug: "profile" },
    update: {},
    create: { slug: "profile" }
  });

  await prisma.restrictedContentBlock.createMany({
    data: [
      {
        pageSlug: "profile",
        order: 1,
        type: "markdown",
        payload: { title: "Public Teaser", body: "Welcome to Profile." },
        minTier: 0
      },
      {
        pageSlug: "profile",
        order: 2,
        type: "markdown",
        payload: { title: "Members Area", body: "Hello FREE members!" },
        minTier: 1
      },
      {
        pageSlug: "profile",
        order: 3,
        type: "markdown",
        payload: { title: "Pro Tips", body: "Exclusive content for PRO." },
        minTier: 3
      }
    ]
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
