import { PLAN_TIER, type Plan } from "../interfaces/plan";

type TierInfo = {
  label: string;
  className: string;
};

export const tierMap: Record<Plan, TierInfo> = {
  [PLAN_TIER.PUBLIC]: { label: "Public", className: "public-plan" },
  [PLAN_TIER.FREE]: { label: "Free", className: "free-plan" },
  [PLAN_TIER.BASIC]: { label: "Basic", className: "basic-plan" },
  [PLAN_TIER.PRO]: { label: "Pro", className: "pro-plan" }
};
