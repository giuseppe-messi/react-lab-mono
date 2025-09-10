import { Plan } from "@prisma/client";
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
      plan: Plan.PUBLIC
    },

    {
      pageSlug: "home",
      section: "home-info",
      payload: {
        heading: "Free plan",
        text: "Visible to all logged-in users! If you see this, you have at least a Free plan!"
      },
      plan: Plan.FREE
    },

    {
      pageSlug: "home",
      section: "home-info",
      payload: {
        heading: "Basic plan",
        text: "Visible to Basic and Pro subscribers. If you see this, you have at least a Basic plan!"
      },
      plan: Plan.BASIC
    },

    {
      pageSlug: "home",
      section: "home-info",
      payload: {
        heading: "Pro plan",
        text: "Visible only to Pro subscribers. If you see this, you’re at the highest tier!"
      },
      plan: Plan.PRO
    },

    /* Home page --> section 'home-main-content' */

    {
      pageSlug: "home",
      section: "home-main-content",
      payload: {
        text: "This is exclusive premium content available only to Pro users!"
      },
      plan: Plan.PRO
    }
  ]
});
