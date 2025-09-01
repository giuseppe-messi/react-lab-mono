export const PLAN_TIER = {
  FREE: 1,
  BASIC: 2,
  PRO: 3
} as const;

export const PUBLIC_TIER = 0; // unauthenticated users
export type Plan = keyof typeof PLAN_TIER;
