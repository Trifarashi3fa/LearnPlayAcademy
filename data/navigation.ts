export type NavigationLink = {
  href: string;
  label: string;
};

export const primaryNavigation: NavigationLink[] = [
  { href: "/", label: "Home" },
  { href: "/subjects", label: "Subjects" },
  { href: "/games", label: "Games" },
  { href: "/parents", label: "Parents" },
  { href: "/about", label: "About" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

export const footerQuickLinks: NavigationLink[] = [
  { href: "/", label: "Home" },
  { href: "/subjects", label: "Subjects" },
  { href: "/games", label: "Games" },
  { href: "/parents", label: "Parents" },
  { href: "/about", label: "About" },
];

export const footerSupportLinks: NavigationLink[] = [
  { href: "/parents#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];