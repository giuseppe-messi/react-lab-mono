import { prisma } from "../prisma";

await prisma.restrictedBlock.createMany({
  data: [
    /* Home page --> section 'home-info' */

    {
      pageSlug: "home",
      section: "home-info",
      payload: {
        heading: "Public",
        text: "Anyone can see this text, this is public, no authorization required!"
      },
      plan: 0
    },

    {
      pageSlug: "home",
      section: "home-info",
      payload: {
        heading: "Free plan",
        text: "Visible to all logged-in users! If you are seing this, that means you are authenticated!"
      },
      plan: 1
    },

    {
      pageSlug: "home",
      section: "home-info",
      payload: {
        heading: "Basic plan",
        text: "Only users with a Basic plan can view this! You are a Basic subscriber!"
      },
      plan: 2
    },

    {
      pageSlug: "home",
      section: "home-info",
      payload: {
        heading: "Pro plan",
        text: "Only users with a Pro plan can view this! You are a Pro subscriber!"
      },
      plan: 3
    }

    /* Home page --> section 'home-main-content' */
  ]
});
