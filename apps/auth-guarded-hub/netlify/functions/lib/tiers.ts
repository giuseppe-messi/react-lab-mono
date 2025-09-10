export const PLAN_TIER = {
  PUBLIC: "PUBLIC", // unauthenticated users
  FREE: "FREE",
  BASIC: "BASIC",
  PRO: "PRO"
} as const;

export type Plan = keyof typeof PLAN_TIER;
