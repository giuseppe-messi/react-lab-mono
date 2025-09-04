import { PLAN_TIER, PUBLIC_TIER } from "../interfaces/tier";

type TierInfo = {
  label: string;
  className: string;
};

export const tierMap: Record<number, TierInfo> = {
  [PUBLIC_TIER]: { label: "Public", className: "public-tier" },
  [PLAN_TIER.FREE]: { label: "Free", className: "free-tier" },
  [PLAN_TIER.BASIC]: { label: "Basic", className: "basic-tier" },
  [PLAN_TIER.PRO]: { label: "Pro", className: "pro-tier" }
};
