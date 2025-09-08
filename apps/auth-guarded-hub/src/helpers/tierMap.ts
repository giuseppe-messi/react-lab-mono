import { PLAN_TIER, PUBLIC_TIER } from "../interfaces/plan";

type TierInfo = {
  label: string;
  className: string;
};

export const tierMap: Record<number, TierInfo> = {
  [PUBLIC_TIER]: { label: "Public", className: "public-plan" },
  [PLAN_TIER.FREE]: { label: "Free", className: "free-plan" },
  [PLAN_TIER.BASIC]: { label: "Basic", className: "basic-plan" },
  [PLAN_TIER.PRO]: { label: "Pro", className: "pro-plan" }
};
