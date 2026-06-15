import Link from "next/link";
import { footerQuickLinks, footerSupportLinks } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-sky/10 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 text-sm font-bold text-ink/70 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-xl font-black text-ink">LearnPlay Academy</p>
          <p className="mt-2 text-sky">Learning Through Play</p>
          <a
            href="mailto:support@learnplayacademy.com"
            className="mt-4 inline-flex rounded-full text-ink underline-offset-4 hover:text-sky hover:underline focus:outline-none focus:ring-4 focus:ring-sky/25"
          >
            support@learnplayacademy.com
          </a>
        </div>

        <nav aria-label="Quick links">
          <p className="font-black uppercase text-ink">Quick Links</p>
          <ul className="mt-3 space-y-2">
            {footerQuickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full hover:text-sky focus:outline-none focus:ring-4 focus:ring-sky/25"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Support links">
          <p className="font-black uppercase text-ink">Support</p>
          <ul className="mt-3 space-y-2">
            {footerSupportLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full hover:text-sky focus:outline-none focus:ring-4 focus:ring-sky/25"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}