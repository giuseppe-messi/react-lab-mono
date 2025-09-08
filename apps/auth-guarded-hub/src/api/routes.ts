export const ROUTES = {
  VERIFY_ME: "/api/verifyMe",
  RESTRICTED_PAGE_INFO: "/api/restrictedPageInfo",
  LOGOUT: "/api/logout",
  LOGIN: "/api/login"
} as const;

export type RouteKey = keyof typeof ROUTES;
