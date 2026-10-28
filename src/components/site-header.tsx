import Link from "next/link";

const links = [
  { href: "#", label: "Discover" },
  { href: "#", label: "Lists" },
  { href: "#", label: "Members" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-gold/15">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-[0.2em] text-gold uppercase"
        >
          Lore
        </Link>
        <ul className="flex gap-8 text-sm tracking-wide text-foreground/70">
          {links.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="transition-colors hover:text-gold">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
