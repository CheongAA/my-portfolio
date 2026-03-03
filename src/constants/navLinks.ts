export const NAV_LINKS = [
  { href: "/", labelKey: "home" },
  { href: "/projects", labelKey: "projects" },
  { href: "/contact", labelKey: "contact" },
  { href: "/blog", labelKey: "blog" },
] as const;

export type NavLabelKey = (typeof NAV_LINKS)[number]["labelKey"];
