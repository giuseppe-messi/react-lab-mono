import type { Plan } from "./plan";

type PageBlock = {
  id: string;
  section: string;
  payload: { text: string; heading: string };
  plan: Plan;
};
type Slots = Record<string, PageBlock[]>;

export type PagePayload = { slug: string; slots: Slots };
