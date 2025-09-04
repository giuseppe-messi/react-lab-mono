import { prisma } from "../prisma";

await prisma.restrictedBlock.createMany({
  data: [
    /* Home page --> section 'home-info' */

    {
      pageSlug: "home",
      section: "home-info",
      payload: {
        heading: "(Public user tier)",
        text: "Anyone can see this text (no authorization required)!"
      },
      minTier: 0
    },

    {
      pageSlug: "home",
      section: "home-info",
      payload: {
        heading: "(Free user tier)",
        text: "Visible to all logged-in users! If you are seing this, that means you are authenticated!"
      },
      minTier: 1
    },

    {
      pageSlug: "home",
      section: "home-info",
      payload: {
        heading: "(Basic user tier)",
        text: "Only users with tier up to Basic can view this! Your have a Basic subscription!"
      },
      minTier: 2
    },

    {
      pageSlug: "home",
      section: "home-info",
      payload: {
        heading: "(Pro user tier)",
        text: "Only users with tier up to Pro can view this! Your have a Pro subscription!"
      },
      minTier: 3
    }

    /* Home page --> section 'home-main-content' */

    // {
    //   pageSlug: "home",
    //   section: "home-main-content",
    //   payload: {
    //     heading: "(Public user tier)",
    //     text: "Anyone can see this text (no authorization required)!"
    //   },
    //   minTier: 0
    // }
  ]
});
