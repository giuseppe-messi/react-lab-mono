type PageBlock = {
  id: string;
  section: string;
  payload: { text: string; heading: string };
  plan: number;
};
type Slots = Record<string, PageBlock[]>;

export type PagePayload = { slug: string; slots: Slots };
