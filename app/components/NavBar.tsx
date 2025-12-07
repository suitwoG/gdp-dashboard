import Link from "next/link";

const navLinks = [
  { href: "/learn", label: "Learn" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/store", label: "Store" },
  { href: "/profile", label: "Profile" },
  { href: "/auth", label: "Login" },
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-semibold">
            LM
          </span>
          <span>Lex Moscua</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 transition hover:bg-slate-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
