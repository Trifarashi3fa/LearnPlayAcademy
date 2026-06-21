export type NavigationLink = {
  href: string;
  label: string;
};

// Phase 1 exposes only the approved Foundation MVP learning flow.
export const primaryNavigation: NavigationLink[] = [
  { href: "/", label: "Home" },
  { href: "/subjects", label: "Subjects" },
  { href: "/mvp/world-map", label: "Forest World" },
  { href: "/mvp/parent-dashboard", label: "Parent Dashboard" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

export const footerQuickLinks: NavigationLink[] = [
  { href: "/", label: "Home" },
  { href: "/subjects", label: "Subjects" },
  { href: "/mvp/world-map", label: "Forest World" },
  { href: "/mvp/parent-dashboard", label: "Parent Dashboard" },
];

export const footerSupportLinks: NavigationLink[] = [
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];
