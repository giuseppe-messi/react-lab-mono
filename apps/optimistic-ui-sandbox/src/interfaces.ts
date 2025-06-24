export const RESOURCE_OPTIONS = [
  "todos",
  "notes",
  "bookmarks",
  "contacts"
] as const;

// TODOS: understand this and add it to the ts personal doc
export type ResourceOption = (typeof RESOURCE_OPTIONS)[number];
